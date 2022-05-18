import { FastifyPluginAsync } from 'fastify'
import { listStatements } from '../service/listStatements.js'
import { reflect, auth } from './reflect.js'
import {
  ListStatementsSchema as schema,
  ListStatementsQueryString,
  ListStatementsParams,
} from '../schemas/ListStatementsSchema.js'

export const listStatementsController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: ListStatementsParams
    Querystring: ListStatementsQueryString
  }>(
    '/company/:company_number/persons-with-significant-control-statements',
    schema,
    async (req, res) => {
      const { company_number } = req.params
      const { items_per_page, start_index, register_view } = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      res.header('X-Ratelimit-Limit', ratelimit.limit)
      res.header('X-Ratelimit-Remain', ratelimit.remain)
      res.header('X-Ratelimit-Reset', ratelimit.reset)
      res.header('X-Ratelimit-Window', ratelimit.window)
      return reflect(req.url)
      return listStatements(
        company_number,
        items_per_page,
        start_index,
        register_view
      )
    }
  )
}
