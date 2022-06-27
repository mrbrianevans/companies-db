import type { GetCorporateEntitiesResponse } from '../schemas/getCorporateEntitiesSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'
import type { Db } from 'mongodb'

import { GetCorporateEntitiesSchema } from '../schemas/getCorporateEntitiesSchema.js'
import { reflect } from '../controllers/reflect.js'
import { performance } from 'perf_hooks'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getCorporateEntities service
const colName = 'getCorporateEntities'

/** Must be called before any data is inserted */
export async function initGetCorporateEntitiesCollection(
  db: FastifyMongoObject['db'] | Db
) {
  if (!db) throw new Error('DB not defined')
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const { example, ...schema } = {
      ...GetCorporateEntitiesSchema['schema']['response']['200']
    }
    await db.createCollection(colName, {
      storageEngine: { wiredTiger: { configString: 'block_compressor=zstd' } }
      // schema validation is temporarily disabled because mongo uses BSONschema which has slightly different types (doesn't support integer)
      // validator: {$jsonSchema: schema },
      // validationAction: "error" || "warn" // if a write fails validation
    })
    await db.collection(colName).createIndex({ company_number: 1, psc_id: 1 })
  }
}

/**
 * Get the corporate entity with significant control.
 *
 * Get details of a corporate entity with significant control.
 *
 */
export async function getCorporateEntities(
  context: Context,
  company_number: string,
  psc_id: string
): Promise<GetCorporateEntitiesResponse | null> {
  if (!context.mongo.db) throw new Error('DB not defined')
  const collection =
    context.mongo.db.collection<GetCorporateEntitiesResponse>(colName)
  const startFind = performance.now()
  let res = await collection.findOne({ company_number, psc_id })
  const findDurationMs = performance.now() - startFind
  context.req.log.trace(
    { findDurationMs, found: Boolean(res) },
    'Find one operation in MongoDB'
  )
  if (!res) {
    res = await callGetCorporateEntitiesApi({ company_number, psc_id }, {})
    if (res) {
      try {
        await collection.updateOne(
          { company_number, psc_id },
          { $set: res },
          { upsert: true }
        )
      } catch (e) {
        if (e.code === 121) {
          context.req.log.warn(
            { company_number, psc_id },
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

async function callGetCorporateEntitiesApi(pathParams, queryParams) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, String(v)])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)
  const path =
    '/company/{company_number}/persons-with-significant-control/corporate-entity/{psc_id}'.replace(
      /\{(.+?)}/g,
      (w, n) => pathParams[n]
    )
  return await reflect(path + '?' + urlQuery.toString())
}
