import type { GetExemptionsResponse } from '../schemas/getExemptionsSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * .
 *
 * Company exemptions information.
 */
export async function getExemptions(
  context: Context,
  company_number: string
): Promise<GetExemptionsResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
