import Fastify from 'fastify'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { listFilingHistoryController } from './controllers/listFilingHistoryController.js'
import { getFilingHistoryController } from './controllers/getFilingHistoryController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'filingHistory' } }
})
// @ts-ignore
fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
// @ts-ignore
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/filingHistory'
})
// --- register controllers ---
fastify.register(listFilingHistoryController)
fastify.register(getFilingHistoryController)

await fastify.listen({ port: 3000, host: '::' })
