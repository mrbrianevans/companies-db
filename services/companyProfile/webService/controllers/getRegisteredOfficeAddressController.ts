import { FastifyPluginAsync } from 'fastify'
import {
  getRegisteredOfficeAddress,
  Context,
  initGetRegisteredOfficeAddressCollection
} from '../service/getRegisteredOfficeAddress.js'
import { auth } from './reflect.js'
import {
  GetRegisteredOfficeAddressSchema as schema,
  GetRegisteredOfficeAddressQueryString,
  GetRegisteredOfficeAddressParams
} from '../schemas/getRegisteredOfficeAddressSchema.js'

const getRegisteredOfficeAddressController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.log = fastify.log.child({ route: 'getRegisteredOfficeAddress' })
  await initGetRegisteredOfficeAddressCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetRegisteredOfficeAddressParams
    Querystring: GetRegisteredOfficeAddressQueryString
  }>(
    '/company/:company_number/registered-office-address',
    schema,
    async (req, res) => {
      const { company_number } = req.params

      const ratelimit = await auth({ Authorization: req.headers.authorization })
      for (const [header, value] of Object.entries(ratelimit ?? {}))
        res.header(header, value)
      if (ratelimit === null) {
        // these requests should usually be filtered out by Caddy, but just in case some make it through:
        res
          .code(401)
          .send({
            statusCode: 401,
            error: 'Not authorised',
            message:
              'Basic authentication token not included in request header.'
          })
        return
      }
      if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
        res
          .code(429)
          .send({
            statusCode: 429,
            error: 'Too many requests',
            message: 'Rate limit exceeded'
          })
        return
      }
      const { redis, mongo } = fastify
      const context: Context = { redis, mongo, req }
      const result = getRegisteredOfficeAddress(context, company_number)
      if (result) return result
      else
        res
          .code(404)
          .send({ statusCode: 404, error: 'Not found', message: 'Not found' })
    }
  )
}
export default getRegisteredOfficeAddressController
