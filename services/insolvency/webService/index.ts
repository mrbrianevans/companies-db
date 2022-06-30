import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getInsolvencyController } from './controllers/getInsolvencyController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'insolvency' } }
})

fastify.register(fastifyRedis, { url: getEnv('REDIS_URL') })
fastify.register(fastifyMongo, { url: getEnv('MONGO_URL') + '/insolvency' })
// --- register controllers ---
fastify.register(getInsolvencyController)

await fastify.listen({ port: 3000, host: '::' })
