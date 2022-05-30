import type { GetStatementResponse } from '../schemas/getStatementSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { GetStatementSchema } from '../schemas/getStatementSchema.js'
import { reflect } from '../controllers/reflect.js'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getStatement service
const colName = 'getStatement'

/** Must be called before any data is inserted */
export async function initGetStatementCollection(db: FastifyMongoObject['db']) {
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const schema = { ...GetStatementSchema['schema']['response']['200'] }
    delete schema.example // not supported by mongodb
    await db.createCollection(colName, {
      storageEngine: { wiredTiger: { configString: 'block_compressor=zstd' } }
      // schema validation is temporarily disabled because mongo uses BSONschema which has slightly different types (doesn't support integer)
      // validator: {$jsonSchema: schema },
      // validationAction: "error" || "warn" // if a write fails validation
    })
    await db
      .collection(colName)
      .createIndex({ company_number: 1, statement_id: 1 })
  }
}

/**
 * Get the person with significant control statement.
 *
 * Get details of a person with significant control statement.
 *
 */
export async function getStatement(
  context: Context,
  company_number: string,
  statement_id: string
): Promise<GetStatementResponse> {
  const collection = context.mongo.db.collection<GetStatementResponse>(colName)
  let res = await collection.findOne({ company_number, statement_id })
  if (!res) {
    res = await callGetStatementApi({ company_number, statement_id }, {})
    if (res) {
      try {
        await collection.updateOne(
          { company_number, statement_id },
          { $set: res },
          { upsert: true }
        )
      } catch (e) {
        if (e.code === 121) {
          context.req.log.warn(
            { company_number, statement_id },
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

async function callGetStatementApi(pathParams, queryParams) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, v.toString()])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)
  const path =
    '/company/{company_number}/persons-with-significant-control-statements/{statement_id}'.replace(
      /\{(.+?)}/g,
      (w, n) => pathParams[n]
    )
  return await reflect(path + '?' + urlQuery.toString())
}
