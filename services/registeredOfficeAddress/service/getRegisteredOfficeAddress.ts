import type { GetRegisteredOfficeAddressResponse } from '../schemas/getRegisteredOfficeAddressSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { GetRegisteredOfficeAddressSchema } from '../schemas/getRegisteredOfficeAddressSchema.js'
import { reflect } from '../controllers/reflect.js'

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
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const schema = {
      ...GetRegisteredOfficeAddressSchema['schema']['response']['200']
    }
    delete schema.example // not supported by mongodb
    await db.createCollection(colName, {
      storageEngine: { wiredTiger: { configString: 'block_compressor=zstd' } }
      // schema validation is temporarily disabled because mongo uses BSONschema which has slightly different types (doesn't support integer)
      // validator: {$jsonSchema: schema },
      // validationAction: "error" || "warn" // if a write fails validation
    })
    await db.collection(colName).createIndex({ company_number: 1 })
  }
}

/**
 * Registered Office Address.
 *
 * Get the current address of a company.
 *
 */
export async function getRegisteredOfficeAddress(
  context: Context,
  company_number: string
): Promise<GetRegisteredOfficeAddressResponse> {
  const collection =
    context.mongo.db.collection<GetRegisteredOfficeAddressResponse>(colName)
  let res = await collection.findOne({ company_number })
  if (!res) {
    res = await callGetRegisteredOfficeAddressApi({ company_number }, {})
    if (res) {
      try {
        await collection.updateOne(
          { company_number },
          { $set: res },
          { upsert: true }
        )
      } catch (e) {
        if (e.code === 121) {
          context.req.log.warn(
            { company_number },
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

async function callGetRegisteredOfficeAddressApi(pathParams, queryParams) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, v.toString()])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)
  const path = '/company/{company_number}/registered-office-address'.replace(
    /\{(.+?)}/g,
    (w, n) => pathParams[n]
  )
  return await reflect(path + '?' + urlQuery.toString())
}
