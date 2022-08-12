import Fastify from 'fastify'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getRegisteredOfficeAddressController } from './controllers/getRegisteredOfficeAddressController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'registeredOfficeAddress' } }
})
// @ts-ignore
fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
// @ts-ignore
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/registeredOfficeAddress'
})
// --- register controllers ---
fastify.register(getRegisteredOfficeAddressController)

await fastify.listen({ port: 3000, host: '::' })
