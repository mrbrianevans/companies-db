import { FastifyPluginAsync } from 'fastify'
import {
  searchAll,
  Context,
  initSearchAllCollection
} from '../service/searchAll.js'
import { reflect, auth } from './reflect.js'
import {
  SearchAllSchema as schema,
  SearchAllQueryString,
  SearchAllParams
} from '../schemas/searchAllSchema.js'

export const searchAllController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  await initSearchAllCollection(fastify.mongo.db)
  fastify.get<{ Params: SearchAllParams; Querystring: SearchAllQueryString }>(
    '/search',
    schema,
    async (req, res) => {
      const { q, items_per_page, start_index } = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      for (const [header, value] of Object.entries(ratelimit ?? {}))
        res.header(header, value)
      if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
        res.code(429).send('Rate limit hit')
        return
      }
      const { redis, mongo } = fastify
      const context: Context = { redis, mongo, req }
      const result = searchAll(context, q, items_per_page, start_index)
      if (result) return result
      else res.code(404).send('Not found')
    }
  )
}
