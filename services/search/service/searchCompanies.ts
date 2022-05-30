import type { SearchCompaniesResponse } from '../schemas/searchCompaniesSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { SearchCompaniesSchema } from '../schemas/searchCompaniesSchema.js'
import { reflect } from '../controllers/reflect.js'
import { performance } from 'perf_hooks'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the searchCompanies service
const colName = 'searchCompanies'

/** Must be called before any data is inserted */
export async function initSearchCompaniesCollection(
  db: FastifyMongoObject['db']
) {
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const schema = { ...SearchCompaniesSchema['schema']['response']['200'] }
    delete schema.example // not supported by mongodb
    await db.createCollection(colName, {
      storageEngine: { wiredTiger: { configString: 'block_compressor=zstd' } }
      // schema validation is temporarily disabled because mongo uses BSONschema which has slightly different types (doesn't support integer)
      // validator: {$jsonSchema: schema },
      // validationAction: "error" || "warn" // if a write fails validation
    })
  }
}

/**
 * Search companies.
 *
 * Search company information.
 *
 */
export async function searchCompanies(
  context: Context,
  q: string,
  items_per_page?: number,
  start_index?: number,
  restrictions?: string
): Promise<SearchCompaniesResponse> {
  const collection =
    context.mongo.db.collection<SearchCompaniesResponse>(colName)
  const startFind = performance.now()
  let res = await collection.findOne({})
  const findDurationMs = performance.now() - startFind
  context.req.log.trace(
    { findDurationMs, found: Boolean(res) },
    'Find one operation in MongoDB'
  )
  if (!res) {
    res = await callSearchCompaniesApi(
      {},
      { q, items_per_page, start_index, restrictions }
    )
    if (res) {
      try {
        await collection.updateOne({}, { $set: res }, { upsert: true })
      } catch (e) {
        if (e.code === 121) {
          context.req.log.warn(
            { q, items_per_page, start_index, restrictions },
            'Failed to upsert document from API due to validation error'
          )
        } else {
          context.req.log.error(
            { err: e },
            'Failed to insert document for a different reason to validation'
          )
        }
      }
    }
  }
  return res ?? null
}

async function callSearchCompaniesApi(pathParams, queryParams) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, v.toString()])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)
  const path = '/search/companies'.replace(/\{(.+?)}/g, (w, n) => pathParams[n])
  return await reflect(path + '?' + urlQuery.toString())
}
