import type { GetRegistersResponse } from '../schemas/getRegistersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * Company registers.
 *
 * Get the company registers information.
 */
export async function getRegisters(
  context: Context,
  company_number: string
): Promise<GetRegistersResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
