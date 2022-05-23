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
    '/new',
    schema,
    async (req, res) => {
      const {redis} = fastify
      const key = AuthService.getNewApiKey()
      const service = new AuthService({redis, req}, key)
      await service.setQuota()

      const responseAuthHeaders = await service.getResponseHeaders()

      return responseAuthHeaders
    }
  )
}
