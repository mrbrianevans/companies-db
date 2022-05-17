import {FastifyPluginAsync} from "fastify";
import {listFilingHistory} from "../service/listFilingHistory.js";
import {
  listFilingHistoryParams,
  listFilingHistoryQueryString,
  listFilingHistorySchema as schema
} from "../schemas/listFilingHistorySchema.js";


export const listFilingHistoryController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: listFilingHistoryParams, Querystring: listFilingHistoryQueryString }>('/company/:company_number/filing-history', schema, (req, res) => {
    const {company_number} = req.params
    const {, ,
  }
    = req.query
    return listFilingHistory(company_number, category, items_per_page, start_index)
  })
}

