import { FastifyPluginAsync } from 'fastify'
import {
  searchDisqualifiedOfficers,
  Context,
  initSearchDisqualifiedOfficersCollection
} from '../service/searchDisqualifiedOfficers.js'
import { reflect, auth } from './reflect.js'
import {
  SearchDisqualifiedOfficersSchema as schema,
  SearchDisqualifiedOfficersQueryString,
  SearchDisqualifiedOfficersParams
} from '../schemas/searchDisqualifiedOfficersSchema.js'

export const searchDisqualifiedOfficersController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  await initSearchDisqualifiedOfficersCollection(fastify.mongo.db)
  fastify.get<{
    Params: SearchDisqualifiedOfficersParams
    Querystring: SearchDisqualifiedOfficersQueryString
  }>('/search/disqualified-officers', schema, async (req, res) => {
    const {} = req.params
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
    const result = searchDisqualifiedOfficers(
      context,
      q,
      items_per_page,
      start_index
    )
    if (result) return result
    else res.code(404).send('Not found')
  })
}
