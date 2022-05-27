import type { ListOfficerAppointmentsResponse } from '../schemas/listOfficerAppointmentsSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

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
  await db.createCollection(colName, {
    storageEngine: { wiredTiger: { configString: 'blockCompressor=zstd' } }
  })
}

/**
 * Officer Appointment List.
 *
 * List of all officer appointments.
 */
export async function listOfficerAppointments(
  context: Context,
  officer_id: string,
  items_per_page?: number,
  start_index?: number
): Promise<ListOfficerAppointmentsResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
