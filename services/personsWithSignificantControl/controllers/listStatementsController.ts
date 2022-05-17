import {FastifyPluginAsync} from "fastify";
import {listStatements} from "../service/listStatements.js";
import {
  listStatementsParams,
  listStatementsQueryString,
  listStatementsSchema as schema
} from "../schemas/listStatementsSchema.js";


export const listStatementsController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: listStatementsParams, Querystring: listStatementsQueryString }>('/company/:company_number/persons-with-significant-control-statements', schema, (req, res) => {
    const {company_number} = req.params
    const {, ,
  }
    = req.query
    return listStatements(company_number, items_per_page, start_index, register_view)
  })
}

