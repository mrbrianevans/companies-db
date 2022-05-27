import type { SearchDissolvedCompaniesResponse } from '../schemas/searchDissolvedCompaniesSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

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
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Search for a dissolved company.
 *
 * Search for a dissolved company.
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
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
