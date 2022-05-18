import { FastifyPluginAsync } from 'fastify'
import { getNaturalOfficer } from '../service/getNaturalOfficer.js'
import { reflect, auth } from './reflect.js'
import {
  GetNaturalOfficerSchema as schema,
  GetNaturalOfficerQueryString,
  GetNaturalOfficerParams,
} from '../schemas/GetNaturalOfficerSchema.js'

export const getNaturalOfficerController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetNaturalOfficerParams
    Querystring: GetNaturalOfficerQueryString
  }>('/disqualified-officers/natural/:officer_id', schema, async (req, res) => {
    const { officer_id } = req.params
    const {} = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    res.header('X-Ratelimit-Limit', ratelimit.limit)
    res.header('X-Ratelimit-Remain', ratelimit.remain)
    res.header('X-Ratelimit-Reset', ratelimit.reset)
    res.header('X-Ratelimit-Window', ratelimit.window)
    return reflect(req.url)
    return getNaturalOfficer(officer_id)
  })
}
