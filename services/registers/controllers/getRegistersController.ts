import {FastifyPluginAsync} from "fastify";
import {getRegisters} from "../service/getRegisters.js";
import {
  getRegistersParams,
  getRegistersQueryString,
  getRegistersSchema as schema
} from "../schemas/getRegistersSchema.js";


export const getRegistersController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getRegistersParams, Querystring: getRegistersQueryString }>('/company/:company_number/registers', schema, (req, res) => {
    const {company_number} = req.params
    const {} = req.query
    return getRegisters(company_number)
  })
}

