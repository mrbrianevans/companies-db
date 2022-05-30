import type { ListStatementsResponse } from '../schemas/listStatementsSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { ListStatementsSchema } from '../schemas/listStatementsSchema.js'
import { reflect } from '../controllers/reflect.js'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the listStatements service
const colName = 'listStatements'

/** Must be called before any data is inserted */
export async function initListStatementsCollection(
  db: FastifyMongoObject['db']
) {
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const schema = { ...ListStatementsSchema['schema']['response']['200'] }
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
 * List the company persons with significant control statements.
 *
 * List of all persons with significant control statements.
 *
 */
export async function listStatements(
  context: Context,
  company_number: string,
  items_per_page?: number,
  start_index?: number,
  register_view?: undefined
): Promise<ListStatementsResponse> {
  const collection =
    context.mongo.db.collection<ListStatementsResponse>(colName)
  let res = await collection.findOne({ company_number })
  if (!res) {
    res = await callListStatementsApi(
      { company_number },
      { items_per_page, start_index, register_view }
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
            { company_number, items_per_page, start_index, register_view },
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

async function callListStatementsApi(pathParams, queryParams) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, v.toString()])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)
  const path =
    '/company/{company_number}/persons-with-significant-control-statements'.replace(
      /\{(.+?)}/g,
      (w, n) => pathParams[n]
    )
  return await reflect(path + '?' + urlQuery.toString())
}
