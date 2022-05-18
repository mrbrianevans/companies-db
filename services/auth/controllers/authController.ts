import { FastifyPluginAsync } from 'fastify'
import { authService } from '../service/authService.js'
import {
  AuthSchema as schema
} from '../schemas/authSchema.js'

export const authController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get(
    '/',
    schema,
    async (req, res) => {
      const authHeader = req.headers.authorization
      const result = await authService(authHeader)
      return result
    }
  )
}
