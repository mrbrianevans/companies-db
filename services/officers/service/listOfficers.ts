import type { ListOfficersResponse } from '../schemas/listOfficersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the listOfficers service
const colName = 'listOfficers'

/** Must be called before any data is inserted */
export async function initListOfficersCollection(db: FastifyMongoObject['db']) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Company Officers.
 *
 * List of all company officers.
 */
export async function listOfficers(
  context: Context,
  company_number: string,
  items_per_page?: number,
  register_type?: string,
  register_view?: string,
  start_index?: number,
  order_by?: string
): Promise<ListOfficersResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
