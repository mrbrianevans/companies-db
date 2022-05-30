import { FastifyPluginAsync } from 'fastify'
import {
  getExemptions,
  Context,
  initGetExemptionsCollection
} from '../service/getExemptions.js'
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
  await initGetExemptionsCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetExemptionsParams
    Querystring: GetExemptionsQueryString
  }>('/company/:company_number/exemptions', schema, async (req, res) => {
    const { company_number } = req.params
    const {} = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit ?? {}))
      res.header(header, value)
    if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
      res.code(429).send('Rate limit hit')
      return
    }
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    const result = getExemptions(context, company_number)
    if (result) return result
    else res.code(404).send('Not found')
  })
}
