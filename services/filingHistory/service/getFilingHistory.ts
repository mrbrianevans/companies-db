import type { GetFilingHistoryResponse } from '../schemas/getFilingHistorySchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * filingHistoryItem resource.
 *
 * Get the filing history item of a company.
 */
export async function getFilingHistory(
  context: Context,
  company_number: string,
  transaction_id: string
): Promise<GetFilingHistoryResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
