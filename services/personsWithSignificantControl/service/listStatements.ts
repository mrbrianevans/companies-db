import type { ListStatementsResponse } from '../schemas/listStatementsSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * List the company persons with significant control statements.
 *
 * List of all persons with significant control statements.
 */
export async function listStatements(
  context: Context,
  company_number: string,
  items_per_page?: number,
  start_index?: number,
  register_view?: undefined
): Promise<ListStatementsResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
