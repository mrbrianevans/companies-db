import {FastifyPluginAsync} from "fastify";
import {getCompanyProfile} from "../service/getCompanyProfile.js";
import {
  GetCompanyProfileParams,
  GetCompanyProfileQueryString,
  GetCompanyProfileSchema as schema
} from "../schemas/GetCompanyProfileSchema.js";


export const getCompanyProfileController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: GetCompanyProfileParams, Querystring: GetCompanyProfileQueryString }>('/company/:company_number', schema, (req, res) => {
    const {company_number} = req.params
    const {} = req.query
    return getCompanyProfile(company_number)
  })
}

