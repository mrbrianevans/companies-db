import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
import 'dotenv/config'

const fastify = Fastify({ logger: true })

if (!process.env.REDIS_URL) throw new Error('REDIS_URL environment variable not set')
fastify.register(fastifyRedis, { url: process.env.REDIS_URL })
if (!process.env.MONGO_URL) throw new Error('MONGO_URL environment variable not set')
fastify.register(fastifyMongo, { url: process.env.MONGO_URL + '/charges' })
// --- register controllers ---
fastify.register(import('./personsWithSignificantControl/webService/controllers/getSuperSecurePersonController.js'))
fastify.register(import('./personsWithSignificantControl/webService/controllers/getStatementController.js'))
fastify.register(import('./personsWithSignificantControl/webService/controllers/listStatementsController.js'))
fastify.register(import('./personsWithSignificantControl/webService/controllers/getLegalPersonsController.js'))
fastify.register(import('./personsWithSignificantControl/webService/controllers/getCorporateEntitiesController.js'))
fastify.register(import('./personsWithSignificantControl/webService/controllers/getIndividualController.js'))
fastify.register(
  import('./personsWithSignificantControl/webService/controllers/listPersonsWithSignificantControlController.js')
)
fastify.register(import('./UKEstablishments/webService/controllers/getUKEstablishmentsController.js'))
fastify.register(import('./insolvency/webService/controllers/getInsolvencyController.js'))
fastify.register(import('./charges/webService/controllers/getChargesController.js'))
fastify.register(import('./charges/webService/controllers/listChargesController.js'))
fastify.register(import('./officers/webService/controllers/listOfficerAppointmentsController.js'))
fastify.register(import('./officerDisqualifications/webService/controllers/getCorporateOfficerController.js'))
fastify.register(import('./officerDisqualifications/webService/controllers/getNaturalOfficerController.js'))
fastify.register(import('./personsWithSignificantControl/webService/controllers/getExemptionsController.js'))
fastify.register(import('./filingHistory/webService/controllers/listFilingHistoryController.js'))
fastify.register(import('./filingHistory/webService/controllers/getFilingHistoryController.js'))
fastify.register(import('./registers/webService/controllers/getRegistersController.js'))
fastify.register(import('./officers/webService/controllers/getOfficerAppointmentController.js'))
fastify.register(import('./officers/webService/controllers/listCompanyOfficersController.js'))
fastify.register(import('./search/webService/controllers/advancedCompanySearchController.js'))
fastify.register(import('./search/webService/controllers/searchCompaniesAlphabeticallyController.js'))
fastify.register(import('./search/webService/controllers/searchDissolvedCompaniesController.js'))
fastify.register(import('./search/webService/controllers/searchDisqualifiedOfficersController.js'))
fastify.register(import('./officers/webService/controllers/searchOfficersController.js'))
fastify.register(import('./search/webService/controllers/searchCompaniesController.js'))
fastify.register(import('./search/webService/controllers/searchAllController.js'))
fastify.register(import('./companyProfile/webService/controllers/getCompanyProfileController.js'))
fastify.register(import('./companyProfile/webService/controllers/getRegisteredOfficeAddressController.js'))

await fastify.listen({ port: 3000, host: '::' })
