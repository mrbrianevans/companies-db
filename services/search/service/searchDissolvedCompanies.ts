import type { SearchDissolvedCompaniesResponse } from '../schemas/searchDissolvedCompaniesSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { SearchDissolvedCompaniesSchema } from '../schemas/searchDissolvedCompaniesSchema.js'
import { reflect } from '../controllers/reflect.js'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the searchDissolvedCompanies service
const colName = 'searchDissolvedCompanies'

/** Must be called before any data is inserted */
export async function initSearchDissolvedCompaniesCollection(
  db: FastifyMongoObject['db']
) {
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const schema = {
      ...SearchDissolvedCompaniesSchema['schema']['response']['200']
    }
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
 * Search for a dissolved company.
 *
 * Search for a dissolved company.
 *
 */
export async function searchDissolvedCompanies(
  context: Context,
  q: string,
  search_type?: string,
  search_above?: string,
  search_below?: string,
  size?: string,
  start_index?: string
): Promise<SearchDissolvedCompaniesResponse> {
  const collection =
    context.mongo.db.collection<SearchDissolvedCompaniesResponse>(colName)
  let res = await collection.findOne({})
  if (!res) {
    res = await callSearchDissolvedCompaniesApi(
      {},
      { q, search_type, search_above, search_below, size, start_index }
    )
    if (res) {
      try {
        await collection.updateOne({}, { $set: res }, { upsert: true })
      } catch (e) {
        if (e.code === 121) {
          context.req.log.warn(
            { q, search_type, search_above, search_below, size, start_index },
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

async function callSearchDissolvedCompaniesApi(pathParams, queryParams) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, v.toString()])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)
  const path = '/dissolved-search/companies'.replace(
    /\{(.+?)}/g,
    (w, n) => pathParams[n]
  )
  return await reflect(path + '?' + urlQuery.toString())
}
