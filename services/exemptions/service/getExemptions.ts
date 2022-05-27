import type { GetExemptionsResponse } from '../schemas/getExemptionsSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getExemptions service
const colName = 'getExemptions'

/** Must be called before any data is inserted */
export async function initGetExemptionsCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * .
 *
 * Company exemptions information.
 */
export async function getExemptions(
  context: Context,
  company_number: string
): Promise<GetExemptionsResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
