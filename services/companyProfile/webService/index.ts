import Fastify from 'fastify'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getCompanyProfileController } from './controllers/getCompanyProfileController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'companyProfile' } }
})

fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/companyProfile'
})
// --- register controllers ---
fastify.register(getCompanyProfileController)

await fastify.listen({ port: 3000, host: '::' })
