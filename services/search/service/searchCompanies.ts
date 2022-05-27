import type { SearchCompaniesResponse } from '../schemas/searchCompaniesSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the searchCompanies service
const colName = 'searchCompanies'

/** Must be called before any data is inserted */
export async function initSearchCompaniesCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Search companies.
 *
 * Search company information.
 */
export async function searchCompanies(
  context: Context,
  q: string,
  items_per_page?: number,
  start_index?: number,
  restrictions?: string
): Promise<SearchCompaniesResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
