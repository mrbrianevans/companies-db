import {FastifyPluginAsync} from "fastify";
import {searchDissolvedCompanies} from "../service/searchDissolvedCompanies.js";
import {
  searchDissolvedCompaniesParams,
  searchDissolvedCompaniesQueryString,
  searchDissolvedCompaniesSchema as schema
} from "../schemas/searchDissolvedCompaniesSchema.js";


export const searchDissolvedCompaniesController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: searchDissolvedCompaniesParams, Querystring: searchDissolvedCompaniesQueryString }>('/dissolved-search/companies', schema, (req, res) => {
    const {} = req.params
    const {, , , , , }
    = req.query
    return searchDissolvedCompanies(q, search_type, search_above, search_below, size, start_index)
  })
}

