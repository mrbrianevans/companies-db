import type { ListChargesResponse } from '../schemas/listChargesSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the listCharges service
const colName = 'listCharges'

/** Must be called before any data is inserted */
export async function initListChargesCollection(db: FastifyMongoObject['db']) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Charges.
 *
 * List of charges for a company..
 */
export async function listCharges(
  context: Context,
  company_number: string
): Promise<ListChargesResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
