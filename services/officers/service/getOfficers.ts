import type { GetOfficersResponse } from '../schemas/getOfficersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { GetOfficersSchema } from '../schemas/getOfficersSchema.js'
import { reflect } from '../controllers/reflect.js'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getOfficers service
const colName = 'getOfficers'

/** Must be called before any data is inserted */
export async function initGetOfficersCollection(db: FastifyMongoObject['db']) {
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const schema = { ...GetOfficersSchema['schema']['response']['200'] }
    delete schema.example // not supported by mongodb
    await db.createCollection(colName, {
      storageEngine: { wiredTiger: { configString: 'block_compressor=zstd' } }
      // schema validation is temporarily disabled because mongo uses BSONschema which has slightly different types (doesn't support integer)
      // validator: {$jsonSchema: schema },
      // validationAction: "error" || "warn" // if a write fails validation
    })
    await db
      .collection(colName)
      .createIndex({ company_number: 1, appointment_id: 1 })
  }
}

/**
 * Get a company officer appointment.
 *
 * Get details of an individual company officer appointment.
 *
 */
export async function getOfficers(
  context: Context,
  company_number: string,
  appointment_id: string
): Promise<GetOfficersResponse> {
  const collection = context.mongo.db.collection<GetOfficersResponse>(colName)
  let res = await collection.findOne({ company_number, appointment_id })
  if (!res) {
    res = await callGetOfficersApi({ company_number, appointment_id }, {})
    if (res) {
      try {
        await collection.updateOne(
          { company_number, appointment_id },
          { $set: res },
          { upsert: true }
        )
      } catch (e) {
        if (e.code === 121) {
          context.req.log.warn(
            { company_number, appointment_id },
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

async function callGetOfficersApi(pathParams, queryParams) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, v.toString()])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)
  const path =
    '/company/{company_number}/appointments/{appointment_id}'.replace(
      /\{(.+?)}/g,
      (w, n) => pathParams[n]
    )
  return await reflect(path + '?' + urlQuery.toString())
}
