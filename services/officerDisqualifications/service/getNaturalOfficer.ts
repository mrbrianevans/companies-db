import type { GetNaturalOfficerResponse } from '../schemas/getNaturalOfficerSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * Get natural officers disqualifications.
 *
 * Get a natural officer's disqualifications.
 */
export async function getNaturalOfficer(
  context: Context,
  officer_id: string
): Promise<GetNaturalOfficerResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
