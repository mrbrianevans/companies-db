import { FastifyPluginAsync } from 'fastify'
import { searchDisqualifiedOfficers } from '../service/searchDisqualifiedOfficers.js'
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
  }>('/search/disqualified-officers', schema, (req, res) => {
    const {} = req.params
    const { q, items_per_page, start_index } = req.query
    return searchDisqualifiedOfficers(q, items_per_page, start_index)
  })
}
