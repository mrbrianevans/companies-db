import type {GetOfficerAppointmentResponse} from '../schemas/getOfficerAppointmentSchema.js'
import {GetOfficerAppointmentSchema} from '../schemas/getOfficerAppointmentSchema.js'
import type {FastifyRedis} from '@fastify/redis'
import type {FastifyMongoObject} from '@fastify/mongodb'
import type {FastifyRequest} from 'fastify'
import {reflect} from '../controllers/reflect.js'
import {performance} from 'perf_hooks'
import {OfficerStorage} from '../../shared/storageTypes/Officer.js'
import {transformGetOfficerAppointment} from "../transformOfficer.js";

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the getOfficerAppointment service
const colName = 'getOfficerAppointment'

/** Must be called before any data is inserted */
export async function initGetOfficerAppointmentCollection(
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
      ...GetOfficerAppointmentSchema['schema']['response']['200']
    }
    await db.createCollection(colName, {
      storageEngine: { wiredTiger: { configString: 'block_compressor=zstd' } }
      // schema validation is temporarily disabled because mongo uses BSONschema which has slightly different types (doesn't support integer)
      // validator: {$jsonSchema: schema },
      // validationAction: "error" || "warn" // if a write fails validation
    })
    await db
      .collection(colName)
      .createIndex({ company_number: 1, appointment_id: 1 }, { unique: true })
  }
}

/**
 * Get a company officer appointment.
 *
 * Get details of an individual company officer appointment.
 *
 */
export async function getOfficerAppointment(
  context: Context,
  company_number: string,
  appointment_id: string
): Promise<GetOfficerAppointmentResponse | null> {
  if (!context.mongo.db) throw new Error('DB not defined')
  const collection =
    context.mongo.db.collection<OfficerStorage>('officers')
  const startFind = performance.now()
  let res = await collection.findOne({ company_number, person_number: parseInt(appointment_id) })
  const findDurationMs = performance.now() - startFind
  context.req.log.trace(
    { findDurationMs, found: Boolean(res) },
    'Find one operation in MongoDB'
  )
  if (!res) {
    return null
  }else{
    return transformGetOfficerAppointment(res)
  }
}

async function callGetOfficerAppointmentApi(pathParams, queryParams) {
  const nonNullQueryParams = Object.fromEntries(
    Object.entries(queryParams)
      .filter(([k, v]) => v)
      .map(([k, v]) => [k, String(v)])
  )
  const urlQuery = new URLSearchParams(nonNullQueryParams)
  const { company_number, appointment_id } = pathParams
  const path = `/company/${company_number}/appointments/${appointment_id}`
  return await reflect(path + '?' + urlQuery.toString())
}
