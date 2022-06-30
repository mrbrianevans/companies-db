import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getChargesController } from './controllers/getChargesController.js'
import { listChargesController } from './controllers/listChargesController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'companyProfile' } }
})

fastify.register(fastifyRedis, { url: getEnv('REDIS_URL') })
fastify.register(fastifyMongo, { url: getEnv('MONGO_URL') + '/charges' })
// --- register controllers ---
fastify.register(getChargesController)
fastify.register(listChargesController)

await fastify.listen({ port: 3000, host: '::' })
