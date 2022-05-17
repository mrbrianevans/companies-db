import {FastifyPluginAsync} from "fastify";
import {listOfficerAppointments} from "../service/listOfficerAppointments.js";
import {
  listOfficerAppointmentsParams,
  listOfficerAppointmentsQueryString,
  listOfficerAppointmentsSchema as schema
} from "../schemas/listOfficerAppointmentsSchema.js";


export const listOfficerAppointmentsController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: listOfficerAppointmentsParams, Querystring: listOfficerAppointmentsQueryString }>('/officers/:officer_id/appointments', schema, (req, res) => {
    const {officer_id} = req.params
    const {, }
    = req.query
    return listOfficerAppointments(officer_id, items_per_page, start_index)
  })
}

