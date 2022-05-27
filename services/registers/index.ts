import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
// --- import controllers ---
import { getRegistersController } from './controllers/getRegistersController.js'

const fastify = Fastify({ logger: true })

if (!process.env.REDIS_URL)
  throw new Error('REDIS_URL environment variable not set')
fastify.register(fastifyRedis, { url: process.env.REDIS_URL })
if (!process.env.MONGO_URL)
  throw new Error('MONGO_URL environment variable not set')
fastify.register(fastifyMongo, { url: process.env.MONGO_URL + '/registers' })
// --- register controllers ---
fastify.register(getRegistersController)

await fastify.listen({ port: 3000, host: '::' })
