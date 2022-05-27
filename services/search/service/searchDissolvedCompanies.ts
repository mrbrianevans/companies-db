import type { SearchDissolvedCompaniesResponse } from '../schemas/searchDissolvedCompaniesSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
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
