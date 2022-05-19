import { FastifyPluginAsync } from 'fastify'
import { getExemptions } from '../service/getExemptions.js'
import { reflect, auth } from './reflect.js'
import {
  GetExemptionsSchema as schema,
  GetExemptionsQueryString,
  GetExemptionsParams
} from '../schemas/getExemptionsSchema.js'

export const getExemptionsController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetExemptionsParams
    Querystring: GetExemptionsQueryString
  }>('/company/:company_number/exemptions', schema, async (req, res) => {
    const { company_number } = req.params
    const {} = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    res.header('X-Ratelimit-Limit', ratelimit.limit)
    res.header('X-Ratelimit-Remain', ratelimit.remain)
    res.header('X-Ratelimit-Reset', ratelimit.reset)
    res.header('X-Ratelimit-Window', ratelimit.window)
    return reflect(req.url)
    return getExemptions(company_number)
  })
}
