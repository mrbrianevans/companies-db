import { FastifyPluginAsync } from 'fastify'
import { getCorporateOfficer } from '../service/getCorporateOfficer.js'
import { reflect, auth } from './reflect.js'
import {
  GetCorporateOfficerSchema as schema,
  GetCorporateOfficerQueryString,
  GetCorporateOfficerParams
} from '../schemas/getCorporateOfficerSchema.js'

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
      for (const [header, value] of Object.entries(ratelimit))
        res.header(header, value)
      return reflect(req.url)
      const { redis, mongo } = fastify
      const context = { redis, mongo, req }
      return getCorporateOfficer(context, officer_id)
    }
  )
}
