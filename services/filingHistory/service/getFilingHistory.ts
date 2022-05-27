import type { GetFilingHistoryResponse } from '../schemas/getFilingHistorySchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getFilingHistory service
const colName = 'getFilingHistory'

/** Must be called before any data is inserted */
export async function initGetFilingHistoryCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
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
