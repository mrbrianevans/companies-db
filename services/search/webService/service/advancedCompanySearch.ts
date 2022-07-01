import type { AdvancedCompanySearchResponse } from '../schemas/advancedCompanySearchSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { AdvancedCompanySearchSchema } from '../schemas/advancedCompanySearchSchema.js'
import { reflect } from '../controllers/reflect.js'
import { performance } from 'perf_hooks'

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
  if (!db) throw new Error('DB not defined')
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const { example, ...schema } = {
      ...AdvancedCompanySearchSchema['schema']['response']['200']
    }
    await db.createCollection(colName, {
      storageEngine: { wiredTiger: { configString: 'block_compressor=zstd' } }
      // schema validation is temporarily disabled because mongo uses BSONschema which has slightly different types (doesn't support integer)
      // validator: {$jsonSchema: schema },
      // validationAction: "error" || "warn" // if a write fails validation
    })
  }
}

/**
 * Advanced search for a company.
 *
 * Advanced search for a company.
 *
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
): Promise<AdvancedCompanySearchResponse | null> {
  if (!context.mongo.db) throw new Error('DB not defined')
  const collection =
    context.mongo.db.collection<AdvancedCompanySearchResponse>(colName)
  const startFind = performance.now()
  let res = await collection.findOne({})
  const findDurationMs = performance.now() - startFind
  context.req.log.trace(
    { findDurationMs, found: Boolean(res) },
    'Find one operation in MongoDB'
  )
  if (!res) {
    res = await callAdvancedCompanySearchApi(
      {},
      {
        company_name,
        company_status,
        company_subtype,
        company_type,
        dissolved_from,
        dissolved_to,
        incorporated_from,
        incorporated_to,
        location,
        sic_codes,
        size,
        start_index
      }
    )
    if (res) {
      try {
        await collection.updateOne({}, { $set: res }, { upsert: true })
      } catch (e) {
        if (e.code === 121) {
          context.req.log.warn(
            {
              company_name,
              company_status,
              company_subtype,
              company_type,
              dissolved_from,
              dissolved_to,
              incorporated_from,
              incorporated_to,
              location,
              sic_codes,
              size,
              start_index
            },
            'Failed to upsert document from API due to validation error'
          )
        } else {
          context.req.log.error(
            { err: e },
            'Failed to insert document for a different reason to validation'
          )
        }
      }
    }
  }
  return res ?? null
}

async function callAdvancedCompanySearchApi(pathParams, queryParams) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, String(v)])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)

  const path = `/advanced-search/companies`
  return await reflect(path + '?' + urlQuery.toString())
}
