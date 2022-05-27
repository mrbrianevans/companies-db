import { FastifyPluginAsync } from 'fastify'
import { listStatements } from '../service/listStatements.js'
import { reflect, auth } from './reflect.js'
import {
  ListStatementsSchema as schema,
  ListStatementsQueryString,
  ListStatementsParams
} from '../schemas/listStatementsSchema.js'

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
      for (const [header, value] of Object.entries(ratelimit))
        res.header(header, value)
      return reflect(req.url)
      const { redis, mongo } = fastify
      const context = { redis, mongo, req }
      return listStatements(
        context,
        company_number,
        items_per_page,
        start_index,
        register_view
      )
    }
  )
}
