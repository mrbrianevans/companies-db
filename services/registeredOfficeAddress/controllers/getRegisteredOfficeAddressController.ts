import { FastifyPluginAsync } from 'fastify'
import {
  getRegisteredOfficeAddress,
  Context,
  initGetRegisteredOfficeAddressCollection
} from '../service/getRegisteredOfficeAddress.js'
import { reflect, auth } from './reflect.js'
import {
  GetRegisteredOfficeAddressSchema as schema,
  GetRegisteredOfficeAddressQueryString,
  GetRegisteredOfficeAddressParams
} from '../schemas/getRegisteredOfficeAddressSchema.js'

export const getRegisteredOfficeAddressController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  await initGetRegisteredOfficeAddressCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetRegisteredOfficeAddressParams
    Querystring: GetRegisteredOfficeAddressQueryString
  }>(
    '/company/:company_number/registered-office-address',
    schema,
    async (req, res) => {
      const { company_number } = req.params
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
      const result = getRegisteredOfficeAddress(context, company_number)
      if (result) return result
      else res.code(404).send('Not found')
    }
  )
}
