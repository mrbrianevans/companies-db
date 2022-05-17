import {FastifyPluginAsync} from "fastify";
import {listCharges} from "../service/listCharges.js";
import {listChargesParams, listChargesQueryString, listChargesSchema as schema} from "../schemas/listChargesSchema.js";


export const listChargesController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: listChargesParams, Querystring: listChargesQueryString }>('/company/:company_number/charges', schema, (req, res) => {
    const {company_number} = req.params
    const {} = req.query
    return listCharges(company_number)
  })
}

