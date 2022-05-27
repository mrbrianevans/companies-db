import { FastifyPluginAsync } from 'fastify'
import { getCharges } from '../service/getCharges.js'
import { reflect, auth } from './reflect.js'
import {
  GetChargesSchema as schema,
  GetChargesQueryString,
  GetChargesParams
} from '../schemas/getChargesSchema.js'

export const getChargesController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{ Params: GetChargesParams; Querystring: GetChargesQueryString }>(
    '/company/:company_number/charges/:charge_id',
    schema,
    async (req, res) => {
      const { company_number, charge_id } = req.params
      const {} = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      for (const [header, value] of Object.entries(ratelimit))
        res.header(header, value)
      return reflect(req.url)
      const { redis, mongo } = fastify
      const context = { redis, mongo, req }
      return getCharges(context, company_number, charge_id)
    }
  )
}
