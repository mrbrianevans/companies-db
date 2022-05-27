import type { SearchDisqualifiedOfficersResponse } from '../schemas/searchDisqualifiedOfficersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the searchDisqualifiedOfficers service
const colName = 'searchDisqualifiedOfficers'

/** Must be called before any data is inserted */
export async function initSearchDisqualifiedOfficersCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Search disqualified officers.
 *
 * Search for disqualified officer information.
 */
export async function searchDisqualifiedOfficers(
  context: Context,
  q: string,
  items_per_page?: number,
  start_index?: number
): Promise<SearchDisqualifiedOfficersResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
