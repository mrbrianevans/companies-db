import { FastifyPluginAsync } from 'fastify'
import { getCharges } from '../service/getCharges.js'
import { reflect, auth } from './reflect.js'
import {
  GetChargesSchema as schema,
  GetChargesQueryString,
  GetChargesParams,
} from '../schemas/GetChargesSchema.js'

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
      res.header('X-Ratelimit-Limit', ratelimit.limit)
      res.header('X-Ratelimit-Remain', ratelimit.remain)
      res.header('X-Ratelimit-Reset', ratelimit.reset)
      res.header('X-Ratelimit-Window', ratelimit.window)
      return reflect(req.url)
      return getCharges(company_number, charge_id)
    }
  )
}
