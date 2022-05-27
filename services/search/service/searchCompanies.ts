import type { SearchCompaniesResponse } from '../schemas/searchCompaniesSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
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
