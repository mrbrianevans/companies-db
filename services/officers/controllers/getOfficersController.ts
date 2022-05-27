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
      for (const [header, value] of Object.entries(ratelimit))
        res.header(header, value)
      return reflect(req.url)
      const { redis, mongo } = fastify
      const context = { redis, mongo, req }
      return getOfficers(context, company_number, appointment_id)
    }
  )
}
