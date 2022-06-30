import { FastifyPluginAsync } from 'fastify'
import {
  listFilingHistory,
  Context,
  initListFilingHistoryCollection
} from '../service/listFilingHistory.js'
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
  await initListFilingHistoryCollection(fastify.mongo.db)
  fastify.get<{
    Params: ListFilingHistoryParams
    Querystring: ListFilingHistoryQueryString
  }>('/company/:company_number/filing-history', schema, async (req, res) => {
    const { company_number } = req.params
    const { category, items_per_page, start_index } = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit ?? {}))
      res.header(header, value)
    if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
      res.code(429).send('Rate limit hit')
      return
    }
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    const result = listFilingHistory(
      context,
      company_number,
      category,
      items_per_page,
      start_index
    )
    if (result) return result
    else res.code(404).send('Not found')
  })
}
