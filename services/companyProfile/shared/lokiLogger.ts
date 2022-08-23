import type PinoLoki from 'pino-loki'
import {getEnv} from "./utils.js";

export const pinoLokiOptions: Parameters<typeof PinoLoki>[0] = {
  host: getEnv('LOKI_URL'),
  interval: 2, // send batch of logs every X seconds
  labels: {service: 'companyProfile'},
  replaceTimestamp: false,
  silenceErrors: false,
  timeout: 5000,
  batching: true
}

await fetch(pinoLokiOptions.host + '/ready').then(r=>console.log(pinoLokiOptions.labels?.service,'LOKI:',r.status, r.statusText))
