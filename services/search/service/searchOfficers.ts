import type { SearchOfficersResponse } from '../schemas/searchOfficersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

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
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Search company officers.
 *
 * Search for officer information.
 */
export async function searchOfficers(
  context: Context,
  q: string,
  items_per_page?: number,
  start_index?: number
): Promise<SearchOfficersResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
