import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getExemptionsController } from './controllers/getExemptionsController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'exemptions' } }
})

fastify.register(fastifyRedis, { url: getEnv('REDIS_URL') })
fastify.register(fastifyMongo, { url: getEnv('MONGO_URL') + '/exemptions' })
// --- register controllers ---
fastify.register(getExemptionsController)

await fastify.listen({ port: 3000, host: '::' })
