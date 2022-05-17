import {FastifyPluginAsync} from "fastify";
import {searchCompanies} from "../service/searchCompanies.js";
import {
  searchCompaniesParams,
  searchCompaniesQueryString,
  searchCompaniesSchema as schema
} from "../schemas/searchCompaniesSchema.js";


export const searchCompaniesController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: searchCompaniesParams, Querystring: searchCompaniesQueryString }>('/search/companies', schema, (req, res) => {
    const {} = req.params
    const {, , , }
    = req.query
    return searchCompanies(q, items_per_page, start_index, restrictions)
  })
}

