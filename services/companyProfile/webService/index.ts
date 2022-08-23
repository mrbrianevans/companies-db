import Fastify from 'fastify'
import { getEnv } from '../shared/utils.js'
import { mongoDbName} from "../shared/dbClients.js";

const fastify = Fastify({
  logger: { level: 'trace', base: { service: 'companyProfile' } }
})
// @ts-ignore
fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
// @ts-ignore
fastify.register(import('@fastify/mongodb'), {
  url: getEnv('MONGO_URL') + '/' + mongoDbName
})
// --- register controllers ---
fastify.register(import('./controllers/getCompanyProfileController.js'))
fastify.register(
  import('./controllers/getRegisteredOfficeAddressController.js')
)

await fastify.listen({ port: 3000, host: '::' })
