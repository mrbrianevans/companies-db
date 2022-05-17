import Fastify from 'fastify'
// --- import controllers ---
import {getChargesController} from './controllers/getChargesController.js'
import {listChargesController} from './controllers/listChargesController.js'

const fastify = Fastify({logger: true})

// --- register controllers ---
fastify.register(getChargesController)
fastify.register(listChargesController)

await fastify.listen(3000)
