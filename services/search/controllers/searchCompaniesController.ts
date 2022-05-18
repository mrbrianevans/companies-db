import { FastifyPluginAsync } from 'fastify'
import { searchCompanies } from '../service/searchCompanies.js'
import { reflect, auth } from './reflect.js'
import {
  SearchCompaniesSchema as schema,
  SearchCompaniesQueryString,
  SearchCompaniesParams,
} from '../schemas/SearchCompaniesSchema.js'

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
    res.header('X-Ratelimit-Limit', ratelimit.limit)
    res.header('X-Ratelimit-Remain', ratelimit.remain)
    res.header('X-Ratelimit-Reset', ratelimit.reset)
    res.header('X-Ratelimit-Window', ratelimit.window)
    return reflect(req.url)
    return searchCompanies(q, items_per_page, start_index, restrictions)
  })
}
