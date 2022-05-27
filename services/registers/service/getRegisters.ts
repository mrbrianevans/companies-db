import type { GetRegistersResponse } from '../schemas/getRegistersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getRegisters service
const colName = 'getRegisters'

/** Must be called before any data is inserted */
export async function initGetRegistersCollection(db: FastifyMongoObject['db']) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Company registers.
 *
 * Get the company registers information.
 */
export async function getRegisters(
  context: Context,
  company_number: string
): Promise<GetRegistersResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
