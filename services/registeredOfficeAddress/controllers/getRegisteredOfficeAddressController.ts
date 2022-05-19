import { FastifyPluginAsync } from 'fastify'
import { getRegisteredOfficeAddress } from '../service/getRegisteredOfficeAddress.js'
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
      res.header('X-Ratelimit-Limit', ratelimit.limit)
      res.header('X-Ratelimit-Remain', ratelimit.remain)
      res.header('X-Ratelimit-Reset', ratelimit.reset)
      res.header('X-Ratelimit-Window', ratelimit.window)
      return reflect(req.url)
      return getRegisteredOfficeAddress(company_number)
    }
  )
}
