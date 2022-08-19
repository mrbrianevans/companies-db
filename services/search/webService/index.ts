import Fastify from 'fastify'
import { getEnv } from '../shared/utils.js'

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'search' } }
})
// @ts-ignore
fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
// @ts-ignore
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/search'
})
// --- register controllers ---
fastify.register(import('./controllers/advancedCompanySearchController.js'))
fastify.register(
  import('./controllers/searchCompaniesAlphabeticallyController.js')
)
fastify.register(import('./controllers/searchDissolvedCompaniesController.js'))
fastify.register(
  import('./controllers/searchDisqualifiedOfficersController.js')
)
fastify.register(import('./controllers/searchCompaniesController.js'))
fastify.register(import('./controllers/searchAllController.js'))

await fastify.listen({ port: 3000, host: '::' })
