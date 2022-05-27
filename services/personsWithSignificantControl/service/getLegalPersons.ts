import type { GetLegalPersonsResponse } from '../schemas/getLegalPersonsSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getLegalPersons service
const colName = 'getLegalPersons'

/** Must be called before any data is inserted */
export async function initGetLegalPersonsCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Get the legal person with significant control.
 *
 * Get details of a legal person with significant control.
 */
export async function getLegalPersons(
  context: Context,
  company_number: string,
  psc_id: string
): Promise<GetLegalPersonsResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
