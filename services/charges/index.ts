import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
// --- import controllers ---
import { getChargesController } from './controllers/getChargesController.js'
import { listChargesController } from './controllers/listChargesController.js'

const fastify = Fastify({ logger: true })

if (!process.env.REDIS_URL)
  throw new Error('REDIS_URL environment variable not set')
fastify.register(fastifyRedis, { url: process.env.REDIS_URL })
if (!process.env.MONGO_URL)
  throw new Error('MONGO_URL environment variable not set')
fastify.register(fastifyMongo, { url: process.env.MONGO_URL + '/charges' })
// --- register controllers ---
fastify.register(getChargesController)
fastify.register(listChargesController)

await fastify.listen({ port: 3000, host: '::' })
