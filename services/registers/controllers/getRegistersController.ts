import { FastifyPluginAsync } from 'fastify'
import {
  getRegisters,
  Context,
  initGetRegistersCollection
} from '../service/getRegisters.js'
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
  await initGetRegistersCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetRegistersParams
    Querystring: GetRegistersQueryString
  }>('/company/:company_number/registers', schema, async (req, res) => {
    const { company_number } = req.params

    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit ?? {}))
      res.header(header, value)
    if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
      res.code(429).send('Rate limit hit')
      return
    }
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    const result = getRegisters(context, company_number)
    if (result) return result
    else res.code(404).send('Not found')
  })
}
