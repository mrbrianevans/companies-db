import { FastifyPluginAsync } from 'fastify'
import { listCharges } from '../service/listCharges.js'
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
  fastify.get<{
    Params: ListChargesParams
    Querystring: ListChargesQueryString
  }>('/company/:company_number/charges', schema, async (req, res) => {
    const { company_number } = req.params
    const {} = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit))
      res.header(header, value)
    return reflect(req.url)
    const { redis, mongo } = fastify
    const context = { redis, mongo, req }
    return listCharges(context, company_number)
  })
}
