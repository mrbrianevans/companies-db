import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getRegisteredOfficeAddressController } from './controllers/getRegisteredOfficeAddressController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'companyProfile' } }
})

fastify.register(fastifyRedis, { url: getEnv('REDIS_URL') })
fastify.register(fastifyMongo, {
  url: getEnv('MONGO_URL') + '/registeredOfficeAddress'
})
// --- register controllers ---
fastify.register(getRegisteredOfficeAddressController)

await fastify.listen({ port: 3000, host: '::' })
