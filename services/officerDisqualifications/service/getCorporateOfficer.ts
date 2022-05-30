import type { GetCorporateOfficerResponse } from '../schemas/getCorporateOfficerSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { GetCorporateOfficerSchema } from '../schemas/getCorporateOfficerSchema.js'
import { reflect } from '../controllers/reflect.js'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getCorporateOfficer service
const colName = 'getCorporateOfficer'

/** Must be called before any data is inserted */
export async function initGetCorporateOfficerCollection(
  db: FastifyMongoObject['db']
) {
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const schema = { ...GetCorporateOfficerSchema['schema']['response']['200'] }
    delete schema.example // not supported by mongodb
    await db.createCollection(colName, {
      storageEngine: { wiredTiger: { configString: 'block_compressor=zstd' } }
      // schema validation is temporarily disabled because mongo uses BSONschema which has slightly different types (doesn't support integer)
      // validator: {$jsonSchema: schema },
      // validationAction: "error" || "warn" // if a write fails validation
    })
    await db.collection(colName).createIndex({ officer_id: 1 })
  }
}

/**
 * Get a corporate officers disqualifications.
 *
 * Get a corporate officer's disqualifications.
 *
 */
export async function getCorporateOfficer(
  context: Context,
  officer_id: string
): Promise<GetCorporateOfficerResponse> {
  const collection =
    context.mongo.db.collection<GetCorporateOfficerResponse>(colName)
  let res = await collection.findOne({ officer_id })
  if (!res) {
    res = await callGetCorporateOfficerApi({ officer_id }, {})
    if (res) {
      try {
        await collection.updateOne(
          { officer_id },
          { $set: res },
          { upsert: true }
        )
      } catch (e) {
        if (e.code === 121) {
          context.req.log.warn(
            { officer_id },
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

async function callGetCorporateOfficerApi(pathParams, queryParams) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, v.toString()])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)
  const path = '/disqualified-officers/corporate/{officer_id}'.replace(
    /\{(.+?)}/g,
    (w, n) => pathParams[n]
  )
  return await reflect(path + '?' + urlQuery.toString())
}
