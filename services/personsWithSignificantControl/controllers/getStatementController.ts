import { FastifyPluginAsync } from 'fastify'
import { getStatement, Context } from '../service/getStatement.js'
import { reflect, auth } from './reflect.js'
import {
  GetStatementSchema as schema,
  GetStatementQueryString,
  GetStatementParams
} from '../schemas/getStatementSchema.js'

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
      for (const [header, value] of Object.entries(ratelimit))
        res.header(header, value)
      return reflect(req.url)
      const { redis, mongo } = fastify
      const context: Context = { redis, mongo, req }
      return getStatement(context, company_number, statement_id)
    }
  )
}
