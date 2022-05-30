import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
// --- import controllers ---
import { getInsolvencyController } from './controllers/getInsolvencyController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'insolvency' } }
})

if (!process.env.REDIS_URL)
  throw new Error('REDIS_URL environment variable not set')
fastify.register(fastifyRedis, { url: process.env.REDIS_URL })
if (!process.env.MONGO_URL)
  throw new Error('MONGO_URL environment variable not set')
fastify.register(fastifyMongo, { url: process.env.MONGO_URL + '/insolvency' })
// --- register controllers ---
fastify.register(getInsolvencyController)

await fastify.listen({ port: 3000, host: '::' })
