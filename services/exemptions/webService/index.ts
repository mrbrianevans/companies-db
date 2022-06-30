import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'exemptions' } }
})

fastify.register(fastifyRedis, { url: getEnv('REDIS_URL') })
fastify.register(fastifyMongo, { url: getEnv('MONGO_URL') + '/exemptions' })
// --- register controllers ---

await fastify.listen({ port: 3000, host: '::' })
