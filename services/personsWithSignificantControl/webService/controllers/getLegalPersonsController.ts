import { FastifyPluginAsync } from 'fastify'
import {
  getLegalPersons,
  Context,
  initGetLegalPersonsCollection
} from '../service/getLegalPersons.js'
import { reflect, auth } from './reflect.js'
import {
  GetLegalPersonsSchema as schema,
  GetLegalPersonsQueryString,
  GetLegalPersonsParams
} from '../schemas/getLegalPersonsSchema.js'

export const getLegalPersonsController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  await initGetLegalPersonsCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetLegalPersonsParams
    Querystring: GetLegalPersonsQueryString
  }>(
    '/company/:company_number/persons-with-significant-control/legal-person/:psc_id',
    schema,
    async (req, res) => {
      const { company_number, psc_id } = req.params

      const ratelimit = await auth({ Authorization: req.headers.authorization })
      for (const [header, value] of Object.entries(ratelimit ?? {}))
        res.header(header, value)
      if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
        res.code(429).send('Rate limit hit')
        return
      }
      const { redis, mongo } = fastify
      const context: Context = { redis, mongo, req }
      const result = getLegalPersons(context, company_number, psc_id)
      if (result) return result
      else res.code(404).send('Not found')
    }
  )
}
