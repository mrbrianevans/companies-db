import type { ListChargesResponse } from '../schemas/listChargesSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * Charges.
 *
 * List of charges for a company..
 */
export async function listCharges(
  context: Context,
  company_number: string
): Promise<ListChargesResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
