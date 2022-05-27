import type { SearchCompaniesAlphabeticallyResponse } from '../schemas/searchCompaniesAlphabeticallySchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the searchCompaniesAlphabetically service
const colName = 'searchCompaniesAlphabetically'

/** Must be called before any data is inserted */
export async function initSearchCompaniesAlphabeticallyCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Search for a company.
 *
 * Search for a company.
 */
export async function searchCompaniesAlphabetically(
  context: Context,
  q: string,
  search_above?: string,
  search_below?: string,
  size?: string
): Promise<SearchCompaniesAlphabeticallyResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
