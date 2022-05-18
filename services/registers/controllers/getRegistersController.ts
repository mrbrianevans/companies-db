import {FastifyPluginAsync} from "fastify";
import {getRegisters} from "../service/getRegisters.js";
import {
  GetRegistersParams,
  GetRegistersQueryString,
  GetRegistersSchema as schema
} from "../schemas/GetRegistersSchema.js";


export const getRegistersController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: GetRegistersParams, Querystring: GetRegistersQueryString }>('/company/:company_number/registers', schema, (req, res) => {
    const {company_number} = req.params
    const {} = req.query
    return getRegisters(company_number)
  })
}

