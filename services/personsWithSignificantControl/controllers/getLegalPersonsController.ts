import {FastifyPluginAsync} from "fastify";
import {getLegalPersons} from "../service/getLegalPersons.js";
import {
  GetLegalPersonsParams,
  GetLegalPersonsQueryString,
  GetLegalPersonsSchema as schema
} from "../schemas/GetLegalPersonsSchema.js";


export const getLegalPersonsController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: GetLegalPersonsParams, Querystring: GetLegalPersonsQueryString }>('/company/:company_number/persons-with-significant-control/legal-person/:psc_id', schema, (req, res) => {
    const {company_number, psc_id} = req.params
    const {} = req.query
    return getLegalPersons(company_number, psc_id)
  })
}

