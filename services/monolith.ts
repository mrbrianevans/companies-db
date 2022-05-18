import Fastify from 'fastify'
// --- import controllers ---
import { getSuperSecurePersonController } from './personsWithSignificantControl/controllers/getSuperSecurePersonController.js'
import { getStatementController } from './personsWithSignificantControl/controllers/getStatementController.js'
import { listStatementsController } from './personsWithSignificantControl/controllers/listStatementsController.js'
import { getLegalPersonsController } from './personsWithSignificantControl/controllers/getLegalPersonsController.js'
import { getCorporateEntitiesController } from './personsWithSignificantControl/controllers/getCorporateEntitiesController.js'
import { getIndividualController } from './personsWithSignificantControl/controllers/getIndividualController.js'
import { listPersonsWithSignificantControlController } from './personsWithSignificantControl/controllers/listPersonsWithSignificantControlController.js'
import { getUKEstablishmentsController } from './UKEstablishments/controllers/getUKEstablishmentsController.js'
import { getInsolvencyController } from './insolvency/controllers/getInsolvencyController.js'
import { getChargesController } from './charges/controllers/getChargesController.js'
import { listChargesController } from './charges/controllers/listChargesController.js'
import { listOfficerAppointmentsController } from './officerAppointments/controllers/listOfficerAppointmentsController.js'
import { getCorporateOfficerController } from './officerDisqualifications/controllers/getCorporateOfficerController.js'
import { getNaturalOfficerController } from './officerDisqualifications/controllers/getNaturalOfficerController.js'
import { getExemptionsController } from './exemptions/controllers/getExemptionsController.js'
import { listFilingHistoryController } from './filingHistory/controllers/listFilingHistoryController.js'
import { getFilingHistoryController } from './filingHistory/controllers/getFilingHistoryController.js'
import { getRegistersController } from './registers/controllers/getRegistersController.js'
import { getOfficersController } from './officers/controllers/getOfficersController.js'
import { listOfficersController } from './officers/controllers/listOfficersController.js'
import { advancedCompanySearchController } from './search/controllers/advancedCompanySearchController.js'
import { searchCompaniesAlphabeticallyController } from './search/controllers/searchCompaniesAlphabeticallyController.js'
import { searchDissolvedCompaniesController } from './search/controllers/searchDissolvedCompaniesController.js'
import { searchDisqualifiedOfficersController } from './search/controllers/searchDisqualifiedOfficersController.js'
import { searchOfficersController } from './search/controllers/searchOfficersController.js'
import { searchCompaniesController } from './search/controllers/searchCompaniesController.js'
import { searchAllController } from './search/controllers/searchAllController.js'
import { getCompanyProfileController } from './companyProfile/controllers/getCompanyProfileController.js'
import { getRegisteredOfficeAddressController } from './registeredOfficeAddress/controllers/getRegisteredOfficeAddressController.js'

const fastify = Fastify({ logger: true })

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

await fastify.listen(3000, '::')
