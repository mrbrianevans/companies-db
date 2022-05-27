import { FastifyPluginAsync } from 'fastify'
import { listFilingHistory } from '../service/listFilingHistory.js'
import { reflect, auth } from './reflect.js'
import {
  ListFilingHistorySchema as schema,
  ListFilingHistoryQueryString,
  ListFilingHistoryParams
} from '../schemas/listFilingHistorySchema.js'

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
    for (const [header, value] of Object.entries(ratelimit))
      res.header(header, value)
    return reflect(req.url)
    const { redis, mongo } = fastify
    const context = { redis, mongo, req }
    return listFilingHistory(
      context,
      company_number,
      category,
      items_per_page,
      start_index
    )
  })
}
