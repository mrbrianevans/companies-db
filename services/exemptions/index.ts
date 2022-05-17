import Fastify from 'fastify'
// --- import controllers ---
import {getExemptionsController} from './controllers/getExemptionsController.js'

const fastify = Fastify({logger: true})

// --- register controllers ---
fastify.register(getExemptionsController)

await fastify.listen(3000)
