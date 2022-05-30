import { FastifyPluginAsync } from 'fastify'
import {
  getSuperSecurePerson,
  Context,
  initGetSuperSecurePersonCollection
} from '../service/getSuperSecurePerson.js'
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
  await initGetSuperSecurePersonCollection(fastify.mongo.db)
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
      for (const [header, value] of Object.entries(ratelimit ?? {}))
        res.header(header, value)
      if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
        res.code(429).send('Rate limit hit')
        return
      }
      const { redis, mongo } = fastify
      const context: Context = { redis, mongo, req }
      const result = getSuperSecurePerson(
        context,
        company_number,
        super_secure_id
      )
      if (result) return result
      else res.code(404).send('Not found')
    }
  )
}
