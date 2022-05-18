import {FastifyPluginAsync} from "fastify";
import {searchCompanies} from "../service/searchCompanies.js";
import {
  SearchCompaniesParams,
  SearchCompaniesQueryString,
  SearchCompaniesSchema as schema
} from "../schemas/SearchCompaniesSchema.js";


export const searchCompaniesController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: SearchCompaniesParams, Querystring: SearchCompaniesQueryString }>('/search/companies', schema, (req, res) => {
    const {} = req.params
    const {, , , }
    = req.query
    return searchCompanies(q, items_per_page, start_index, restrictions)
  })
}

