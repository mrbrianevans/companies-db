import Fastify from 'fastify'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getUKEstablishmentsController } from './controllers/getUKEstablishmentsController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'UKEstablishments' } }
})
// @ts-ignore
fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
// @ts-ignore
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/UKEstablishments'
})
// --- register controllers ---
fastify.register(getUKEstablishmentsController)

await fastify.listen({ port: 3000, host: '::' })
