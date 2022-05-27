import type { GetUKEstablishmentsResponse } from '../schemas/getUKEstablishmentsSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getUKEstablishments service
const colName = 'getUKEstablishments'

/** Must be called before any data is inserted */
export async function initGetUKEstablishmentsCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Company UK Establishments.
 *
 * List of uk-establishments companies.
 */
export async function getUKEstablishments(
  context: Context,
  company_number: string
): Promise<GetUKEstablishmentsResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
