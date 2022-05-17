import Fastify from 'fastify'
// --- import controllers ---
import {getUKEstablishmentsController} from './controllers/getUKEstablishmentsController.js'

const fastify = Fastify({logger: true})

// --- register controllers ---
fastify.register(getUKEstablishmentsController)

await fastify.listen(3000)
