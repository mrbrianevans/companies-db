import Fastify from 'fastify'
// --- import controllers ---
import { getInsolvencyController } from './controllers/getInsolvencyController.js'

const fastify = Fastify({ logger: true })

// --- register controllers ---
fastify.register(getInsolvencyController)

await fastify.listen(3000, '::')
