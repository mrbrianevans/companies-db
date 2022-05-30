import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
// --- import controllers ---
import { getSuperSecurePersonController } from './controllers/getSuperSecurePersonController.js'
import { getStatementController } from './controllers/getStatementController.js'
import { listStatementsController } from './controllers/listStatementsController.js'
import { getLegalPersonsController } from './controllers/getLegalPersonsController.js'
import { getCorporateEntitiesController } from './controllers/getCorporateEntitiesController.js'
import { getIndividualController } from './controllers/getIndividualController.js'
import { listPersonsWithSignificantControlController } from './controllers/listPersonsWithSignificantControlController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'personsWithSignificantControl' } }
})

if (!process.env.REDIS_URL)
  throw new Error('REDIS_URL environment variable not set')
fastify.register(fastifyRedis, { url: process.env.REDIS_URL })
if (!process.env.MONGO_URL)
  throw new Error('MONGO_URL environment variable not set')
fastify.register(fastifyMongo, {
  url: process.env.MONGO_URL + '/personsWithSignificantControl'
})
// --- register controllers ---
fastify.register(getSuperSecurePersonController)
fastify.register(getStatementController)
fastify.register(listStatementsController)
fastify.register(getLegalPersonsController)
fastify.register(getCorporateEntitiesController)
fastify.register(getIndividualController)
fastify.register(listPersonsWithSignificantControlController)

await fastify.listen({ port: 3000, host: '::' })
