import {FastifyPluginAsync} from "fastify";
import {getExemptions} from "../service/getExemptions.js";
import {
  getExemptionsParams,
  getExemptionsQueryString,
  getExemptionsSchema as schema
} from "../schemas/getExemptionsSchema.js";


export const getExemptionsController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getExemptionsParams, Querystring: getExemptionsQueryString }>('/company/:company_number/exemptions', schema, (req, res) => {
    const {company_number} = req.params
    const {} = req.query
    return getExemptions(company_number)
  })
}

