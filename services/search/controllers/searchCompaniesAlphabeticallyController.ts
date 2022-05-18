import { FastifyPluginAsync } from 'fastify'
import { searchCompaniesAlphabetically } from '../service/searchCompaniesAlphabetically.js'
import {
  SearchCompaniesAlphabeticallySchema as schema,
  SearchCompaniesAlphabeticallyQueryString,
  SearchCompaniesAlphabeticallyParams,
} from '../schemas/SearchCompaniesAlphabeticallySchema.js'

export const searchCompaniesAlphabeticallyController: FastifyPluginAsync =
  async (fastify, opts) => {
    fastify.get<{
      Params: SearchCompaniesAlphabeticallyParams
      Querystring: SearchCompaniesAlphabeticallyQueryString
    }>('/alphabetic-search/companies', schema, (req, res) => {
      const {} = req.params
      const { q, search_above, search_below, size } = req.query
      return searchCompaniesAlphabetically(q, search_above, search_below, size)
    })
  }
