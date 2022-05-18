import Fastify from 'fastify'
import {authController} from "./controllers/authController.js";
// --- import controllers ---
const fastify = Fastify({ logger: true })

// --- register controllers ---
fastify.register(authController)
await fastify.listen(3000, '::')
