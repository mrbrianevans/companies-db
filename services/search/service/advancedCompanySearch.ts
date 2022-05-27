import type { AdvancedCompanySearchResponse } from '../schemas/advancedCompanySearchSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the advancedCompanySearch service
const colName = 'advancedCompanySearch'

/** Must be called before any data is inserted */
export async function initAdvancedCompanySearchCollection(
  db: FastifyMongoObject['db']
) {
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Advanced search for a company.
 *
 * Advanced search for a company.
 */
export async function advancedCompanySearch(
  context: Context,
  company_name?: string,
  company_status?: undefined,
  company_subtype?: string,
  company_type?: undefined,
  dissolved_from?: undefined,
  dissolved_to?: undefined,
  incorporated_from?: undefined,
  incorporated_to?: undefined,
  location?: string,
  sic_codes?: undefined,
  size?: string,
  start_index?: string
): Promise<AdvancedCompanySearchResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
