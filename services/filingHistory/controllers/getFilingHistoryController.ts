import {FastifyPluginAsync} from "fastify";
import {getFilingHistory} from "../service/getFilingHistory.js";
import {
  getFilingHistoryParams,
  getFilingHistoryQueryString,
  getFilingHistorySchema as schema
} from "../schemas/getFilingHistorySchema.js";


export const getFilingHistoryController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getFilingHistoryParams, Querystring: getFilingHistoryQueryString }>('/company/:company_number/filing-history/:transaction_id', schema, (req, res) => {
    const {company_number, transaction_id} = req.params
    const {} = req.query
    return getFilingHistory(company_number, transaction_id)
  })
}

