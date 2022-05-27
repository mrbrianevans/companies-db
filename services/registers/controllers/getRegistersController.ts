import { FastifyPluginAsync } from 'fastify'
import { getRegisters, Context } from '../service/getRegisters.js'
import { reflect, auth } from './reflect.js'
import {
  GetRegistersSchema as schema,
  GetRegistersQueryString,
  GetRegistersParams
} from '../schemas/getRegistersSchema.js'

export const getRegistersController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetRegistersParams
    Querystring: GetRegistersQueryString
  }>('/company/:company_number/registers', schema, async (req, res) => {
    const { company_number } = req.params
    const {} = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit))
      res.header(header, value)
    return reflect(req.url)
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    return getRegisters(context, company_number)
  })
}
