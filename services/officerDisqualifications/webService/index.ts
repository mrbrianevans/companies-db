import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { getCorporateOfficerController } from './controllers/getCorporateOfficerController.js'
import { getNaturalOfficerController } from './controllers/getNaturalOfficerController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'officerDisqualifications' } }
})

fastify.register(fastifyRedis, { url: getEnv('REDIS_URL') })
fastify.register(fastifyMongo, {
  url: getEnv('MONGO_URL') + '/officerDisqualifications'
})
// --- register controllers ---
fastify.register(getCorporateOfficerController)
fastify.register(getNaturalOfficerController)

await fastify.listen({ port: 3000, host: '::' })
