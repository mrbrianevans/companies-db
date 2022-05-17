import {FastifyPluginAsync} from "fastify";
import {getUKEstablishments} from "../service/getUKEstablishments.js";
import {
  getUKEstablishmentsParams,
  getUKEstablishmentsQueryString,
  getUKEstablishmentsSchema as schema
} from "../schemas/getUKEstablishmentsSchema.js";


export const getUKEstablishmentsController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getUKEstablishmentsParams, Querystring: getUKEstablishmentsQueryString }>('/company/:company_number/uk-establishments', schema, (req, res) => {
    const {company_number} = req.params
    const {} = req.query
    return getUKEstablishments(company_number)
  })
}

