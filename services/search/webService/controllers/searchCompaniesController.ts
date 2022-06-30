import { FastifyPluginAsync } from 'fastify'
import {
  searchCompanies,
  Context,
  initSearchCompaniesCollection
} from '../service/searchCompanies.js'
import { reflect, auth } from './reflect.js'
import {
  SearchCompaniesSchema as schema,
  SearchCompaniesQueryString,
  SearchCompaniesParams
} from '../schemas/searchCompaniesSchema.js'

export const searchCompaniesController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  await initSearchCompaniesCollection(fastify.mongo.db)
  fastify.get<{
    Params: SearchCompaniesParams
    Querystring: SearchCompaniesQueryString
  }>('/search/companies', schema, async (req, res) => {
    const { q, items_per_page, start_index, restrictions } = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit ?? {}))
      res.header(header, value)
    if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
      res.code(429).send('Rate limit hit')
      return
    }
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    const result = searchCompanies(
      context,
      q,
      items_per_page,
      start_index,
      restrictions
    )
    if (result) return result
    else res.code(404).send('Not found')
  })
}
