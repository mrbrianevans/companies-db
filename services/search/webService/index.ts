import Fastify from 'fastify'
import { getEnv } from './controllers/reflect.js'
// --- import controllers ---
import { advancedCompanySearchController } from './controllers/advancedCompanySearchController.js'
import { searchCompaniesAlphabeticallyController } from './controllers/searchCompaniesAlphabeticallyController.js'
import { searchDissolvedCompaniesController } from './controllers/searchDissolvedCompaniesController.js'
import { searchDisqualifiedOfficersController } from './controllers/searchDisqualifiedOfficersController.js'
import { searchCompaniesController } from './controllers/searchCompaniesController.js'
import { searchAllController } from './controllers/searchAllController.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'search' } }
})

fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/search'
})
// --- register controllers ---
fastify.register(advancedCompanySearchController)
fastify.register(searchCompaniesAlphabeticallyController)
fastify.register(searchDissolvedCompaniesController)
fastify.register(searchDisqualifiedOfficersController)
fastify.register(searchCompaniesController)
fastify.register(searchAllController)

await fastify.listen({ port: 3000, host: '::' })
