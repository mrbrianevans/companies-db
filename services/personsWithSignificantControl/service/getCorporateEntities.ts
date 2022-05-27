import type { GetCorporateEntitiesResponse } from '../schemas/getCorporateEntitiesSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getCorporateEntities service
const colName = 'getCorporateEntities'

/** Must be called before any data is inserted */
export async function initGetCorporateEntitiesCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Get the corporate entity with significant control.
 *
 * Get details of a corporate entity with significant control.
 */
export async function getCorporateEntities(
  context: Context,
  company_number: string,
  psc_id: string
): Promise<GetCorporateEntitiesResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
