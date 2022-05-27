import type { GetRegisteredOfficeAddressResponse } from '../schemas/getRegisteredOfficeAddressSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getRegisteredOfficeAddress service
const colName = 'getRegisteredOfficeAddress'

/** Must be called before any data is inserted */
export async function initGetRegisteredOfficeAddressCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Registered Office Address.
 *
 * Get the current address of a company.
 */
export async function getRegisteredOfficeAddress(
  context: Context,
  company_number: string
): Promise<GetRegisteredOfficeAddressResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
