import Fastify from 'fastify'
import {rateLimitController} from "./controllers/rateLimitController.js";
import {newKeyController} from "./controllers/newKeyController.js";
import type PinoLoki from 'pino-loki'
import { getEnv } from './utils.js';

const options: Parameters<typeof PinoLoki>[0] = {
  host: getEnv('LOKI_URL'),
  interval: 2, // send batch of logs every X seconds
  labels: {service: 'auth'},
  replaceTimestamp: false,
  silenceErrors: false,
  timeout: 5000,
  batching: true
}

await fetch(options.host + '/ready').then(r=>console.log('LOKI:',r.status, r.statusText))

// --- import controllers ---
const fastify = Fastify({ logger: {
  level: 'trace',
  transport: {
    target: "pino-loki",
    options
}}})

// --- register controllers ---
if(!process.env.AUTH_DB_URL) throw new Error('AUTH_DB_URL environment variable not set')
// @ts-ignore
fastify.register(import('@fastify/redis'), {url: process.env.AUTH_DB_URL})
fastify.register(rateLimitController)
fastify.register(newKeyController)
await fastify.listen({host: '::', port: 3000})
