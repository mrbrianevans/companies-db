import { FastifyPluginAsync } from 'fastify'
import {
  getCorporateOfficer,
  Context,
  initGetCorporateOfficerCollection
} from '../service/getCorporateOfficer.js'
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
  await initGetCorporateOfficerCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetCorporateOfficerParams
    Querystring: GetCorporateOfficerQueryString
  }>(
    '/disqualified-officers/corporate/:officer_id',
    schema,
    async (req, res) => {
      const { officer_id } = req.params

      const ratelimit = await auth({ Authorization: req.headers.authorization })
      for (const [header, value] of Object.entries(ratelimit ?? {}))
        res.header(header, value)
      if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
        res.code(429).send('Rate limit hit')
        return
      }
      const { redis, mongo } = fastify
      const context: Context = { redis, mongo, req }
      const result = getCorporateOfficer(context, officer_id)
      if (result) return result
      else res.code(404).send('Not found')
    }
  )
}
