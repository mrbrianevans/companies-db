import { FastifyPluginAsync } from 'fastify'
import { getFilingHistory } from '../service/getFilingHistory.js'
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
      for (const [header, value] of Object.entries(ratelimit))
        res.header(header, value)
      return reflect(req.url)
      return getFilingHistory(company_number, transaction_id)
    }
  )
}
