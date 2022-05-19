import { FastifyPluginAsync } from 'fastify'
import { advancedCompanySearch } from '../service/advancedCompanySearch.js'
import { reflect, auth } from './reflect.js'
import {
  AdvancedCompanySearchSchema as schema,
  AdvancedCompanySearchQueryString,
  AdvancedCompanySearchParams
} from '../schemas/advancedCompanySearchSchema.js'

export const advancedCompanySearchController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: AdvancedCompanySearchParams
    Querystring: AdvancedCompanySearchQueryString
  }>('/advanced-search/companies', schema, async (req, res) => {
    const {} = req.params
    const {
      company_name,
      company_status,
      company_subtype,
      company_type,
      dissolved_from,
      dissolved_to,
      incorporated_from,
      incorporated_to,
      location,
      sic_codes,
      size,
      start_index
    } = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    res.header('X-Ratelimit-Limit', ratelimit.limit)
    res.header('X-Ratelimit-Remain', ratelimit.remain)
    res.header('X-Ratelimit-Reset', ratelimit.reset)
    res.header('X-Ratelimit-Window', ratelimit.window)
    return reflect(req.url)
    return advancedCompanySearch(
      company_name,
      company_status,
      company_subtype,
      company_type,
      dissolved_from,
      dissolved_to,
      incorporated_from,
      incorporated_to,
      location,
      sic_codes,
      size,
      start_index
    )
  })
}
