import {FastifyPluginAsync} from "fastify";
import {listOfficerAppointments} from "../service/listOfficerAppointments.js";
import {
  ListOfficerAppointmentsParams,
  ListOfficerAppointmentsQueryString,
  ListOfficerAppointmentsSchema as schema
} from "../schemas/ListOfficerAppointmentsSchema.js";


export const listOfficerAppointmentsController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: ListOfficerAppointmentsParams, Querystring: ListOfficerAppointmentsQueryString }>('/officers/:officer_id/appointments', schema, (req, res) => {
    const {officer_id} = req.params
    const {items_per_page, start_index} = req.query
    return listOfficerAppointments(officer_id, items_per_page, start_index)
  })
}

