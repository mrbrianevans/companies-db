import type { GetCorporateOfficerResponse } from '../schemas/getCorporateOfficerSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getCorporateOfficer service
const colName = 'getCorporateOfficer'

/** Must be called before any data is inserted */
export async function initGetCorporateOfficerCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Get a corporate officers disqualifications.
 *
 * Get a corporate officer's disqualifications.
 */
export async function getCorporateOfficer(
  context: Context,
  officer_id: string
): Promise<GetCorporateOfficerResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
