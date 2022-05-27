import type { SearchCompaniesAlphabeticallyResponse } from '../schemas/searchCompaniesAlphabeticallySchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
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
