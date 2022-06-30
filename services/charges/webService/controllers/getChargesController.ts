import { FastifyPluginAsync } from 'fastify'
import {
  getCharges,
  Context,
  initGetChargesCollection
} from '../service/getCharges.js'
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
  await initGetChargesCollection(fastify.mongo.db)
  fastify.get<{ Params: GetChargesParams; Querystring: GetChargesQueryString }>(
    '/company/:company_number/charges/:charge_id',
    schema,
    async (req, res) => {
      const { company_number, charge_id } = req.params

      const ratelimit = await auth({ Authorization: req.headers.authorization })
      for (const [header, value] of Object.entries(ratelimit ?? {}))
        res.header(header, value)
      if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
        res.code(429).send('Rate limit hit')
        return
      }
      const { redis, mongo } = fastify
      const context: Context = { redis, mongo, req }
      const result = getCharges(context, company_number, charge_id)
      if (result) return result
      else res.code(404).send('Not found')
    }
  )
}