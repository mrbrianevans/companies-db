import { FastifyPluginAsync } from 'fastify'
import {
  getFilingHistory,
  Context,
  initGetFilingHistoryCollection
} from '../service/getFilingHistory.js'
import { auth } from './reflect.js'
import {
  GetFilingHistorySchema as schema,
  GetFilingHistoryQueryString,
  GetFilingHistoryParams
} from '../schemas/getFilingHistorySchema.js'

export const getFilingHistoryController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.log = fastify.log.child({ route: 'getFilingHistory' })
  await initGetFilingHistoryCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetFilingHistoryParams
    Querystring: GetFilingHistoryQueryString
  }>(
    '/company/:company_number/filing-history/:transaction_id',
    schema,
    async (req, res) => {
      const { company_number, transaction_id } = req.params

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
      const result = getFilingHistory(context, company_number, transaction_id)
      if (result) return result
      else
        res
          .code(404)
          .send({ statusCode: 404, error: 'Not found', message: 'Not found' })
    }
  )
}
