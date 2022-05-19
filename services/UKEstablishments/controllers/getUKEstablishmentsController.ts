import { FastifyPluginAsync } from 'fastify'
import { getUKEstablishments } from '../service/getUKEstablishments.js'
import { reflect, auth } from './reflect.js'
import {
  GetUKEstablishmentsSchema as schema,
  GetUKEstablishmentsQueryString,
  GetUKEstablishmentsParams
} from '../schemas/getUKEstablishmentsSchema.js'

export const getUKEstablishmentsController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetUKEstablishmentsParams
    Querystring: GetUKEstablishmentsQueryString
  }>('/company/:company_number/uk-establishments', schema, async (req, res) => {
    const { company_number } = req.params
    const {} = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    res.header('X-Ratelimit-Limit', ratelimit.limit)
    res.header('X-Ratelimit-Remain', ratelimit.remain)
    res.header('X-Ratelimit-Reset', ratelimit.reset)
    res.header('X-Ratelimit-Window', ratelimit.window)
    return reflect(req.url)
    return getUKEstablishments(company_number)
  })
}
