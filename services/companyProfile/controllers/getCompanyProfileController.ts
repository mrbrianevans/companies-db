import { FastifyPluginAsync } from 'fastify'
import { getCompanyProfile } from '../service/getCompanyProfile.js'
import { reflect, auth } from './reflect.js'
import {
  GetCompanyProfileSchema as schema,
  GetCompanyProfileQueryString,
  GetCompanyProfileParams
} from '../schemas/GetCompanyProfileSchema.js'

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
    res.header('X-Ratelimit-Limit', ratelimit.limit)
    res.header('X-Ratelimit-Remain', ratelimit.remain)
    res.header('X-Ratelimit-Reset', ratelimit.reset)
    res.header('X-Ratelimit-Window', ratelimit.window)
    return reflect(req.url)
    return getCompanyProfile(company_number)
  })
}
