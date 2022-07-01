import Fastify from 'fastify'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getRegistersController } from './controllers/getRegistersController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'registers' } }
})

fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/registers'
})
// --- register controllers ---
fastify.register(getRegistersController)

await fastify.listen({ port: 3000, host: '::' })
