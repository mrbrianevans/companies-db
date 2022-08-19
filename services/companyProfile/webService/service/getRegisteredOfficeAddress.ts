import type { GetRegisteredOfficeAddressResponse } from '../schemas/getRegisteredOfficeAddressSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { GetRegisteredOfficeAddressSchema } from '../schemas/getRegisteredOfficeAddressSchema.js'
import { reflect } from '../controllers/reflect.js'
import { performance } from 'perf_hooks'
import {GetCompanyProfileResponse} from "../schemas/getCompanyProfileSchema.js";
import {callGetCompanyProfileApi} from "./getCompanyProfile.js";

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
  if (!db) throw new Error('DB not defined')
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const { example, ...schema } = {
      ...GetRegisteredOfficeAddressSchema['schema']['response']['200']
    }
    await db.createCollection(colName, {
      storageEngine: { wiredTiger: { configString: 'block_compressor=zstd' } }
      // schema validation is temporarily disabled because mongo uses BSONschema which has slightly different types (doesn't support integer)
      // validator: {$jsonSchema: schema },
      // validationAction: "error" || "warn" // if a write fails validation
    })
    await db
      .collection(colName)
      .createIndex({ company_number: 1 }, { unique: true })
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
): Promise<GetRegisteredOfficeAddressResponse | null> {
  if (!context.mongo.db) throw new Error('DB not defined')
  const collection =
    context.mongo.db.collection<GetCompanyProfileResponse>('getCompanyProfile')
  const startFind = performance.now()
  let res: { registered_office_address: any }|null = await collection.findOne({ company_number }, {projection: {registered_office_address: 1}})
  const findDurationMs = performance.now() - startFind
  context.req.log.trace(
    { findDurationMs, found: Boolean(res) },
    'Find one operation in MongoDB'
  )
  if (!res) {
    context.req.log.info({ company_number },'Registered address not found for company. Calling external API.')
    res = await callGetCompanyProfileApi({ company_number }, {})
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

    Object.assign(res?.registered_office_address??{}, {etag: 'a914a2ce96e25f11b96d05632be6426e1578ec64',
      kind: 'registered-office-address',
      links: {
        self: `/company/${company_number}/registered-office-address`
      }})

  return res?.registered_office_address ?? null
}

