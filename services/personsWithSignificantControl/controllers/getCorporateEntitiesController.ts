import { FastifyPluginAsync } from 'fastify'
import { getCorporateEntities } from '../service/getCorporateEntities.js'
import { reflect, auth } from './reflect.js'
import {
  GetCorporateEntitiesSchema as schema,
  GetCorporateEntitiesQueryString,
  GetCorporateEntitiesParams
} from '../schemas/GetCorporateEntitiesSchema.js'

export const getCorporateEntitiesController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetCorporateEntitiesParams
    Querystring: GetCorporateEntitiesQueryString
  }>(
    '/company/:company_number/persons-with-significant-control/corporate-entity/:psc_id',
    schema,
    async (req, res) => {
      const { company_number, psc_id } = req.params
      const {} = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      res.header('X-Ratelimit-Limit', ratelimit.limit)
      res.header('X-Ratelimit-Remain', ratelimit.remain)
      res.header('X-Ratelimit-Reset', ratelimit.reset)
      res.header('X-Ratelimit-Window', ratelimit.window)
      return reflect(req.url)
      return getCorporateEntities(company_number, psc_id)
    }
  )
}
