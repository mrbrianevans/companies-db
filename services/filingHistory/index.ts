import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { listFilingHistoryController } from './controllers/listFilingHistoryController.js'
import { getFilingHistoryController } from './controllers/getFilingHistoryController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'companyProfile' } }
})

fastify.register(fastifyRedis, { url: getEnv('REDIS_URL') })
fastify.register(fastifyMongo, { url: getEnv('MONGO_URL') + '/filingHistory' })
// --- register controllers ---
fastify.register(listFilingHistoryController)
fastify.register(getFilingHistoryController)

await fastify.listen({ port: 3000, host: '::' })
