import { FastifyPluginAsync } from 'fastify'
import {
  getRegisters,
  Context,
  initGetRegistersCollection
} from '../service/getRegisters.js'
import { auth } from './reflect.js'
import {
  GetRegistersSchema as schema,
  GetRegistersQueryString,
  GetRegistersParams
} from '../schemas/getRegistersSchema.js'

const getRegistersController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.log = fastify.log.child({ route: 'getRegisters' })
  await initGetRegistersCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetRegistersParams
    Querystring: GetRegistersQueryString
  }>('/company/:company_number/registers', schema, async (req, res) => {
    const { company_number } = req.params

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
    const result = getRegisters(context, company_number)
    if (result) return result
    else
      res
        .code(404)
        .send({ statusCode: 404, error: 'Not found', message: 'Not found' })
  })
}
export default getRegistersController
