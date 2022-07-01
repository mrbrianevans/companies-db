import Fastify from 'fastify'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { listOfficerAppointmentsController } from './controllers/listOfficerAppointmentsController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'officerAppointments' } }
})

fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/officerAppointments'
})
// --- register controllers ---
fastify.register(listOfficerAppointmentsController)

await fastify.listen({ port: 3000, host: '::' })
