import Fastify from 'fastify'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getCompanyProfileController } from './controllers/getCompanyProfileController.js'
import { getRegisteredOfficeAddressController } from './controllers/getRegisteredOfficeAddressController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'companyProfile' } }
})
// @ts-ignore
fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
// @ts-ignore
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/companyProfile'
})
// --- register controllers ---
fastify.register(getCompanyProfileController)
fastify.register(getRegisteredOfficeAddressController)

await fastify.listen({ port: 3000, host: '::' })
