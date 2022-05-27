import { FastifyPluginAsync } from 'fastify'
import { getUKEstablishments, Context } from '../service/getUKEstablishments.js'
import { reflect, auth } from './reflect.js'
import {
  GetUKEstablishmentsSchema as schema,
  GetUKEstablishmentsQueryString,
  GetUKEstablishmentsParams
} from '../schemas/getUKEstablishmentsSchema.js'

export const getUKEstablishmentsController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetUKEstablishmentsParams
    Querystring: GetUKEstablishmentsQueryString
  }>('/company/:company_number/uk-establishments', schema, async (req, res) => {
    const { company_number } = req.params
    const {} = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit))
      res.header(header, value)
    return reflect(req.url)
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    return getUKEstablishments(context, company_number)
  })
}
