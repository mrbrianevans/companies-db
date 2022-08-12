import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
import 'dotenv/config'
// --- import controllers ---
import { getSuperSecurePersonController } from './personsWithSignificantControl/webService/controllers/getSuperSecurePersonController.js'
import { getStatementController } from './personsWithSignificantControl/webService/controllers/getStatementController.js'
import { listStatementsController } from './personsWithSignificantControl/webService/controllers/listStatementsController.js'
import { getLegalPersonsController } from './personsWithSignificantControl/webService/controllers/getLegalPersonsController.js'
import { getCorporateEntitiesController } from './personsWithSignificantControl/webService/controllers/getCorporateEntitiesController.js'
import { getIndividualController } from './personsWithSignificantControl/webService/controllers/getIndividualController.js'
import { listPersonsWithSignificantControlController } from './personsWithSignificantControl/webService/controllers/listPersonsWithSignificantControlController.js'
import { getUKEstablishmentsController } from './UKEstablishments/webService/controllers/getUKEstablishmentsController.js'
import { getInsolvencyController } from './insolvency/webService/controllers/getInsolvencyController.js'
import { getChargesController } from './charges/webService/controllers/getChargesController.js'
import { listChargesController } from './charges/webService/controllers/listChargesController.js'
import { listOfficerAppointmentsController } from './officers/webService/controllers/listOfficerAppointmentsController.js'
import { getCorporateOfficerController } from './officerDisqualifications/webService/controllers/getCorporateOfficerController.js'
import { getNaturalOfficerController } from './officerDisqualifications/webService/controllers/getNaturalOfficerController.js'
import { getExemptionsController } from './personsWithSignificantControl/webService/controllers/getExemptionsController.js'
import { listFilingHistoryController } from './filingHistory/webService/controllers/listFilingHistoryController.js'
import { getFilingHistoryController } from './filingHistory/webService/controllers/getFilingHistoryController.js'
import { getRegistersController } from './registers/webService/controllers/getRegistersController.js'
import { getOfficersController } from './officers/webService/controllers/getOfficersController.js'
import { listOfficersController } from './officers/webService/controllers/listOfficersController.js'
import { advancedCompanySearchController } from './search/webService/controllers/advancedCompanySearchController.js'
import { searchCompaniesAlphabeticallyController } from './search/webService/controllers/searchCompaniesAlphabeticallyController.js'
import { searchDissolvedCompaniesController } from './search/webService/controllers/searchDissolvedCompaniesController.js'
import { searchDisqualifiedOfficersController } from './search/webService/controllers/searchDisqualifiedOfficersController.js'
import { searchOfficersController } from './officers/webService/controllers/searchOfficersController.js'
import { searchCompaniesController } from './search/webService/controllers/searchCompaniesController.js'
import { searchAllController } from './search/webService/controllers/searchAllController.js'
import { getCompanyProfileController } from './companyProfile/webService/controllers/getCompanyProfileController.js'
import { getRegisteredOfficeAddressController } from './registeredOfficeAddress/webService/controllers/getRegisteredOfficeAddressController.js'

const fastify = Fastify({ logger: true })

if (!process.env.REDIS_URL)
  throw new Error('REDIS_URL environment variable not set')
fastify.register(fastifyRedis, { url: process.env.REDIS_URL })
if (!process.env.MONGO_URL)
  throw new Error('MONGO_URL environment variable not set')
fastify.register(fastifyMongo, { url: process.env.MONGO_URL + '/charges' })
// --- register controllers ---
fastify.register(getSuperSecurePersonController)
fastify.register(getStatementController)
fastify.register(listStatementsController)
fastify.register(getLegalPersonsController)
fastify.register(getCorporateEntitiesController)
fastify.register(getIndividualController)
fastify.register(listPersonsWithSignificantControlController)
fastify.register(getUKEstablishmentsController)
fastify.register(getInsolvencyController)
fastify.register(getChargesController)
fastify.register(listChargesController)
fastify.register(listOfficerAppointmentsController)
fastify.register(getCorporateOfficerController)
fastify.register(getNaturalOfficerController)
fastify.register(getExemptionsController)
fastify.register(listFilingHistoryController)
fastify.register(getFilingHistoryController)
fastify.register(getRegistersController)
fastify.register(getOfficersController)
fastify.register(listOfficersController)
fastify.register(advancedCompanySearchController)
fastify.register(searchCompaniesAlphabeticallyController)
fastify.register(searchDissolvedCompaniesController)
fastify.register(searchDisqualifiedOfficersController)
fastify.register(searchOfficersController)
fastify.register(searchCompaniesController)
fastify.register(searchAllController)
fastify.register(getCompanyProfileController)
fastify.register(getRegisteredOfficeAddressController)

await fastify.listen({ port: 3000, host: '::' })
