import { FastifyPluginAsync } from 'fastify'
import {
  getNaturalOfficer,
  Context,
  initGetNaturalOfficerCollection
} from '../service/getNaturalOfficer.js'
import { auth } from './reflect.js'
import {
  GetNaturalOfficerSchema as schema,
  GetNaturalOfficerQueryString,
  GetNaturalOfficerParams
} from '../schemas/getNaturalOfficerSchema.js'

const getNaturalOfficerController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.log = fastify.log.child({ route: 'getNaturalOfficer' })
  await initGetNaturalOfficerCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetNaturalOfficerParams
    Querystring: GetNaturalOfficerQueryString
  }>('/disqualified-officers/natural/:officer_id', schema, async (req, res) => {
    const { officer_id } = req.params

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
    const result = getNaturalOfficer(context, officer_id)
    if (result) return result
    else
      res
        .code(404)
        .send({ statusCode: 404, error: 'Not found', message: 'Not found' })
  })
}
export default getNaturalOfficerController
