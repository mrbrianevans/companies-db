import type { ListOfficerAppointmentsResponse } from '../schemas/listOfficerAppointmentsSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { ListOfficerAppointmentsSchema } from '../schemas/listOfficerAppointmentsSchema.js'
import { reflect } from '../controllers/reflect.js'
import { performance } from 'perf_hooks'
import { OfficerStorage } from '../../shared/storageTypes/Officer.js'
import {transformListOfficerAppointments} from "../transformOfficer.js";
import { CompanyStorage } from '../../shared/storageTypes/Company.js'

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
  items_per_page = 35,
  start_index = 0
): Promise<ListOfficerAppointmentsResponse | null> {
  if (!context.mongo.db) throw new Error('DB not defined')
  if(items_per_page > 100) items_per_page = 100
  if(items_per_page < 0) items_per_page = 0
  const officersCollection =
    context.mongo.db.collection<OfficerStorage>('officers')
  const companiesCollection =
    context.mongo.db.collection<CompanyStorage>('companies')
  const startFind = performance.now()
  const total_results = await officersCollection.countDocuments({ person_number: parseInt(officer_id) })
  const appointments = await officersCollection.find({ person_number: parseInt(officer_id) }).skip(start_index).limit(items_per_page).toArray()
  const companies = await companiesCollection.find({ company_number: {$in: appointments.map(a=>a.company_number)} }).skip(start_index).limit(items_per_page).toArray()
  const findDurationMs = performance.now() - startFind
  context.req.log.trace(
    { findDurationMs, total_results, returned_results: appointments.length },
    'Find operation in MongoDB'
  )
  const items = appointments.map(a=>transformListOfficerAppointments(a, <CompanyStorage>companies.find(c=>c.company_number===a.company_number)))
  return {
    date_of_birth: appointments[0]?.date_of_birth,
    etag: 'c12a22174815a08d78fe2888639d5ddbfdab5779',
    is_corporate_officer: appointments[0]?.is_corporate_officer,
    name: items[0]?.name,
    items,
    items_per_page,
    kind: 'personal-appointment',
    links: {
      self: `/officers/${officer_id}/appointments`
    },
    start_index,
    total_results
  }
}

