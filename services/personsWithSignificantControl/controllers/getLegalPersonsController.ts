import { FastifyPluginAsync } from 'fastify'
import { getLegalPersons, Context } from '../service/getLegalPersons.js'
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
  fastify.get<{
    Params: GetLegalPersonsParams
    Querystring: GetLegalPersonsQueryString
  }>(
    '/company/:company_number/persons-with-significant-control/legal-person/:psc_id',
    schema,
    async (req, res) => {
      const { company_number, psc_id } = req.params
      const {} = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      for (const [header, value] of Object.entries(ratelimit))
        res.header(header, value)
      return reflect(req.url)
      const { redis, mongo } = fastify
      const context: Context = { redis, mongo, req }
      return getLegalPersons(context, company_number, psc_id)
    }
  )
}
