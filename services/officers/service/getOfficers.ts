import type { GetOfficersResponse } from '../schemas/getOfficersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * Get a company officer appointment.
 *
 * Get details of an individual company officer appointment.
 */
export async function getOfficers(
  context: Context,
  company_number: string,
  appointment_id: string
): Promise<GetOfficersResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
