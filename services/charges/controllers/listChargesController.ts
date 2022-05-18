import { FastifyPluginAsync } from 'fastify'
import { listCharges } from '../service/listCharges.js'
import {
  ListChargesSchema as schema,
  ListChargesQueryString,
  ListChargesParams,
} from '../schemas/ListChargesSchema.js'

export const listChargesController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: ListChargesParams
    Querystring: ListChargesQueryString
  }>('/company/:company_number/charges', schema, (req, res) => {
    const { company_number } = req.params
    const {} = req.query
    return listCharges(company_number)
  })
}
