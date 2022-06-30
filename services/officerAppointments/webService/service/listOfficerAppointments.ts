import type { ListOfficerAppointmentsResponse } from '../schemas/listOfficerAppointmentsSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { ListOfficerAppointmentsSchema } from '../schemas/listOfficerAppointmentsSchema.js'
import { reflect } from '../controllers/reflect.js'
import { performance } from 'perf_hooks'

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the listOfficerAppointments service
const colName = 'listOfficerAppointments'

/** Must be called before any data is inserted */
export async function initListOfficerAppointmentsCollection(
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
      ...ListOfficerAppointmentsSchema['schema']['response']['200']
    }
    await db.createCollection(colName, {
      storageEngine: { wiredTiger: { configString: 'block_compressor=zstd' } }
      // schema validation is temporarily disabled because mongo uses BSONschema which has slightly different types (doesn't support integer)
      // validator: {$jsonSchema: schema },
      // validationAction: "error" || "warn" // if a write fails validation
    })
    await db
      .collection(colName)
      .createIndex({ officer_id: 1 }, { unique: true })
  }
}

/**
 * Officer Appointment List.
 *
 * List of all officer appointments.
 *
 */
export async function listOfficerAppointments(
  context: Context,
  officer_id: string,
  items_per_page?: number,
  start_index?: number
): Promise<ListOfficerAppointmentsResponse | null> {
  if (!context.mongo.db) throw new Error('DB not defined')
  const collection =
    context.mongo.db.collection<ListOfficerAppointmentsResponse>(colName)
  const startFind = performance.now()
  let res = await collection.findOne({ officer_id })
  const findDurationMs = performance.now() - startFind
  context.req.log.trace(
    { findDurationMs, found: Boolean(res) },
    'Find one operation in MongoDB'
  )
  if (!res) {
    res = await callListOfficerAppointmentsApi(
      { officer_id },
      { items_per_page, start_index }
    )
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
            { officer_id, items_per_page, start_index },
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

async function callListOfficerAppointmentsApi(pathParams, queryParams) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, String(v)])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)
  const path = '/officers/{officer_id}/appointments'.replace(
    /\{(.+?)}/g,
    (w, n) => pathParams[n]
  )
  return await reflect(path + '?' + urlQuery.toString())
}
