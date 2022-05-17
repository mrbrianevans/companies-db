import {FastifyPluginAsync} from "fastify";
import {getCorporateOfficer} from "../service/getCorporateOfficer.js";
import {
  getCorporateOfficerParams,
  getCorporateOfficerQueryString,
  getCorporateOfficerSchema as schema
} from "../schemas/getCorporateOfficerSchema.js";


export const getCorporateOfficerController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getCorporateOfficerParams, Querystring: getCorporateOfficerQueryString }>('/disqualified-officers/corporate/:officer_id', schema, (req, res) => {
    const {officer_id} = req.params
    const {} = req.query
    return getCorporateOfficer(officer_id)
  })
}

