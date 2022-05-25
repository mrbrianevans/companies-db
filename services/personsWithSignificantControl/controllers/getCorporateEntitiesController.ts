import { FastifyPluginAsync } from 'fastify'
import { getCorporateEntities } from '../service/getCorporateEntities.js'
import { reflect, auth } from './reflect.js'
import {
  GetCorporateEntitiesSchema as schema,
  GetCorporateEntitiesQueryString,
  GetCorporateEntitiesParams
} from '../schemas/getCorporateEntitiesSchema.js'

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
      for (const [header, value] of Object.entries(ratelimit))
        res.header(header, value)
      return reflect(req.url)
      return getCorporateEntities(company_number, psc_id)
    }
  )
}
