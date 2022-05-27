import { FastifyPluginAsync } from 'fastify'
import { getCompanyProfile } from '../service/getCompanyProfile.js'
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
  fastify.get<{
    Params: GetCompanyProfileParams
    Querystring: GetCompanyProfileQueryString
  }>('/company/:company_number', schema, async (req, res) => {
    const { company_number } = req.params
    const {} = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit))
      res.header(header, value)
    return reflect(req.url)
    const { redis, mongo } = fastify
    const context = { redis, mongo, req }
    return getCompanyProfile(context, company_number)
  })
}
