import Fastify from 'fastify'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getCorporateOfficerController } from './controllers/getCorporateOfficerController.js'
import { getNaturalOfficerController } from './controllers/getNaturalOfficerController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'officerDisqualifications' } }
})
// @ts-ignore
fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
// @ts-ignore
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/officerDisqualifications'
})
// --- register controllers ---
fastify.register(getCorporateOfficerController)
fastify.register(getNaturalOfficerController)

await fastify.listen({ port: 3000, host: '::' })
