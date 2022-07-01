import Fastify from 'fastify'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getOfficersController } from './controllers/getOfficersController.js'
import { listOfficersController } from './controllers/listOfficersController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'officers' } }
})

fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/officers'
})
// --- register controllers ---
fastify.register(getOfficersController)
fastify.register(listOfficersController)

await fastify.listen({ port: 3000, host: '::' })
