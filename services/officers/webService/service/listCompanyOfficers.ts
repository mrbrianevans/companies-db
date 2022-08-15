import type { ListCompanyOfficersResponse } from '../schemas/listCompanyOfficersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { ListCompanyOfficersSchema } from '../schemas/listCompanyOfficersSchema.js'
import { reflect } from '../controllers/reflect.js'
import { performance } from 'perf_hooks'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the listCompanyOfficers service
const colName = 'listCompanyOfficers'

/** Must be called before any data is inserted */
export async function initListCompanyOfficersCollection(
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
      ...ListCompanyOfficersSchema['schema']['response']['200']
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
 * Company Officers.
 *
 * List of all company officers.
 *
 */
export async function listCompanyOfficers(
  context: Context,
  company_number: string,
  items_per_page?: number,
  register_type?: string,
  register_view?: string,
  start_index?: number,
  order_by?: string
): Promise<ListCompanyOfficersResponse | null> {
  if (!context.mongo.db) throw new Error('DB not defined')
  const collection =
    context.mongo.db.collection<ListCompanyOfficersResponse>(colName)
  const startFind = performance.now()
  let res = await collection.findOne({ company_number })
  const findDurationMs = performance.now() - startFind
  context.req.log.trace(
    { findDurationMs, found: Boolean(res) },
    'Find one operation in MongoDB'
  )
  if (!res) {
    res = await callListCompanyOfficersApi(
      { company_number },
      { items_per_page, register_type, register_view, start_index, order_by }
    )
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
            {
              company_number,
              items_per_page,
              register_type,
              register_view,
              start_index,
              order_by
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

async function callListCompanyOfficersApi(pathParams, queryParams) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, String(v)])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)
  const { company_number } = pathParams
  const path = `/company/${company_number}/officers`
  return await reflect(path + '?' + urlQuery.toString())
}
