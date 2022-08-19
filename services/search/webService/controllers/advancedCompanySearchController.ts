import { FastifyPluginAsync } from 'fastify'
import {
  advancedCompanySearch,
  Context,
  initAdvancedCompanySearchCollection
} from '../service/advancedCompanySearch.js'
import { auth } from './reflect.js'
import {
  AdvancedCompanySearchSchema as schema,
  AdvancedCompanySearchQueryString,
  AdvancedCompanySearchParams
} from '../schemas/advancedCompanySearchSchema.js'

const advancedCompanySearchController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.log = fastify.log.child({ route: 'advancedCompanySearch' })
  await initAdvancedCompanySearchCollection(fastify.mongo.db)
  fastify.get<{
    Params: AdvancedCompanySearchParams
    Querystring: AdvancedCompanySearchQueryString
  }>('/advanced-search/companies', schema, async (req, res) => {
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
    else
      res
        .code(404)
        .send({ statusCode: 404, error: 'Not found', message: 'Not found' })
  })
}
export default advancedCompanySearchController
