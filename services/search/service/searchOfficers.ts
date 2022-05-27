import type { SearchOfficersResponse } from '../schemas/searchOfficersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
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
