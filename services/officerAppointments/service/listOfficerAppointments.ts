import type { ListOfficerAppointmentsResponse } from '../schemas/listOfficerAppointmentsSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongo } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

interface Context {
  redis: FastifyRedis
  mongo: FastifyMongo
  req: FastifyRequest
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
