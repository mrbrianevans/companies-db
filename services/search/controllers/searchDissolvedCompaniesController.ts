import { FastifyPluginAsync } from 'fastify'
import { searchDissolvedCompanies } from '../service/searchDissolvedCompanies.js'
import { reflect, auth } from './reflect.js'
import {
  SearchDissolvedCompaniesSchema as schema,
  SearchDissolvedCompaniesQueryString,
  SearchDissolvedCompaniesParams
} from '../schemas/SearchDissolvedCompaniesSchema.js'

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
    res.header('X-Ratelimit-Limit', ratelimit.limit)
    res.header('X-Ratelimit-Remain', ratelimit.remain)
    res.header('X-Ratelimit-Reset', ratelimit.reset)
    res.header('X-Ratelimit-Window', ratelimit.window)
    return reflect(req.url)
    return searchDissolvedCompanies(
      q,
      search_type,
      search_above,
      search_below,
      size,
      start_index
    )
  })
}
