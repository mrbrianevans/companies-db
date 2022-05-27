import type { GetSuperSecurePersonResponse } from '../schemas/getSuperSecurePersonSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * Get the super secure person with significant control.
 *
 * Get details of a super secure person with significant control.
 */
export async function getSuperSecurePerson(
  context: Context,
  company_number: string,
  super_secure_id: string
): Promise<GetSuperSecurePersonResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
