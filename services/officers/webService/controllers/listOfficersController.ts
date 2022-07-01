import { FastifyPluginAsync } from 'fastify'
import {
  listOfficers,
  Context,
  initListOfficersCollection
} from '../service/listOfficers.js'
import { reflect, auth } from './reflect.js'
import {
  ListOfficersSchema as schema,
  ListOfficersQueryString,
  ListOfficersParams
} from '../schemas/listOfficersSchema.js'

export const listOfficersController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  await initListOfficersCollection(fastify.mongo.db)
  fastify.get<{
    Params: ListOfficersParams
    Querystring: ListOfficersQueryString
  }>('/company/:company_number/officers', schema, async (req, res) => {
    const { company_number } = req.params
    const {
      items_per_page,
      register_type,
      register_view,
      start_index,
      order_by
    } = req.query
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
    const result = listOfficers(
      context,
      company_number,
      items_per_page,
      register_type,
      register_view,
      start_index,
      order_by
    )
    if (result) return result
    else
      res
        .code(404)
        .send({ statusCode: 404, error: 'Not found', message: 'Not found' })
  })
}
