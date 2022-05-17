import {FastifyPluginAsync} from "fastify";
import {getCharges} from "../service/getCharges.js";
import {getChargesParams, getChargesQueryString, getChargesSchema as schema} from "../schemas/getChargesSchema.js";


export const getChargesController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getChargesParams, Querystring: getChargesQueryString }>('/company/:company_number/charges/:charge_id', schema, (req, res) => {
    const {company_number, charge_id} = req.params
    const {} = req.query
    return getCharges(company_number, charge_id)
  })
}

