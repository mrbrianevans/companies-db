import { FastifyPluginAsync } from 'fastify'
import {
  getOfficers,
  Context,
  initGetOfficersCollection
} from '../service/getOfficers.js'
import { auth } from './reflect.js'
import {
  GetOfficersSchema as schema,
  GetOfficersQueryString,
  GetOfficersParams
} from '../schemas/getOfficersSchema.js'

export const getOfficersController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.log = fastify.log.child({ route: 'getOfficers' })
  await initGetOfficersCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetOfficersParams
    Querystring: GetOfficersQueryString
  }>(
    '/company/:company_number/appointments/:appointment_id',
    schema,
    async (req, res) => {
      const { company_number, appointment_id } = req.params

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
            message:
              'Basic authentication token not included in request header.'
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
      const result = getOfficers(context, company_number, appointment_id)
      if (result) return result
      else
        res
          .code(404)
          .send({ statusCode: 404, error: 'Not found', message: 'Not found' })
    }
  )
}
