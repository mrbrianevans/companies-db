import type { ListFilingHistoryResponse } from '../schemas/listFilingHistorySchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
}
/**
 * filingHistoryList resource.
 *
 * Get the filing history list of a company.
 */
export async function listFilingHistory(
  context: Context,
  company_number: string,
  category?: string,
  items_per_page?: number,
  start_index?: number
): Promise<ListFilingHistoryResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
