import { FastifyPluginAsync } from 'fastify'
import { getStatement } from '../service/getStatement.js'
import { reflect, auth } from './reflect.js'
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
    async (req, res) => {
      const { company_number, statement_id } = req.params
      const {} = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      res.header('X-Ratelimit-Limit', ratelimit.limit)
      res.header('X-Ratelimit-Remain', ratelimit.remain)
      res.header('X-Ratelimit-Reset', ratelimit.reset)
      res.header('X-Ratelimit-Window', ratelimit.window)
      return reflect(req.url)
      return getStatement(company_number, statement_id)
    }
  )
}
