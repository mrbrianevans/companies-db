import type { SearchDisqualifiedOfficersResponse } from '../schemas/searchDisqualifiedOfficersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
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
