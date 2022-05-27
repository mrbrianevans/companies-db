import type { GetUKEstablishmentsResponse } from '../schemas/getUKEstablishmentsSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * Company UK Establishments.
 *
 * List of uk-establishments companies.
 */
export async function getUKEstablishments(
  context: Context,
  company_number: string
): Promise<GetUKEstablishmentsResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
