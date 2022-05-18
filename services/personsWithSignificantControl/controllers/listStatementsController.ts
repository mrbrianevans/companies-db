import { FastifyPluginAsync } from 'fastify'
import { listStatements } from '../service/listStatements.js'
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
    (req, res) => {
      const { company_number } = req.params
      const { items_per_page, start_index, register_view } = req.query
      return listStatements(
        company_number,
        items_per_page,
        start_index,
        register_view
      )
    }
  )
}
