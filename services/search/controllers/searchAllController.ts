import { FastifyPluginAsync } from 'fastify'
import { searchAll } from '../service/searchAll.js'
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
  fastify.get<{ Params: SearchAllParams; Querystring: SearchAllQueryString }>(
    '/search',
    schema,
    async (req, res) => {
      const {} = req.params
      const { q, items_per_page, start_index } = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      for (const [header, value] of Object.entries(ratelimit))
        res.header(header, value)
      return reflect(req.url)
      return searchAll(q, items_per_page, start_index)
    }
  )
}
