import { FastifyPluginAsync } from 'fastify'
import { getOfficers } from '../service/getOfficers.js'
import { reflect, auth } from './reflect.js'
import {
  GetOfficersSchema as schema,
  GetOfficersQueryString,
  GetOfficersParams
} from '../schemas/getOfficersSchema.js'

export const getOfficersController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetOfficersParams
    Querystring: GetOfficersQueryString
  }>(
    '/company/:company_number/appointments/:appointment_id',
    schema,
    async (req, res) => {
      const { company_number, appointment_id } = req.params
      const {} = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      res.header('X-Ratelimit-Limit', ratelimit.limit)
      res.header('X-Ratelimit-Remain', ratelimit.remain)
      res.header('X-Ratelimit-Reset', ratelimit.reset)
      res.header('X-Ratelimit-Window', ratelimit.window)
      return reflect(req.url)
      return getOfficers(company_number, appointment_id)
    }
  )
}
