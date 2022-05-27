import { FastifyPluginAsync } from 'fastify'
import {
  getRegisteredOfficeAddress,
  Context
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
      for (const [header, value] of Object.entries(ratelimit))
        res.header(header, value)
      return reflect(req.url)
      const { redis, mongo } = fastify
      const context: Context = { redis, mongo, req }
      return getRegisteredOfficeAddress(context, company_number)
    }
  )
}
