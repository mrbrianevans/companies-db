import { FastifyPluginAsync } from 'fastify'
import {
  searchOfficers,
  Context,
  initSearchOfficersCollection
} from '../service/searchOfficers.js'
import { reflect, auth } from './reflect.js'
import {
  SearchOfficersSchema as schema,
  SearchOfficersQueryString,
  SearchOfficersParams
} from '../schemas/searchOfficersSchema.js'

export const searchOfficersController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  await initSearchOfficersCollection(fastify.mongo.db)
  fastify.get<{
    Params: SearchOfficersParams
    Querystring: SearchOfficersQueryString
  }>('/search/officers', schema, async (req, res) => {
    const { q, items_per_page, start_index } = req.query
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
    const result = searchOfficers(context, q, items_per_page, start_index)
    if (result) return result
    else
      res
        .code(404)
        .send({ statusCode: 404, error: 'Not found', message: 'Not found' })
  })
}
