import {FastifyPluginAsync} from "fastify";
import {listFilingHistory} from "../service/listFilingHistory.js";
import {
  ListFilingHistoryParams,
  ListFilingHistoryQueryString,
  ListFilingHistorySchema as schema
} from "../schemas/ListFilingHistorySchema.js";


export const listFilingHistoryController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: ListFilingHistoryParams, Querystring: ListFilingHistoryQueryString }>('/company/:company_number/filing-history', schema, (req, res) => {
    const {company_number} = req.params
    const {category, items_per_page, start_index} = req.query
    return listFilingHistory(company_number, category, items_per_page, start_index)
  })
}

