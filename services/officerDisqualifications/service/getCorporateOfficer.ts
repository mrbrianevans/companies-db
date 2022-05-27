import type { GetCorporateOfficerResponse } from '../schemas/getCorporateOfficerSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * Get a corporate officers disqualifications.
 *
 * Get a corporate officer's disqualifications.
 */
export async function getCorporateOfficer(
  context: Context,
  officer_id: string
): Promise<GetCorporateOfficerResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
