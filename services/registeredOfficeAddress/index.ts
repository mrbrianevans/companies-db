import Fastify from 'fastify'
// --- import controllers ---
import {getRegisteredOfficeAddressController} from './controllers/getRegisteredOfficeAddressController.js'

const fastify = Fastify({logger: true})

// --- register controllers ---
fastify.register(getRegisteredOfficeAddressController)

await fastify.listen(3000)
