import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
// --- import controllers ---
import { listFilingHistoryController } from './controllers/listFilingHistoryController.js'
import { getFilingHistoryController } from './controllers/getFilingHistoryController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'filingHistory' } }
})

if (!process.env.REDIS_URL)
  throw new Error('REDIS_URL environment variable not set')
fastify.register(fastifyRedis, { url: process.env.REDIS_URL })
if (!process.env.MONGO_URL)
  throw new Error('MONGO_URL environment variable not set')
fastify.register(fastifyMongo, {
  url: process.env.MONGO_URL + '/filingHistory'
})
// --- register controllers ---
fastify.register(listFilingHistoryController)
fastify.register(getFilingHistoryController)

await fastify.listen({ port: 3000, host: '::' })
