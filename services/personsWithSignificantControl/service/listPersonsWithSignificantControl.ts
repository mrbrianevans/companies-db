import type { ListPersonsWithSignificantControlResponse } from '../schemas/listPersonsWithSignificantControlSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { ListPersonsWithSignificantControlSchema } from '../schemas/listPersonsWithSignificantControlSchema.js'
import { reflect } from '../controllers/reflect.js'

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
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const schema = {
      ...ListPersonsWithSignificantControlSchema['schema']['response']['200']
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
 * List the company persons with significant control.
 *
 * List of all persons with significant control (not statements).
 *
 */
export async function listPersonsWithSignificantControl(
  context: Context,
  company_number: string,
  items_per_page?: string,
  start_index?: string,
  register_view?: string
): Promise<ListPersonsWithSignificantControlResponse> {
  const collection =
    context.mongo.db.collection<ListPersonsWithSignificantControlResponse>(
      colName
    )
  let res = await collection.findOne({ company_number })
  if (!res) {
    res = await callListPersonsWithSignificantControlApi(
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

async function callListPersonsWithSignificantControlApi(
  pathParams,
  queryParams
) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, v.toString()])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)
  const path =
    '/company/{company_number}/persons-with-significant-control'.replace(
      /\{(.+?)}/g,
      (w, n) => pathParams[n]
    )
  return await reflect(path + '?' + urlQuery.toString())
}
