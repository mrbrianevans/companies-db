import type { SearchOfficersResponse } from '../schemas/searchOfficersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { SearchOfficersSchema } from '../schemas/searchOfficersSchema.js'
import { reflect } from '../controllers/reflect.js'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the searchOfficers service
const colName = 'searchOfficers'

/** Must be called before any data is inserted */
export async function initSearchOfficersCollection(
  db: FastifyMongoObject['db']
) {
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const schema = { ...SearchOfficersSchema['schema']['response']['200'] }
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
 * Search company officers.
 *
 * Search for officer information.
 *
 */
export async function searchOfficers(
  context: Context,
  q: string,
  items_per_page?: number,
  start_index?: number
): Promise<SearchOfficersResponse> {
  const collection =
    context.mongo.db.collection<SearchOfficersResponse>(colName)
  let res = await collection.findOne({})
  if (!res) {
    res = await callSearchOfficersApi({}, { q, items_per_page, start_index })
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

async function callSearchOfficersApi(pathParams, queryParams) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, v.toString()])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)
  const path = '/search/officers'.replace(/\{(.+?)}/g, (w, n) => pathParams[n])
  return await reflect(path + '?' + urlQuery.toString())
}
