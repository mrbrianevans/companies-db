import { FastifyPluginAsync } from 'fastify'
import {
  listOfficerAppointments,
  Context,
  initListOfficerAppointmentsCollection
} from '../service/listOfficerAppointments.js'
import { auth } from './reflect.js'
import {
  ListOfficerAppointmentsSchema as schema,
  ListOfficerAppointmentsQueryString,
  ListOfficerAppointmentsParams
} from '../schemas/listOfficerAppointmentsSchema.js'

const listOfficerAppointmentsController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.log = fastify.log.child({ route: 'listOfficerAppointments' })
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
    if (ratelimit === null) {
      // these requests should usually be filtered out by Caddy, but just in case some make it through:
      res
        .code(401)
        .send({
          statusCode: 401,
          error: 'Not authorised',
          message: 'Basic authentication token not included in request header.'
        })
      return
    }
    if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
      res
        .code(429)
        .send({
          statusCode: 429,
          error: 'Too many requests',
          message: 'Rate limit exceeded'
        })
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
    else
      res
        .code(404)
        .send({ statusCode: 404, error: 'Not found', message: 'Not found' })
  })
}
export default listOfficerAppointmentsController
