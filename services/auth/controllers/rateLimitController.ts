import { FastifyPluginAsync } from 'fastify'
import {
  AuthSchema as schema
} from '../schemas/authSchema.js'
import {AuthService} from "../service/AuthService.js";

export const rateLimitController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get(
    '/',
    schema,
    async (req, res) => {
      const authHeader = req.headers.authorization
      const {redis} = fastify

      const service = new AuthService({redis, req}, AuthService.getApiKeyFromHeader(authHeader))
      const responseAuthHeaders = await service.processRequest()
      if(responseAuthHeaders["X-Ratelimit-Remain"] === 0) {
        await service.recordViolation()
        res.status(429)
      }
      req.log.info(responseAuthHeaders, 'Response auth headers about to be sent')
      return responseAuthHeaders
    }
  )
}
