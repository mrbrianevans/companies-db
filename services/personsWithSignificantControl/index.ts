import Fastify from 'fastify'
// --- import controllers ---
import { getSuperSecurePersonController } from './controllers/getSuperSecurePersonController.js'
import { getStatementController } from './controllers/getStatementController.js'
import { listStatementsController } from './controllers/listStatementsController.js'
import { getLegalPersonsController } from './controllers/getLegalPersonsController.js'
import { getCorporateEntitiesController } from './controllers/getCorporateEntitiesController.js'
import { getIndividualController } from './controllers/getIndividualController.js'
import { listPersonsWithSignificantControlController } from './controllers/listPersonsWithSignificantControlController.js'

const fastify = Fastify({ logger: true })

// --- register controllers ---
fastify.register(getSuperSecurePersonController)
fastify.register(getStatementController)
fastify.register(listStatementsController)
fastify.register(getLegalPersonsController)
fastify.register(getCorporateEntitiesController)
fastify.register(getIndividualController)
fastify.register(listPersonsWithSignificantControlController)

await fastify.listen(3000, '::')
