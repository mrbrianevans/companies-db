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
    for (const [header, value] of Object.entries(ratelimit))
      res.header(header, value)
    return reflect(req.url)
    const { redis, mongo } = fastify
    const context = { redis, mongo, req }
    return getExemptions(context, company_number)
  })
}
