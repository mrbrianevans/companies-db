import Fastify from 'fastify'
import { getEnv } from '../shared/utils.js'
import { pinoLokiOptions } from '../shared/lokiLogger.js'
import { mongoDbName } from '../shared/dbClients.js'

const fastify = Fastify({
  logger: {
    level: 'trace',
    transport: { target: 'pino-loki', options: pinoLokiOptions('web-service') }
  }
})
// @ts-ignore
fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
// @ts-ignore
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/' + mongoDbName
})
// --- register controllers ---
fastify.register(import('./controllers/getSuperSecurePersonController.js'))
fastify.register(import('./controllers/getStatementController.js'))
fastify.register(import('./controllers/listStatementsController.js'))
fastify.register(import('./controllers/getLegalPersonsController.js'))
fastify.register(import('./controllers/getCorporateEntitiesController.js'))
fastify.register(import('./controllers/getIndividualController.js'))
fastify.register(
  import('./controllers/listPersonsWithSignificantControlController.js')
)
fastify.register(import('./controllers/getExemptionsController.js'))

await fastify.listen({ port: 3000, host: '::' })
