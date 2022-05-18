import Fastify from 'fastify'
// --- import controllers ---
import { getOfficersController } from './controllers/getOfficersController.js'
import { listOfficersController } from './controllers/listOfficersController.js'

const fastify = Fastify({ logger: true })

// --- register controllers ---
fastify.register(getOfficersController)
fastify.register(listOfficersController)

await fastify.listen(3000, '::')
