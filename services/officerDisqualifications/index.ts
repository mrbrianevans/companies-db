import Fastify from 'fastify'
// --- import controllers ---
import { getCorporateOfficerController } from './controllers/getCorporateOfficerController.js'
import { getNaturalOfficerController } from './controllers/getNaturalOfficerController.js'

const fastify = Fastify({ logger: true })

// --- register controllers ---
fastify.register(getCorporateOfficerController)
fastify.register(getNaturalOfficerController)

await fastify.listen(3000, '::')
