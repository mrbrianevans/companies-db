import { FastifyPluginAsync } from 'fastify'
import {
  getOfficers,
  Context,
  initGetOfficersCollection
} from '../service/getOfficers.js'
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
  await initGetOfficersCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetOfficersParams
    Querystring: GetOfficersQueryString
  }>(
    '/company/:company_number/appointments/:appointment_id',
    schema,
    async (req, res) => {
      const { company_number, appointment_id } = req.params

      const ratelimit = await auth({ Authorization: req.headers.authorization })
      for (const [header, value] of Object.entries(ratelimit ?? {}))
        res.header(header, value)
      if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
        res.code(429).send('Rate limit hit')
        return
      }
      const { redis, mongo } = fastify
      const context: Context = { redis, mongo, req }
      const result = getOfficers(context, company_number, appointment_id)
      if (result) return result
      else res.code(404).send('Not found')
    }
  )
}
