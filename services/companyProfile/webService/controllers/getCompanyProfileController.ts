import { FastifyPluginAsync } from 'fastify'
import {
  getCompanyProfile,
  Context,
  initGetCompanyProfileCollection
} from '../service/getCompanyProfile.js'
import { reflect, auth } from './reflect.js'
import {
  GetCompanyProfileSchema as schema,
  GetCompanyProfileQueryString,
  GetCompanyProfileParams
} from '../schemas/getCompanyProfileSchema.js'

export const getCompanyProfileController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  await initGetCompanyProfileCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetCompanyProfileParams
    Querystring: GetCompanyProfileQueryString
  }>('/company/:company_number', schema, async (req, res) => {
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
    const result = getCompanyProfile(context, company_number)
    if (result) return result
    else res.code(404).send('Not found')
  })
}
