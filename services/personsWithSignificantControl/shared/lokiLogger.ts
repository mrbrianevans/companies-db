import pino from 'pino';
import type PinoLoki from 'pino-loki'
import {getEnv} from "./utils.js";

// options exported for Fastify, other
export const pinoLokiOptions: (component: string, batching?: boolean) => Parameters<typeof PinoLoki>[0] = (component, batching= true) => ({
  host: getEnv('LOKI_URL'),
  interval: 2, // send batch of logs every X seconds
  labels: {service: 'personsWithSignificantControl', component},
  replaceTimestamp: false,
  silenceErrors: false,
  timeout: 5000,
  batching
})

export const getLogger = (component, batching= true) => pino(pino.transport({
  target: 'pino-loki',
  options: pinoLokiOptions(component, batching)
}))

await fetch(pinoLokiOptions('web-service').host + '/ready').then(r=>console.log(pinoLokiOptions('web-service').labels?.service,'LOKI:',r.status, r.statusText))
