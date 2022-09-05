import type { SearchOfficersResponse } from '../schemas/searchOfficersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'
import {performSearch} from "../../shared/search/performSearch.js";

import { SearchOfficersSchema } from '../schemas/searchOfficersSchema.js'
import { reflect } from '../controllers/reflect.js'
import { performance } from 'perf_hooks'

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
  if (!db) throw new Error('DB not defined')
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const { example, ...schema } = {
      ...SearchOfficersSchema['schema']['response']['200']
    }
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
): Promise<SearchOfficersResponse | null> {
  items_per_page ??= 35
  start_index ??= 0
  const results = await performSearch(q, {limit: items_per_page, skip: start_index})
  return {
    start_index, items_per_page,
    items: [], //todo: map results from redis to companies house format of search results. Will require calls to Mongo.
    page_number: Math.ceil(start_index/items_per_page),
    total_results: results.length,
    kind: 'search#officers'
  }
}
