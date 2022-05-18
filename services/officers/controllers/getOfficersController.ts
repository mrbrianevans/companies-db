import {FastifyPluginAsync} from "fastify";
import {getOfficers} from "../service/getOfficers.js";
import {GetOfficersParams, GetOfficersQueryString, GetOfficersSchema as schema} from "../schemas/GetOfficersSchema.js";


export const getOfficersController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: GetOfficersParams, Querystring: GetOfficersQueryString }>('/company/:company_number/appointments/:appointment_id', schema, (req, res) => {
    const {company_number, appointment_id} = req.params
    const {} = req.query
    return getOfficers(company_number, appointment_id)
  })
}

