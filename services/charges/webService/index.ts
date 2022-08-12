import Fastify from 'fastify'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getChargesController } from './controllers/getChargesController.js'
import { listChargesController } from './controllers/listChargesController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'charges' } }
})
// @ts-ignore
fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
// @ts-ignore
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/charges'
})
// --- register controllers ---
fastify.register(getChargesController)
fastify.register(listChargesController)

await fastify.listen({ port: 3000, host: '::' })
