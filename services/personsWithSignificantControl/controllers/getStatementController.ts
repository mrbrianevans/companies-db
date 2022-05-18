import { FastifyPluginAsync } from 'fastify'
import { getStatement } from '../service/getStatement.js'
import {
  GetStatementSchema as schema,
  GetStatementQueryString,
  GetStatementParams,
} from '../schemas/GetStatementSchema.js'

export const getStatementController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetStatementParams
    Querystring: GetStatementQueryString
  }>(
    '/company/:company_number/persons-with-significant-control-statements/:statement_id',
    schema,
    (req, res) => {
      const { company_number, statement_id } = req.params
      const {} = req.query
      return getStatement(company_number, statement_id)
    }
  )
}
