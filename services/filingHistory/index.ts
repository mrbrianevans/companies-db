import Fastify from 'fastify'
// --- import controllers ---
import { listFilingHistoryController } from './controllers/listFilingHistoryController.js'
import { getFilingHistoryController } from './controllers/getFilingHistoryController.js'

const fastify = Fastify({ logger: true })

// --- register controllers ---
fastify.register(listFilingHistoryController)
fastify.register(getFilingHistoryController)

await fastify.listen(3000, '::')
