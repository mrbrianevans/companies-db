import type { GetSuperSecurePersonResponse } from '../schemas/getSuperSecurePersonSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getSuperSecurePerson service
const colName = 'getSuperSecurePerson'

/** Must be called before any data is inserted */
export async function initGetSuperSecurePersonCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Get the super secure person with significant control.
 *
 * Get details of a super secure person with significant control.
 */
export async function getSuperSecurePerson(
  context: Context,
  company_number: string,
  super_secure_id: string
): Promise<GetSuperSecurePersonResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
