import type { ListOfficersResponse } from '../schemas/listOfficersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * Company Officers.
 *
 * List of all company officers.
 */
export async function listOfficers(
  context: Context,
  company_number: string,
  items_per_page?: number,
  register_type?: string,
  register_view?: string,
  start_index?: number,
  order_by?: string
): Promise<ListOfficersResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
