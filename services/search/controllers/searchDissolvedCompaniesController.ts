import {FastifyPluginAsync} from "fastify";
import {searchDissolvedCompanies} from "../service/searchDissolvedCompanies.js";
import {
  SearchDissolvedCompaniesParams,
  SearchDissolvedCompaniesQueryString,
  SearchDissolvedCompaniesSchema as schema
} from "../schemas/SearchDissolvedCompaniesSchema.js";


export const searchDissolvedCompaniesController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: SearchDissolvedCompaniesParams, Querystring: SearchDissolvedCompaniesQueryString }>('/dissolved-search/companies', schema, (req, res) => {
    const {} = req.params
    const {q, search_type, search_above, search_below, size, start_index} = req.query
    return searchDissolvedCompanies(q, search_type, search_above, search_below, size, start_index)
  })
}

