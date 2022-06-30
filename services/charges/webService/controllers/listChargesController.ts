import { FastifyPluginAsync } from 'fastify'
import {
  listCharges,
  Context,
  initListChargesCollection
} from '../service/listCharges.js'
import { reflect, auth } from './reflect.js'
import {
  ListChargesSchema as schema,
  ListChargesQueryString,
  ListChargesParams
} from '../schemas/listChargesSchema.js'

export const listChargesController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  await initListChargesCollection(fastify.mongo.db)
  fastify.get<{
    Params: ListChargesParams
    Querystring: ListChargesQueryString
  }>('/company/:company_number/charges', schema, async (req, res) => {
    const { company_number } = req.params

    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit ?? {}))
      res.header(header, value)
    if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
      res.code(429).send('Rate limit hit')
      return
    }
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    const result = listCharges(context, company_number)
    if (result) return result
    else res.code(404).send('Not found')
  })
}
