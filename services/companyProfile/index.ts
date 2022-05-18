import Fastify from 'fastify'
// --- import controllers ---
import { getCompanyProfileController } from './controllers/getCompanyProfileController.js'

const fastify = Fastify({ logger: true })

// --- register controllers ---
fastify.register(getCompanyProfileController)

await fastify.listen(3000, '::')
