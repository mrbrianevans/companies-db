import Fastify from 'fastify'
import { getEnv } from '../shared/utils.js'

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
fastify.register(import('./controllers/getCorporateOfficerController.js'))
fastify.register(import('./controllers/getNaturalOfficerController.js'))

await fastify.listen({ port: 3000, host: '::' })
