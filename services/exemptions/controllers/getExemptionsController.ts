import {FastifyPluginAsync} from "fastify";
import {getExemptions} from "../service/getExemptions.js";
import {
  GetExemptionsParams,
  GetExemptionsQueryString,
  GetExemptionsSchema as schema
} from "../schemas/GetExemptionsSchema.js";


export const getExemptionsController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: GetExemptionsParams, Querystring: GetExemptionsQueryString }>('/company/:company_number/exemptions', schema, (req, res) => {
    const {company_number} = req.params
    const {} = req.query
    return getExemptions(company_number)
  })
}

