import { FastifyPluginAsync } from 'fastify'
import { getFilingHistory } from '../service/getFilingHistory.js'
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
    (req, res) => {
      const { company_number, transaction_id } = req.params
      const {} = req.query
      return getFilingHistory(company_number, transaction_id)
    }
  )
}
