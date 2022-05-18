import { FastifyPluginAsync } from 'fastify'
import { listOfficers } from '../service/listOfficers.js'
import { reflect, auth } from './reflect.js'
import {
  ListOfficersSchema as schema,
  ListOfficersQueryString,
  ListOfficersParams,
} from '../schemas/ListOfficersSchema.js'

export const listOfficersController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: ListOfficersParams
    Querystring: ListOfficersQueryString
  }>('/company/:company_number/officers', schema, async (req, res) => {
    const { company_number } = req.params
    const {
      items_per_page,
      register_type,
      register_view,
      start_index,
      order_by,
    } = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    res.header('X-Ratelimit-Limit', ratelimit.limit)
    res.header('X-Ratelimit-Remain', ratelimit.remain)
    res.header('X-Ratelimit-Reset', ratelimit.reset)
    res.header('X-Ratelimit-Window', ratelimit.window)
    return reflect(req.url)
    return listOfficers(
      company_number,
      items_per_page,
      register_type,
      register_view,
      start_index,
      order_by
    )
  })
}
