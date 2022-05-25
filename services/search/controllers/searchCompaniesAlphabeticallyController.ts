import { FastifyPluginAsync } from 'fastify'
import { searchCompaniesAlphabetically } from '../service/searchCompaniesAlphabetically.js'
import { reflect, auth } from './reflect.js'
import {
  SearchCompaniesAlphabeticallySchema as schema,
  SearchCompaniesAlphabeticallyQueryString,
  SearchCompaniesAlphabeticallyParams
} from '../schemas/searchCompaniesAlphabeticallySchema.js'

export const searchCompaniesAlphabeticallyController: FastifyPluginAsync =
  async (fastify, opts) => {
    fastify.get<{
      Params: SearchCompaniesAlphabeticallyParams
      Querystring: SearchCompaniesAlphabeticallyQueryString
    }>('/alphabetic-search/companies', schema, async (req, res) => {
      const {} = req.params
      const { q, search_above, search_below, size } = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      for (const [header, value] of Object.entries(ratelimit))
        res.header(header, value)
      return reflect(req.url)
      return searchCompaniesAlphabetically(q, search_above, search_below, size)
    })
  }
