import {FastifyPluginAsync} from "fastify";
import {getInsolvency} from "../service/getInsolvency.js";
import {
  getInsolvencyParams,
  getInsolvencyQueryString,
  getInsolvencySchema as schema
} from "../schemas/getInsolvencySchema.js";


export const getInsolvencyController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getInsolvencyParams, Querystring: getInsolvencyQueryString }>('/company/:company_number/insolvency', schema, (req, res) => {
    const {company_number} = req.params
    const {} = req.query
    return getInsolvency(company_number)
  })
}

