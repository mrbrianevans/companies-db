import { FastifyPluginAsync } from 'fastify'
import { getRatelimitHeaders } from '../service/getRatelimitHeaders.js'
import {
  AuthSchema as schema
} from '../schemas/authSchema.js'
import {AuthService} from "../service/AuthService";

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

      const service = new AuthService({redis, req}, authHeader)
      const responseAuthHeaders = await service.processRequest()
      if(responseAuthHeaders["X-Ratelimit-Remain"] === 0) {
        await service.recordViolation()
        res.status(429)
      }
      return responseAuthHeaders
    }
  )
}
