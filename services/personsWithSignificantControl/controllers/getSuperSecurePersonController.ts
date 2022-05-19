import { FastifyPluginAsync } from 'fastify'
import { getSuperSecurePerson } from '../service/getSuperSecurePerson.js'
import { reflect, auth } from './reflect.js'
import {
  GetSuperSecurePersonSchema as schema,
  GetSuperSecurePersonQueryString,
  GetSuperSecurePersonParams
} from '../schemas/getSuperSecurePersonSchema.js'

export const getSuperSecurePersonController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetSuperSecurePersonParams
    Querystring: GetSuperSecurePersonQueryString
  }>(
    '/company/:company_number/persons-with-significant-control/super-secure/:super_secure_id',
    schema,
    async (req, res) => {
      const { company_number, super_secure_id } = req.params
      const {} = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      res.header('X-Ratelimit-Limit', ratelimit.limit)
      res.header('X-Ratelimit-Remain', ratelimit.remain)
      res.header('X-Ratelimit-Reset', ratelimit.reset)
      res.header('X-Ratelimit-Window', ratelimit.window)
      return reflect(req.url)
      return getSuperSecurePerson(company_number, super_secure_id)
    }
  )
}
