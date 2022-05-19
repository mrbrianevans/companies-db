import { FastifyPluginAsync } from 'fastify'
import { listCharges } from '../service/listCharges.js'
import { reflect, auth } from './reflect.js'
import {
  ListChargesSchema as schema,
  ListChargesQueryString,
  ListChargesParams
} from '../schemas/ListChargesSchema.js'

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
    res.header('X-Ratelimit-Limit', ratelimit.limit)
    res.header('X-Ratelimit-Remain', ratelimit.remain)
    res.header('X-Ratelimit-Reset', ratelimit.reset)
    res.header('X-Ratelimit-Window', ratelimit.window)
    return reflect(req.url)
    return listCharges(company_number)
  })
}
