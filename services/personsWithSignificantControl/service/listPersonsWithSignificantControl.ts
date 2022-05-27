import type { ListPersonsWithSignificantControlResponse } from '../schemas/listPersonsWithSignificantControlSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * List the company persons with significant control.
 *
 * List of all persons with significant control (not statements).
 */
export async function listPersonsWithSignificantControl(
  context: Context,
  company_number: string,
  items_per_page?: string,
  start_index?: string,
  register_view?: string
): Promise<ListPersonsWithSignificantControlResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
