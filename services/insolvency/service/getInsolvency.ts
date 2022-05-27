import type { GetInsolvencyResponse } from '../schemas/getInsolvencySchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getInsolvency service
const colName = 'getInsolvency'

/** Must be called before any data is inserted */
export async function initGetInsolvencyCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * .
 *
 * Company insolvency information.
 */
export async function getInsolvency(
  context: Context,
  company_number: string
): Promise<GetInsolvencyResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
