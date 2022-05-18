import { FastifyPluginAsync } from 'fastify'
import { searchDisqualifiedOfficers } from '../service/searchDisqualifiedOfficers.js'
import { reflect, auth } from './reflect.js'
import {
  SearchDisqualifiedOfficersSchema as schema,
  SearchDisqualifiedOfficersQueryString,
  SearchDisqualifiedOfficersParams,
} from '../schemas/SearchDisqualifiedOfficersSchema.js'

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
    res.header('X-Ratelimit-Limit', ratelimit.limit)
    res.header('X-Ratelimit-Remain', ratelimit.remain)
    res.header('X-Ratelimit-Reset', ratelimit.reset)
    res.header('X-Ratelimit-Window', ratelimit.window)
    return reflect(req.url)
    return searchDisqualifiedOfficers(q, items_per_page, start_index)
  })
}
