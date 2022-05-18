import {FastifyPluginAsync} from "fastify";
import {listOfficers} from "../service/listOfficers.js";
import {
  ListOfficersParams,
  ListOfficersQueryString,
  ListOfficersSchema as schema
} from "../schemas/ListOfficersSchema.js";


export const listOfficersController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: ListOfficersParams, Querystring: ListOfficersQueryString }>('/company/:company_number/officers', schema, (req, res) => {
    const {company_number} = req.params
    const {items_per_page, register_type, register_view, start_index, order_by} = req.query
    return listOfficers(company_number, items_per_page, register_type, register_view, start_index, order_by)
  })
}

