import { FastifyPluginAsync } from 'fastify'
import {
  getFilingHistory,
  Context,
  initGetFilingHistoryCollection
} from '../service/getFilingHistory.js'
import { reflect, auth } from './reflect.js'
import {
  GetFilingHistorySchema as schema,
  GetFilingHistoryQueryString,
  GetFilingHistoryParams
} from '../schemas/getFilingHistorySchema.js'

export const getFilingHistoryController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
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
      if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
        res.code(429).send('Rate limit hit')
        return
      }
      const { redis, mongo } = fastify
      const context: Context = { redis, mongo, req }
      const result = getFilingHistory(context, company_number, transaction_id)
      if (result) return result
      else res.code(404).send('Not found')
    }
  )
}
