import {FastifyPluginAsync} from "fastify";
import {searchCompaniesAlphabetically} from "../service/searchCompaniesAlphabetically.js";
import {
  searchCompaniesAlphabeticallyParams,
  searchCompaniesAlphabeticallyQueryString,
  searchCompaniesAlphabeticallySchema as schema
} from "../schemas/searchCompaniesAlphabeticallySchema.js";


export const searchCompaniesAlphabeticallyController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: searchCompaniesAlphabeticallyParams, Querystring: searchCompaniesAlphabeticallyQueryString }>('/alphabetic-search/companies', schema, (req, res) => {
    const {} = req.params
    const {, , , }
    = req.query
    return searchCompaniesAlphabetically(q, search_above, search_below, size)
  })
}

