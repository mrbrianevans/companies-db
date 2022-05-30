import { FastifyPluginAsync } from 'fastify'
import {
  getIndividual,
  Context,
  initGetIndividualCollection
} from '../service/getIndividual.js'
import { reflect, auth } from './reflect.js'
import {
  GetIndividualSchema as schema,
  GetIndividualQueryString,
  GetIndividualParams
} from '../schemas/getIndividualSchema.js'

export const getIndividualController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  await initGetIndividualCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetIndividualParams
    Querystring: GetIndividualQueryString
  }>(
    '/company/:company_number/persons-with-significant-control/individual/:psc_id',
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
      const result = getIndividual(context, company_number, psc_id)
      if (result) return result
      else res.code(404).send('Not found')
    }
  )
}
