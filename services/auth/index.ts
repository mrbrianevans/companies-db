import Fastify from 'fastify'
import {rateLimitController} from "./controllers/rateLimitController.js";
import fastifyRedis from "@fastify/redis";

// --- import controllers ---
const fastify = Fastify({ logger: true })

// --- register controllers ---
fastify.register(fastifyRedis, {url: process.env.AUTH_DB_URL})
fastify.register(rateLimitController)
await fastify.listen(3000, '::')
