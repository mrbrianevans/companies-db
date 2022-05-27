import type { SearchAllResponse } from '../schemas/searchAllSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the searchAll service
const colName = 'searchAll'

/** Must be called before any data is inserted */
export async function initSearchAllCollection(db: FastifyMongoObject['db']) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Search All.
 *
 * Search companies, officers and disqualified officers.
 */
export async function searchAll(
  context: Context,
  q: string,
  items_per_page?: number,
  start_index?: number
): Promise<SearchAllResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
