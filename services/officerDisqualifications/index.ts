import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
// --- import controllers ---
import { getCorporateOfficerController } from './controllers/getCorporateOfficerController.js'
import { getNaturalOfficerController } from './controllers/getNaturalOfficerController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'officerDisqualifications' } }
})

if (!process.env.REDIS_URL)
  throw new Error('REDIS_URL environment variable not set')
fastify.register(fastifyRedis, { url: process.env.REDIS_URL })
if (!process.env.MONGO_URL)
  throw new Error('MONGO_URL environment variable not set')
fastify.register(fastifyMongo, {
  url: process.env.MONGO_URL + '/officerDisqualifications'
})
// --- register controllers ---
fastify.register(getCorporateOfficerController)
fastify.register(getNaturalOfficerController)

await fastify.listen({ port: 3000, host: '::' })
