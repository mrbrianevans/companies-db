import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { advancedCompanySearchController } from './controllers/advancedCompanySearchController.js'
import { searchCompaniesAlphabeticallyController } from './controllers/searchCompaniesAlphabeticallyController.js'
import { searchDissolvedCompaniesController } from './controllers/searchDissolvedCompaniesController.js'
import { searchDisqualifiedOfficersController } from './controllers/searchDisqualifiedOfficersController.js'
import { searchOfficersController } from './controllers/searchOfficersController.js'
import { searchCompaniesController } from './controllers/searchCompaniesController.js'
import { searchAllController } from './controllers/searchAllController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'companyProfile' } }
})

fastify.register(fastifyRedis, { url: getEnv('REDIS_URL') })
fastify.register(fastifyMongo, { url: getEnv('MONGO_URL') + '/search' })
// --- register controllers ---
fastify.register(advancedCompanySearchController)
fastify.register(searchCompaniesAlphabeticallyController)
fastify.register(searchDissolvedCompaniesController)
fastify.register(searchDisqualifiedOfficersController)
fastify.register(searchOfficersController)
fastify.register(searchCompaniesController)
fastify.register(searchAllController)

await fastify.listen({ port: 3000, host: '::' })
