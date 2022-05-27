import type { ListStatementsResponse } from '../schemas/listStatementsSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the listStatements service
const colName = 'listStatements'

/** Must be called before any data is inserted */
export async function initListStatementsCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * List the company persons with significant control statements.
 *
 * List of all persons with significant control statements.
 */
export async function listStatements(
  context: Context,
  company_number: string,
  items_per_page?: number,
  start_index?: number,
  register_view?: undefined
): Promise<ListStatementsResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
