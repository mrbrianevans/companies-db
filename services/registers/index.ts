import Fastify from 'fastify'
// --- import controllers ---
import {getRegistersController} from './controllers/getRegistersController.js'

const fastify = Fastify({logger: true})

// --- register controllers ---
fastify.register(getRegistersController)

await fastify.listen(3000)
