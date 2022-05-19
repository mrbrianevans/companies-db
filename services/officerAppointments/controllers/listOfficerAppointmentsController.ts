import { FastifyPluginAsync } from 'fastify'
import { listOfficerAppointments } from '../service/listOfficerAppointments.js'
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
    res.header('X-Ratelimit-Limit', ratelimit.limit)
    res.header('X-Ratelimit-Remain', ratelimit.remain)
    res.header('X-Ratelimit-Reset', ratelimit.reset)
    res.header('X-Ratelimit-Window', ratelimit.window)
    return reflect(req.url)
    return listOfficerAppointments(officer_id, items_per_page, start_index)
  })
}
