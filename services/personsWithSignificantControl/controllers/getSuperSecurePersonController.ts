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
      for (const [header, value] of Object.entries(ratelimit))
        res.header(header, value)
      return reflect(req.url)
      return getSuperSecurePerson(company_number, super_secure_id)
    }
  )
}
