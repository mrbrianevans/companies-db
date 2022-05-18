import {FastifyPluginAsync} from "fastify";
import {getNaturalOfficer} from "../service/getNaturalOfficer.js";
import {
  GetNaturalOfficerParams,
  GetNaturalOfficerQueryString,
  GetNaturalOfficerSchema as schema
} from "../schemas/GetNaturalOfficerSchema.js";


export const getNaturalOfficerController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: GetNaturalOfficerParams, Querystring: GetNaturalOfficerQueryString }>('/disqualified-officers/natural/:officer_id', schema, (req, res) => {
    const {officer_id} = req.params
    const {} = req.query
    return getNaturalOfficer(officer_id)
  })
}

