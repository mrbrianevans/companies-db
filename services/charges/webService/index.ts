import Fastify from 'fastify'
import { getEnv } from '../shared/utils.js'

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
fastify.register(import('./controllers/getChargesController.js'))
fastify.register(import('./controllers/listChargesController.js'))

await fastify.listen({ port: 3000, host: '::' })
