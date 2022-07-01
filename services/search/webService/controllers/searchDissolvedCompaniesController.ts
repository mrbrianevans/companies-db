import { FastifyPluginAsync } from 'fastify'
import {
  searchDissolvedCompanies,
  Context,
  initSearchDissolvedCompaniesCollection
} from '../service/searchDissolvedCompanies.js'
import { reflect, auth } from './reflect.js'
import {
  SearchDissolvedCompaniesSchema as schema,
  SearchDissolvedCompaniesQueryString,
  SearchDissolvedCompaniesParams
} from '../schemas/searchDissolvedCompaniesSchema.js'

export const searchDissolvedCompaniesController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  await initSearchDissolvedCompaniesCollection(fastify.mongo.db)
  fastify.get<{
    Params: SearchDissolvedCompaniesParams
    Querystring: SearchDissolvedCompaniesQueryString
  }>('/dissolved-search/companies', schema, async (req, res) => {
    const { q, search_type, search_above, search_below, size, start_index } =
      req.query
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
    const result = searchDissolvedCompanies(
      context,
      q,
      search_type,
      search_above,
      search_below,
      size,
      start_index
    )
    if (result) return result
    else
      res
        .code(404)
        .send({ statusCode: 404, error: 'Not found', message: 'Not found' })
  })
}
