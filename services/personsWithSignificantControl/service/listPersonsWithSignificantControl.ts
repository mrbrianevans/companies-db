import type { ListPersonsWithSignificantControlResponse } from '../schemas/listPersonsWithSignificantControlSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the listPersonsWithSignificantControl service
const colName = 'listPersonsWithSignificantControl'

/** Must be called before any data is inserted */
export async function initListPersonsWithSignificantControlCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * List the company persons with significant control.
 *
 * List of all persons with significant control (not statements).
 */
export async function listPersonsWithSignificantControl(
  context: Context,
  company_number: string,
  items_per_page?: string,
  start_index?: string,
  register_view?: string
): Promise<ListPersonsWithSignificantControlResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
