import { FastifyPluginAsync } from 'fastify'
import { listFilingHistory } from '../service/listFilingHistory.js'
import { reflect, auth } from './reflect.js'
import {
  ListFilingHistorySchema as schema,
  ListFilingHistoryQueryString,
  ListFilingHistoryParams,
} from '../schemas/ListFilingHistorySchema.js'

export const listFilingHistoryController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: ListFilingHistoryParams
    Querystring: ListFilingHistoryQueryString
  }>('/company/:company_number/filing-history', schema, async (req, res) => {
    const { company_number } = req.params
    const { category, items_per_page, start_index } = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    res.header('X-Ratelimit-Limit', ratelimit.limit)
    res.header('X-Ratelimit-Remain', ratelimit.remain)
    res.header('X-Ratelimit-Reset', ratelimit.reset)
    res.header('X-Ratelimit-Window', ratelimit.window)
    return reflect(req.url)
    return listFilingHistory(
      company_number,
      category,
      items_per_page,
      start_index
    )
  })
}
