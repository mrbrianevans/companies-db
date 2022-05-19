import { FastifyPluginAsync } from 'fastify'
import { getCorporateOfficer } from '../service/getCorporateOfficer.js'
import { reflect, auth } from './reflect.js'
import {
  GetCorporateOfficerSchema as schema,
  GetCorporateOfficerQueryString,
  GetCorporateOfficerParams
} from '../schemas/GetCorporateOfficerSchema.js'

export const getCorporateOfficerController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetCorporateOfficerParams
    Querystring: GetCorporateOfficerQueryString
  }>(
    '/disqualified-officers/corporate/:officer_id',
    schema,
    async (req, res) => {
      const { officer_id } = req.params
      const {} = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      res.header('X-Ratelimit-Limit', ratelimit.limit)
      res.header('X-Ratelimit-Remain', ratelimit.remain)
      res.header('X-Ratelimit-Reset', ratelimit.reset)
      res.header('X-Ratelimit-Window', ratelimit.window)
      return reflect(req.url)
      return getCorporateOfficer(officer_id)
    }
  )
}
