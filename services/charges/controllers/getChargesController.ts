import {FastifyPluginAsync} from "fastify";
import {getCharges} from "../service/getCharges.js";
import {GetChargesParams, GetChargesQueryString, GetChargesSchema as schema} from "../schemas/GetChargesSchema.js";


export const getChargesController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: GetChargesParams, Querystring: GetChargesQueryString }>('/company/:company_number/charges/:charge_id', schema, (req, res) => {
    const {company_number, charge_id} = req.params
    const {} = req.query
    return getCharges(company_number, charge_id)
  })
}

