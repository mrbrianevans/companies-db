import { FastifyPluginAsync } from 'fastify'
import { getInsolvency, Context } from '../service/getInsolvency.js'
import { reflect, auth } from './reflect.js'
import {
  GetInsolvencySchema as schema,
  GetInsolvencyQueryString,
  GetInsolvencyParams
} from '../schemas/getInsolvencySchema.js'

export const getInsolvencyController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetInsolvencyParams
    Querystring: GetInsolvencyQueryString
  }>('/company/:company_number/insolvency', schema, async (req, res) => {
    const { company_number } = req.params
    const {} = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit))
      res.header(header, value)
    return reflect(req.url)
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    return getInsolvency(context, company_number)
  })
}
