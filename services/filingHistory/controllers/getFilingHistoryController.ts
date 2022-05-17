import {FastifyPluginAsync, FastifySchema} from "fastify";
import {getFilingHistory} from "../service/getFilingHistory";

const getParamsSchema: { schema: FastifySchema } = {
  schema: {
    params: {
      title: '',
      type:'object',
      properties: {
        company_number: { type: 'string' },
        transaction_id: { type: 'string' }
      }
    },
    querystring:{
      items_per_page: {type: 'integer', required: false}
    },
    response: {200: {}}
  }
}

interface GetFilingHistoryParams {
  company_number: string;
  transaction_id: string;
}

export const getFilingHistoryController: FastifyPluginAsync = async (fastify, opts)=>{
  fastify.get<{Params: GetFilingHistoryParams, Query: GetFilingHistoryParams}>('/company/:company_number/filing-history/:transaction_id', getParamsSchema, (req, res)=>{
    const {company_number,transaction_id} = req.params
    return getFilingHistory(company_number, transaction_id)
  })
}

