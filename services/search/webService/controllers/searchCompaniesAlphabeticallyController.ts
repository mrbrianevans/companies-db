import { FastifyPluginAsync } from 'fastify'
import {
  searchCompaniesAlphabetically,
  Context,
  initSearchCompaniesAlphabeticallyCollection
} from '../service/searchCompaniesAlphabetically.js'
import { auth } from './reflect.js'
import {
  SearchCompaniesAlphabeticallySchema as schema,
  SearchCompaniesAlphabeticallyQueryString,
  SearchCompaniesAlphabeticallyParams
} from '../schemas/searchCompaniesAlphabeticallySchema.js'

export const searchCompaniesAlphabeticallyController: FastifyPluginAsync =
  async (fastify, opts) => {
    fastify.log = fastify.log.child({ route: 'searchCompaniesAlphabetically' })
    await initSearchCompaniesAlphabeticallyCollection(fastify.mongo.db)
    fastify.get<{
      Params: SearchCompaniesAlphabeticallyParams
      Querystring: SearchCompaniesAlphabeticallyQueryString
    }>('/alphabetical-search/companies', schema, async (req, res) => {
      const { q, search_above, search_below, size } = req.query
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
      const result = searchCompaniesAlphabetically(
        context,
        q,
        search_above,
        search_below,
        size
      )
      if (result) return result
      else
        res
          .code(404)
          .send({ statusCode: 404, error: 'Not found', message: 'Not found' })
    })
  }
