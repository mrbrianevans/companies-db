import type { ListFilingHistoryResponse } from '../schemas/listFilingHistorySchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the listFilingHistory service
const colName = 'listFilingHistory'

/** Must be called before any data is inserted */
export async function initListFilingHistoryCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
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
