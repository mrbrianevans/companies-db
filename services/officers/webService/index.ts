import Fastify from 'fastify'
import { getEnv } from '../shared/utils.js'
import { pinoLokiOptions } from '../shared/lokiLogger.js'
import { mongoDbName } from '../shared/dbClients.js'

const fastify = Fastify({
  logger: {
    level: 'trace',
    transport: { target: 'pino-loki', options: {...pinoLokiOptions,labels: {...pinoLokiOptions.labels, component: 'web-service'}} }
  }
})
// @ts-ignore
fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL'), closeClient: true })
// @ts-ignore
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/' + mongoDbName
})
// --- register controllers ---
fastify.register(import('./controllers/listOfficerAppointmentsController.js'))
fastify.register(import('./controllers/getOfficerAppointmentController.js'))
fastify.register(import('./controllers/listCompanyOfficersController.js'))
fastify.register(import('./controllers/searchOfficersController.js'))

await fastify.listen({ port: 3000, host: '::' })


process.on('SIGINT', shutdown) // quit on ctrl-c when running docker in terminal
process.on('SIGTERM', shutdown)// quit properly on docker stop

async function shutdown(sig: string){
  fastify.log.info({signal: sig},'Shutdown requested')
  // await setTimeout(3000) // not sure if this is necessary?
  await fastify.close()
  process.exit(0)
}
