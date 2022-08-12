import Fastify from 'fastify'
import {rateLimitController} from "./controllers/rateLimitController.js";
import {newKeyController} from "./controllers/newKeyController.js";

// --- import controllers ---
const fastify = Fastify({ logger: true })

// --- register controllers ---
if(!process.env.AUTH_DB_URL) throw new Error('AUTH_DB_URL environment variable not set')
// @ts-ignore
fastify.register(import('@fastify/redis'), {url: process.env.AUTH_DB_URL})
fastify.register(rateLimitController)
fastify.register(newKeyController)
await fastify.listen(3000, '::')
