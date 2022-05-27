import type { GetLegalPersonsResponse } from '../schemas/getLegalPersonsSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * Get the legal person with significant control.
 *
 * Get details of a legal person with significant control.
 */
export async function getLegalPersons(
  context: Context,
  company_number: string,
  psc_id: string
): Promise<GetLegalPersonsResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
