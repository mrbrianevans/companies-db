import Fastify from 'fastify'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getInsolvencyController } from './controllers/getInsolvencyController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'insolvency' } }
})
// @ts-ignore
fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
// @ts-ignore
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/insolvency'
})
// --- register controllers ---
fastify.register(getInsolvencyController)

await fastify.listen({ port: 3000, host: '::' })
