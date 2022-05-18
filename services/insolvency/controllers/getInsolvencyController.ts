import {FastifyPluginAsync} from "fastify";
import {getInsolvency} from "../service/getInsolvency.js";
import {
  GetInsolvencyParams,
  GetInsolvencyQueryString,
  GetInsolvencySchema as schema
} from "../schemas/GetInsolvencySchema.js";


export const getInsolvencyController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: GetInsolvencyParams, Querystring: GetInsolvencyQueryString }>('/company/:company_number/insolvency', schema, (req, res) => {
    const {company_number} = req.params
    const {} = req.query
    return getInsolvency(company_number)
  })
}

