import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getOfficersController } from './controllers/getOfficersController.js'
import { listOfficersController } from './controllers/listOfficersController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'officers' } }
})

fastify.register(fastifyRedis, { url: getEnv('REDIS_URL') })
fastify.register(fastifyMongo, { url: getEnv('MONGO_URL') + '/officers' })
// --- register controllers ---
fastify.register(getOfficersController)
fastify.register(listOfficersController)

await fastify.listen({ port: 3000, host: '::' })
