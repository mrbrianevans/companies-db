import {FastifyPluginAsync} from "fastify";
import {getStatement} from "../service/getStatement.js";
import {
  getStatementParams,
  getStatementQueryString,
  getStatementSchema as schema
} from "../schemas/getStatementSchema.js";


export const getStatementController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getStatementParams, Querystring: getStatementQueryString }>('/company/:company_number/persons-with-significant-control-statements/:statement_id', schema, (req, res) => {
    const {company_number, statement_id} = req.params
    const {} = req.query
    return getStatement(company_number, statement_id)
  })
}

