import Fastify from 'fastify'
// --- import controllers ---
import {advancedCompanySearchController} from './controllers/advancedCompanySearchController.js'
import {searchCompaniesAlphabeticallyController} from './controllers/searchCompaniesAlphabeticallyController.js'
import {searchDissolvedCompaniesController} from './controllers/searchDissolvedCompaniesController.js'
import {searchDisqualifiedOfficersController} from './controllers/searchDisqualifiedOfficersController.js'
import {searchOfficersController} from './controllers/searchOfficersController.js'
import {searchCompaniesController} from './controllers/searchCompaniesController.js'
import {searchAllController} from './controllers/searchAllController.js'

const fastify = Fastify({logger: true})

// --- register controllers ---
fastify.register(advancedCompanySearchController)
fastify.register(searchCompaniesAlphabeticallyController)
fastify.register(searchDissolvedCompaniesController)
fastify.register(searchDisqualifiedOfficersController)
fastify.register(searchOfficersController)
fastify.register(searchCompaniesController)
fastify.register(searchAllController)

await fastify.listen(3000)
