import {FastifyInstance, FastifyLoggerInstance, FastifyPluginAsync} from "fastify";
import {Server, IncomingMessage, ServerResponse} from 'http'

const listParamsSchema = {
  schema: {
    params: {
      type:'object',
      properties: {
        company_number: {type: 'string'}
      }
    }
  }
}

export const listFilingHistoryController: FastifyPluginAsync = async (fastify, opts)=>{
  fastify.get('/company/:company_number/filing-history', listParamsSchema, (req, res)=>{
    console.log(req.params)
    req.log.info(req.params,"Hi there, params=")
    return Promise.resolve([])
  })
}
