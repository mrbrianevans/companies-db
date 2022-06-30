import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getUKEstablishmentsController } from './controllers/getUKEstablishmentsController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'UKEstablishments' } }
})

fastify.register(fastifyRedis, { url: getEnv('REDIS_URL') })
fastify.register(fastifyMongo, {
  url: getEnv('MONGO_URL') + '/UKEstablishments'
})
// --- register controllers ---
fastify.register(getUKEstablishmentsController)

await fastify.listen({ port: 3000, host: '::' })
