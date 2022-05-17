import {FastifyPluginAsync} from "fastify";
import {getIndividual} from "../service/getIndividual.js";
import {
  getIndividualParams,
  getIndividualQueryString,
  getIndividualSchema as schema
} from "../schemas/getIndividualSchema.js";


export const getIndividualController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getIndividualParams, Querystring: getIndividualQueryString }>('/company/:company_number/persons-with-significant-control/individual/:psc_id', schema, (req, res) => {
    const {company_number, psc_id} = req.params
    const {} = req.query
    return getIndividual(company_number, psc_id)
  })
}

