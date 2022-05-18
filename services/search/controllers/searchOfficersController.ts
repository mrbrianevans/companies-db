import { FastifyPluginAsync } from 'fastify'
import { searchOfficers } from '../service/searchOfficers.js'
import {
  SearchOfficersSchema as schema,
  SearchOfficersQueryString,
  SearchOfficersParams,
} from '../schemas/SearchOfficersSchema.js'

export const searchOfficersController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: SearchOfficersParams
    Querystring: SearchOfficersQueryString
  }>('/search/officers', schema, (req, res) => {
    const {} = req.params
    const { q, items_per_page, start_index } = req.query
    return searchOfficers(q, items_per_page, start_index)
  })
}
