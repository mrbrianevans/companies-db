import type { GetNaturalOfficerResponse } from '../schemas/getNaturalOfficerSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getNaturalOfficer service
const colName = 'getNaturalOfficer'

/** Must be called before any data is inserted */
export async function initGetNaturalOfficerCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Get natural officers disqualifications.
 *
 * Get a natural officer's disqualifications.
 */
export async function getNaturalOfficer(
  context: Context,
  officer_id: string
): Promise<GetNaturalOfficerResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
