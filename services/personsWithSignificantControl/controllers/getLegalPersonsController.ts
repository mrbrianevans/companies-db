import {FastifyPluginAsync} from "fastify";
import {getLegalPersons} from "../service/getLegalPersons.js";
import {
  getLegalPersonsParams,
  getLegalPersonsQueryString,
  getLegalPersonsSchema as schema
} from "../schemas/getLegalPersonsSchema.js";


export const getLegalPersonsController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getLegalPersonsParams, Querystring: getLegalPersonsQueryString }>('/company/:company_number/persons-with-significant-control/legal-person/:psc_id', schema, (req, res) => {
    const {company_number, psc_id} = req.params
    const {} = req.query
    return getLegalPersons(company_number, psc_id)
  })
}

