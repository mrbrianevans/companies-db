import type { GetStatementResponse } from '../schemas/getStatementSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * Get the person with significant control statement.
 *
 * Get details of a person with significant control statement.
 */
export async function getStatement(
  context: Context,
  company_number: string,
  statement_id: string
): Promise<GetStatementResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
