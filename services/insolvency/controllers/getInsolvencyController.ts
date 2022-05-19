import { FastifyPluginAsync } from 'fastify'
import { getInsolvency } from '../service/getInsolvency.js'
import { reflect, auth } from './reflect.js'
import {
  GetInsolvencySchema as schema,
  GetInsolvencyQueryString,
  GetInsolvencyParams
} from '../schemas/GetInsolvencySchema.js'

export const getInsolvencyController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetInsolvencyParams
    Querystring: GetInsolvencyQueryString
  }>('/company/:company_number/insolvency', schema, async (req, res) => {
    const { company_number } = req.params
    const {} = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    res.header('X-Ratelimit-Limit', ratelimit.limit)
    res.header('X-Ratelimit-Remain', ratelimit.remain)
    res.header('X-Ratelimit-Reset', ratelimit.reset)
    res.header('X-Ratelimit-Window', ratelimit.window)
    return reflect(req.url)
    return getInsolvency(company_number)
  })
}
