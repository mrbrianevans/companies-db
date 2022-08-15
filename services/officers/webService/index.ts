import Fastify from 'fastify'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { listOfficerAppointmentsController } from './controllers/listOfficerAppointmentsController.js'
import { getOfficerAppointmentController } from './controllers/getOfficerAppointmentController.js'
import { listCompanyOfficersController } from './controllers/listCompanyOfficersController.js'
import { searchOfficersController } from './controllers/searchOfficersController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'officers' } }
})
// @ts-ignore
fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
// @ts-ignore
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/officers'
})
// --- register controllers ---
fastify.register(listOfficerAppointmentsController)
fastify.register(getOfficerAppointmentController)
fastify.register(listCompanyOfficersController)
fastify.register(searchOfficersController)

await fastify.listen({ port: 3000, host: '::' })
