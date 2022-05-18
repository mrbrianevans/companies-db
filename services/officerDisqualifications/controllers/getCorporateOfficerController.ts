import {FastifyPluginAsync} from "fastify";
import {getCorporateOfficer} from "../service/getCorporateOfficer.js";
import {
  GetCorporateOfficerParams,
  GetCorporateOfficerQueryString,
  GetCorporateOfficerSchema as schema
} from "../schemas/GetCorporateOfficerSchema.js";


export const getCorporateOfficerController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: GetCorporateOfficerParams, Querystring: GetCorporateOfficerQueryString }>('/disqualified-officers/corporate/:officer_id', schema, (req, res) => {
    const {officer_id} = req.params
    const {} = req.query
    return getCorporateOfficer(officer_id)
  })
}

