import { FastifyPluginAsync } from 'fastify'
import {
  searchDisqualifiedOfficers,
  Context
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
  fastify.get<{
    Params: SearchDisqualifiedOfficersParams
    Querystring: SearchDisqualifiedOfficersQueryString
  }>('/search/disqualified-officers', schema, async (req, res) => {
    const {} = req.params
    const { q, items_per_page, start_index } = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit))
      res.header(header, value)
    return reflect(req.url)
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    return searchDisqualifiedOfficers(context, q, items_per_page, start_index)
  })
}
