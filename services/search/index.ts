import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
// --- import controllers ---
import { advancedCompanySearchController } from './controllers/advancedCompanySearchController.js'
import { searchCompaniesAlphabeticallyController } from './controllers/searchCompaniesAlphabeticallyController.js'
import { searchDissolvedCompaniesController } from './controllers/searchDissolvedCompaniesController.js'
import { searchDisqualifiedOfficersController } from './controllers/searchDisqualifiedOfficersController.js'
import { searchOfficersController } from './controllers/searchOfficersController.js'
import { searchCompaniesController } from './controllers/searchCompaniesController.js'
import { searchAllController } from './controllers/searchAllController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'search' } }
})

if (!process.env.REDIS_URL)
  throw new Error('REDIS_URL environment variable not set')
fastify.register(fastifyRedis, { url: process.env.REDIS_URL })
if (!process.env.MONGO_URL)
  throw new Error('MONGO_URL environment variable not set')
fastify.register(fastifyMongo, { url: process.env.MONGO_URL + '/search' })
// --- register controllers ---
fastify.register(advancedCompanySearchController)
fastify.register(searchCompaniesAlphabeticallyController)
fastify.register(searchDissolvedCompaniesController)
fastify.register(searchDisqualifiedOfficersController)
fastify.register(searchOfficersController)
fastify.register(searchCompaniesController)
fastify.register(searchAllController)

await fastify.listen({ port: 3000, host: '::' })
