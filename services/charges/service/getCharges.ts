import type { GetChargesResponse } from '../schemas/getChargesSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getCharges service
const colName = 'getCharges'

/** Must be called before any data is inserted */
export async function initGetChargesCollection(db: FastifyMongoObject['db']) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * .
 *
 * Individual charge information for company..
 */
export async function getCharges(
  context: Context,
  company_number: string,
  charge_id: string
): Promise<GetChargesResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
