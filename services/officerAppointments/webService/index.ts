import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { listOfficerAppointmentsController } from './controllers/listOfficerAppointmentsController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'officerAppointments' } }
})

fastify.register(fastifyRedis, { url: getEnv('REDIS_URL') })
fastify.register(fastifyMongo, {
  url: getEnv('MONGO_URL') + '/officerAppointments'
})
// --- register controllers ---
fastify.register(listOfficerAppointmentsController)

await fastify.listen({ port: 3000, host: '::' })
