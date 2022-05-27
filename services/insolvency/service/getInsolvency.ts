import type { GetInsolvencyResponse } from '../schemas/getInsolvencySchema.js'
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
 * Company insolvency information.
 */
export async function getInsolvency(
  context: Context,
  company_number: string
): Promise<GetInsolvencyResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
