import { FastifyPluginAsync } from 'fastify'
import {
  getUKEstablishments,
  Context,
  initGetUKEstablishmentsCollection
} from '../service/getUKEstablishments.js'
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
  await initGetUKEstablishmentsCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetUKEstablishmentsParams
    Querystring: GetUKEstablishmentsQueryString
  }>('/company/:company_number/uk-establishments', schema, async (req, res) => {
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
    const result = getUKEstablishments(context, company_number)
    if (result) return result
    else res.code(404).send('Not found')
  })
}
