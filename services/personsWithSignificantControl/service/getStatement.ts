import type { GetStatementResponse } from '../schemas/getStatementSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getStatement service
const colName = 'getStatement'

/** Must be called before any data is inserted */
export async function initGetStatementCollection(db: FastifyMongoObject['db']) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
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
