import { FastifyPluginAsync } from 'fastify'
import { searchOfficers } from '../service/searchOfficers.js'
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
  fastify.get<{
    Params: SearchOfficersParams
    Querystring: SearchOfficersQueryString
  }>('/search/officers', schema, async (req, res) => {
    const {} = req.params
    const { q, items_per_page, start_index } = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit))
      res.header(header, value)
    return reflect(req.url)
    return searchOfficers(q, items_per_page, start_index)
  })
}
