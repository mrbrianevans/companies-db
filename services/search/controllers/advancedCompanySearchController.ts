import { FastifyPluginAsync } from 'fastify'
import {
  advancedCompanySearch,
  Context,
  initAdvancedCompanySearchCollection
} from '../service/advancedCompanySearch.js'
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
  await initAdvancedCompanySearchCollection(fastify.mongo.db)
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
    for (const [header, value] of Object.entries(ratelimit ?? {}))
      res.header(header, value)
    if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
      res.code(429).send('Rate limit hit')
      return
    }
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    const result = advancedCompanySearch(
      context,
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
    if (result) return result
    else res.code(404).send('Not found')
  })
}
