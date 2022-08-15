import { FastifyPluginAsync } from 'fastify'
import {
  listCompanyOfficers,
  Context,
  initListCompanyOfficersCollection
} from '../service/listCompanyOfficers.js'
import { auth } from './reflect.js'
import {
  ListCompanyOfficersSchema as schema,
  ListCompanyOfficersQueryString,
  ListCompanyOfficersParams
} from '../schemas/listCompanyOfficersSchema.js'

export const listCompanyOfficersController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.log = fastify.log.child({ route: 'listCompanyOfficers' })
  await initListCompanyOfficersCollection(fastify.mongo.db)
  fastify.get<{
    Params: ListCompanyOfficersParams
    Querystring: ListCompanyOfficersQueryString
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
    const result = listCompanyOfficers(
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
