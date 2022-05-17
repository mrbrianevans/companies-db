import {FastifyPluginAsync} from "fastify";
import {getCompanyProfile} from "../service/getCompanyProfile.js";
import {
  getCompanyProfileParams,
  getCompanyProfileQueryString,
  getCompanyProfileSchema as schema
} from "../schemas/getCompanyProfileSchema.js";


export const getCompanyProfileController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getCompanyProfileParams, Querystring: getCompanyProfileQueryString }>('/company/:company_number', schema, (req, res) => {
    const {company_number} = req.params
    const {} = req.query
    return getCompanyProfile(company_number)
  })
}

