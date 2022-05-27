import type { SearchAllResponse } from '../schemas/searchAllSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
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
