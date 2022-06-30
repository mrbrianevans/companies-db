import { FastifyPluginAsync } from 'fastify'
import {
  listOfficerAppointments,
  Context,
  initListOfficerAppointmentsCollection
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
  await initListOfficerAppointmentsCollection(fastify.mongo.db)
  fastify.get<{
    Params: ListOfficerAppointmentsParams
    Querystring: ListOfficerAppointmentsQueryString
  }>('/officers/:officer_id/appointments', schema, async (req, res) => {
    const { officer_id } = req.params
    const { items_per_page, start_index } = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit ?? {}))
      res.header(header, value)
    if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
      res.code(429).send('Rate limit hit')
      return
    }
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    const result = listOfficerAppointments(
      context,
      officer_id,
      items_per_page,
      start_index
    )
    if (result) return result
    else res.code(404).send('Not found')
  })
}
