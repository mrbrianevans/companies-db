import type { GetOfficersResponse } from '../schemas/getOfficersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getOfficers service
const colName = 'getOfficers'

/** Must be called before any data is inserted */
export async function initGetOfficersCollection(db: FastifyMongoObject['db']) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Get a company officer appointment.
 *
 * Get details of an individual company officer appointment.
 */
export async function getOfficers(
  context: Context,
  company_number: string,
  appointment_id: string
): Promise<GetOfficersResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
