import type { GetIndividualResponse } from '../schemas/getIndividualSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getIndividual service
const colName = 'getIndividual'

/** Must be called before any data is inserted */
export async function initGetIndividualCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Get the individual person with significant control.
 *
 * Get details of an individual person with significant control.
 */
export async function getIndividual(
  context: Context,
  company_number: string,
  psc_id: string
): Promise<GetIndividualResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
