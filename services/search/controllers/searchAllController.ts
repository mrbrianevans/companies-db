import { FastifyPluginAsync } from 'fastify'
import { searchAll } from '../service/searchAll.js'
import { reflect, auth } from './reflect.js'
import {
  SearchAllSchema as schema,
  SearchAllQueryString,
  SearchAllParams,
} from '../schemas/SearchAllSchema.js'

export const searchAllController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{ Params: SearchAllParams; Querystring: SearchAllQueryString }>(
    '/search',
    schema,
    async (req, res) => {
      const {} = req.params
      const { q, items_per_page, start_index } = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      res.header('X-Ratelimit-Limit', ratelimit.limit)
      res.header('X-Ratelimit-Remain', ratelimit.remain)
      res.header('X-Ratelimit-Reset', ratelimit.reset)
      res.header('X-Ratelimit-Window', ratelimit.window)
      return reflect(req.url)
      return searchAll(q, items_per_page, start_index)
    }
  )
}
