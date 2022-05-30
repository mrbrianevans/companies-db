import type { SearchAllResponse } from '../schemas/searchAllSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { SearchAllSchema } from '../schemas/searchAllSchema.js'
import { reflect } from '../controllers/reflect.js'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the searchAll service
const colName = 'searchAll'

/** Must be called before any data is inserted */
export async function initSearchAllCollection(db: FastifyMongoObject['db']) {
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const schema = { ...SearchAllSchema['schema']['response']['200'] }
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
 * Search All.
 *
 * Search companies, officers and disqualified officers.
 *
 */
export async function searchAll(
  context: Context,
  q: string,
  items_per_page?: number,
  start_index?: number
): Promise<SearchAllResponse> {
  const collection = context.mongo.db.collection<SearchAllResponse>(colName)
  let res = await collection.findOne({})
  if (!res) {
    res = await callSearchAllApi({}, { q, items_per_page, start_index })
    if (res) {
      try {
        await collection.updateOne({}, { $set: res }, { upsert: true })
      } catch (e) {
        if (e.code === 121) {
          context.req.log.warn(
            { q, items_per_page, start_index },
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

async function callSearchAllApi(pathParams, queryParams) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, v.toString()])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)
  const path = '/search'.replace(/\{(.+?)}/g, (w, n) => pathParams[n])
  return await reflect(path + '?' + urlQuery.toString())
}
