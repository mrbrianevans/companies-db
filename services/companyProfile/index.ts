import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
// --- import controllers ---
import { getCompanyProfileController } from './controllers/getCompanyProfileController.js'
import {getEnv} from "./controllers/reflect.js";


const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'companyProfile' } }
})

fastify.register(fastifyRedis, { url: getEnv('REDIS_URL') })
fastify.register(fastifyMongo, {
  url: getEnv('MONGO_URL') + '/companyProfile'
})
// --- register controllers ---
fastify.register(getCompanyProfileController)

await fastify.listen({ port: 3000, host: '::' })
