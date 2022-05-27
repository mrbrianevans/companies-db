import { FastifyPluginAsync } from 'fastify'
import {
  searchDissolvedCompanies,
  Context
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
  fastify.get<{
    Params: SearchDissolvedCompaniesParams
    Querystring: SearchDissolvedCompaniesQueryString
  }>('/dissolved-search/companies', schema, async (req, res) => {
    const {} = req.params
    const { q, search_type, search_above, search_below, size, start_index } =
      req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit))
      res.header(header, value)
    return reflect(req.url)
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    return searchDissolvedCompanies(
      context,
      q,
      search_type,
      search_above,
      search_below,
      size,
      start_index
    )
  })
}
