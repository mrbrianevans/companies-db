import { FastifyPluginAsync } from 'fastify'
import {
  searchCompaniesAlphabetically,
  Context,
  initSearchCompaniesAlphabeticallyCollection
} from '../service/searchCompaniesAlphabetically.js'
import { reflect, auth } from './reflect.js'
import {
  SearchCompaniesAlphabeticallySchema as schema,
  SearchCompaniesAlphabeticallyQueryString,
  SearchCompaniesAlphabeticallyParams
} from '../schemas/searchCompaniesAlphabeticallySchema.js'

export const searchCompaniesAlphabeticallyController: FastifyPluginAsync =
  async (fastify, opts) => {
    await initSearchCompaniesAlphabeticallyCollection(fastify.mongo.db)
    fastify.get<{
      Params: SearchCompaniesAlphabeticallyParams
      Querystring: SearchCompaniesAlphabeticallyQueryString
    }>('/alphabetical-search/companies', schema, async (req, res) => {
      const {} = req.params
      const { q, search_above, search_below, size } = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      for (const [header, value] of Object.entries(ratelimit ?? {}))
        res.header(header, value)
      if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
        res.code(429).send('Rate limit hit')
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
      else res.code(404).send('Not found')
    })
  }
