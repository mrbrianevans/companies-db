import type { GetCompanyProfileResponse } from '../schemas/getCompanyProfileSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * Company profile.
 *
 * Get the basic company information.
 */
export async function getCompanyProfile(
  context: Context,
  company_number: string
): Promise<GetCompanyProfileResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
