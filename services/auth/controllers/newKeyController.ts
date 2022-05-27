import { FastifyPluginAsync } from 'fastify'
import {
  NewKeySchema as schema
} from '../schemas/newKeySchema.js'
import {AuthService} from "../service/AuthService.js";

export const newKeyController: FastifyPluginAsync = async (
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
      const header = AuthService.getHeaderFromApiKey(key)
      return {header, key, ...responseAuthHeaders}
    }
  )
}
