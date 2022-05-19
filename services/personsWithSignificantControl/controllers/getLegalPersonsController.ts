import { FastifyPluginAsync } from 'fastify'
import { getLegalPersons } from '../service/getLegalPersons.js'
import { reflect, auth } from './reflect.js'
import {
  GetLegalPersonsSchema as schema,
  GetLegalPersonsQueryString,
  GetLegalPersonsParams
} from '../schemas/GetLegalPersonsSchema.js'

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
      res.header('X-Ratelimit-Limit', ratelimit.limit)
      res.header('X-Ratelimit-Remain', ratelimit.remain)
      res.header('X-Ratelimit-Reset', ratelimit.reset)
      res.header('X-Ratelimit-Window', ratelimit.window)
      return reflect(req.url)
      return getLegalPersons(company_number, psc_id)
    }
  )
}
