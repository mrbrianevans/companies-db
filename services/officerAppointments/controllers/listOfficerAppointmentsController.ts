import { FastifyPluginAsync } from 'fastify'
import {
  listOfficerAppointments,
  Context
} from '../service/listOfficerAppointments.js'
import { reflect, auth } from './reflect.js'
import {
  ListOfficerAppointmentsSchema as schema,
  ListOfficerAppointmentsQueryString,
  ListOfficerAppointmentsParams
} from '../schemas/listOfficerAppointmentsSchema.js'

export const listOfficerAppointmentsController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: ListOfficerAppointmentsParams
    Querystring: ListOfficerAppointmentsQueryString
  }>('/officers/:officer_id/appointments', schema, async (req, res) => {
    const { officer_id } = req.params
    const { items_per_page, start_index } = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit))
      res.header(header, value)
    return reflect(req.url)
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    return listOfficerAppointments(
      context,
      officer_id,
      items_per_page,
      start_index
    )
  })
}
