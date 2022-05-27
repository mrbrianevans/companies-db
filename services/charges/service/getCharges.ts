import type { GetChargesResponse } from '../schemas/getChargesSchema.js'
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
 * Individual charge information for company..
 */
export async function getCharges(
  context: Context,
  company_number: string,
  charge_id: string
): Promise<GetChargesResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
