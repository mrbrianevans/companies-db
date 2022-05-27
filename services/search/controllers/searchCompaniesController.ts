import { FastifyPluginAsync } from 'fastify'
import { searchCompanies, Context } from '../service/searchCompanies.js'
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
  fastify.get<{
    Params: SearchCompaniesParams
    Querystring: SearchCompaniesQueryString
  }>('/search/companies', schema, async (req, res) => {
    const {} = req.params
    const { q, items_per_page, start_index, restrictions } = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit))
      res.header(header, value)
    return reflect(req.url)
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    return searchCompanies(
      context,
      q,
      items_per_page,
      start_index,
      restrictions
    )
  })
}
