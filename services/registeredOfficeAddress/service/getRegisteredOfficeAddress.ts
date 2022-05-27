import type { GetRegisteredOfficeAddressResponse } from '../schemas/getRegisteredOfficeAddressSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * Registered Office Address.
 *
 * Get the current address of a company.
 */
export async function getRegisteredOfficeAddress(
  context: Context,
  company_number: string
): Promise<GetRegisteredOfficeAddressResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
