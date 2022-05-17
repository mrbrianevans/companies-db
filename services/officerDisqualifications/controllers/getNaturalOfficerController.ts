import {FastifyPluginAsync} from "fastify";
import {getNaturalOfficer} from "../service/getNaturalOfficer.js";
import {
  getNaturalOfficerParams,
  getNaturalOfficerQueryString,
  getNaturalOfficerSchema as schema
} from "../schemas/getNaturalOfficerSchema.js";


export const getNaturalOfficerController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getNaturalOfficerParams, Querystring: getNaturalOfficerQueryString }>('/disqualified-officers/natural/:officer_id', schema, (req, res) => {
    const {officer_id} = req.params
    const {} = req.query
    return getNaturalOfficer(officer_id)
  })
}

