import { FastifyPluginAsync } from 'fastify'
import {
  getInsolvency,
  Context,
  initGetInsolvencyCollection
} from '../service/getInsolvency.js'
import { reflect, auth } from './reflect.js'
import {
  GetInsolvencySchema as schema,
  GetInsolvencyQueryString,
  GetInsolvencyParams
} from '../schemas/getInsolvencySchema.js'

export const getInsolvencyController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  await initGetInsolvencyCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetInsolvencyParams
    Querystring: GetInsolvencyQueryString
  }>('/company/:company_number/insolvency', schema, async (req, res) => {
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
    const result = getInsolvency(context, company_number)
    if (result) return result
    else
      res
        .code(404)
        .send({ statusCode: 404, error: 'Not found', message: 'Not found' })
  })
}
