import Fastify from 'fastify'
// --- import controllers ---
import {listOfficerAppointmentsController} from './controllers/listOfficerAppointmentsController.js'

const fastify = Fastify({logger: true})

// --- register controllers ---
fastify.register(listOfficerAppointmentsController)

await fastify.listen(3000)
