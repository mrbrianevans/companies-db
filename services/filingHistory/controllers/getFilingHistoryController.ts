import { FastifyPluginAsync } from 'fastify'
import { getFilingHistory } from '../service/getFilingHistory.js'
import { reflect, auth } from './reflect.js'
import {
  GetFilingHistorySchema as schema,
  GetFilingHistoryQueryString,
  GetFilingHistoryParams,
} from '../schemas/GetFilingHistorySchema.js'

export const getFilingHistoryController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetFilingHistoryParams
    Querystring: GetFilingHistoryQueryString
  }>(
    '/company/:company_number/filing-history/:transaction_id',
    schema,
    async (req, res) => {
      const { company_number, transaction_id } = req.params
      const {} = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      res.header('X-Ratelimit-Limit', ratelimit.limit)
      res.header('X-Ratelimit-Remain', ratelimit.remain)
      res.header('X-Ratelimit-Reset', ratelimit.reset)
      res.header('X-Ratelimit-Window', ratelimit.window)
      return reflect(req.url)
      return getFilingHistory(company_number, transaction_id)
    }
  )
}
