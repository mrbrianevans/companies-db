import { FastifyPluginAsync } from 'fastify'
import {
  getCorporateEntities,
  Context,
  initGetCorporateEntitiesCollection
} from '../service/getCorporateEntities.js'
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
  await initGetCorporateEntitiesCollection(fastify.mongo.db)
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
      for (const [header, value] of Object.entries(ratelimit ?? {}))
        res.header(header, value)
      if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
        res.code(429).send('Rate limit hit')
        return
      }
      const { redis, mongo } = fastify
      const context: Context = { redis, mongo, req }
      const result = getCorporateEntities(context, company_number, psc_id)
      if (result) return result
      else res.code(404).send('Not found')
    }
  )
}
