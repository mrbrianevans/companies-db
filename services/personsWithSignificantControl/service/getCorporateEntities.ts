import type { GetCorporateEntitiesResponse } from '../schemas/getCorporateEntitiesSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * Get the corporate entity with significant control.
 *
 * Get details of a corporate entity with significant control.
 */
export async function getCorporateEntities(
  context: Context,
  company_number: string,
  psc_id: string
): Promise<GetCorporateEntitiesResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
