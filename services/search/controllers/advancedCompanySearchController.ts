import {FastifyPluginAsync} from "fastify";
import {advancedCompanySearch} from "../service/advancedCompanySearch.js";
import {
  AdvancedCompanySearchParams,
  AdvancedCompanySearchQueryString,
  AdvancedCompanySearchSchema as schema
} from "../schemas/AdvancedCompanySearchSchema.js";


export const advancedCompanySearchController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: AdvancedCompanySearchParams, Querystring: AdvancedCompanySearchQueryString }>('/advanced-search/companies', schema, (req, res) => {
    const {} = req.params
    const {, , , , , , , , , , , }
    = req.query
    return advancedCompanySearch(company_name, company_status, company_subtype, company_type, dissolved_from, dissolved_to, incorporated_from, incorporated_to, location, sic_codes, size, start_index)
  })
}

