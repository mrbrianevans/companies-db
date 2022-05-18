import { FastifyPluginAsync } from 'fastify'
import { getCorporateEntities } from '../service/getCorporateEntities.js'
import {
  GetCorporateEntitiesSchema as schema,
  GetCorporateEntitiesQueryString,
  GetCorporateEntitiesParams,
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
    (req, res) => {
      const { company_number, psc_id } = req.params
      const {} = req.query
      return getCorporateEntities(company_number, psc_id)
    }
  )
}
