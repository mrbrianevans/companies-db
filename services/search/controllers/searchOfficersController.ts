import { FastifyPluginAsync } from 'fastify'
import {
  searchOfficers,
  Context,
  initSearchOfficersCollection
} from '../service/searchOfficers.js'
import { reflect, auth } from './reflect.js'
import {
  SearchOfficersSchema as schema,
  SearchOfficersQueryString,
  SearchOfficersParams
} from '../schemas/searchOfficersSchema.js'

export const searchOfficersController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  await initSearchOfficersCollection(fastify.mongo.db)
  fastify.get<{
    Params: SearchOfficersParams
    Querystring: SearchOfficersQueryString
  }>('/search/officers', schema, async (req, res) => {
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
    const result = searchOfficers(context, q, items_per_page, start_index)
    if (result) return result
    else res.code(404).send('Not found')
  })
}
