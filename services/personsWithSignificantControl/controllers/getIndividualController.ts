import { FastifyPluginAsync } from 'fastify'
import { getIndividual } from '../service/getIndividual.js'
import { reflect, auth } from './reflect.js'
import {
  GetIndividualSchema as schema,
  GetIndividualQueryString,
  GetIndividualParams,
} from '../schemas/GetIndividualSchema.js'

export const getIndividualController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
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
      res.header('X-Ratelimit-Limit', ratelimit.limit)
      res.header('X-Ratelimit-Remain', ratelimit.remain)
      res.header('X-Ratelimit-Reset', ratelimit.reset)
      res.header('X-Ratelimit-Window', ratelimit.window)
      return reflect(req.url)
      return getIndividual(company_number, psc_id)
    }
  )
}