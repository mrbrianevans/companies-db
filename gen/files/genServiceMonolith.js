import {writeFile} from "node:fs/promises";
import {resolve} from "path";
import {prettyTs} from "../utils.js";

/**
 * Generates the services/index.ts, services/package.json and services/tsconfig.json files to allow all the microservices
 * to be run as a single monolithic process.
 */
export async function genServiceMonolith(SERVICES_DIR, tags) {
    await writeFile(resolve(SERVICES_DIR, 'monolith.ts'), prettyTs(`import Fastify from 'fastify'
import fastifyRedis from '@fastify/redis'
import fastifyMongo from '@fastify/mongodb'
import 'dotenv/config'

const fastify = Fastify({logger: true})

if (!process.env.REDIS_URL)
  throw new Error('REDIS_URL environment variable not set')
fastify.register(fastifyRedis, { url: process.env.REDIS_URL })
if (!process.env.MONGO_URL)
  throw new Error('MONGO_URL environment variable not set')
fastify.register(fastifyMongo, { url: process.env.MONGO_URL + '/charges' })
// --- register controllers ---

await fastify.listen({port: 3000, host: '::'})
`))
    await writeFile(resolve(SERVICES_DIR, 'package.json'), JSON.stringify({
        "name": "services",
        "description": "Run all services in a monolith process",
        "version": "1.0.0",
        "type": "module",
        "scripts": {
            "start": "node monolith | pino-pretty -c -t",
            "build": "tsc -b",
            "watch": "tsc -b -w",
            "clean": "tsc -b --clean"
        },
        "devDependencies": {
            "@types/node": "^18.7.2",
            "json-schema-to-ts": "^2.5.5",
            "pino-pretty": "^9.0.0",
            "typescript": "^4.7.4"
        },
        "dependencies": {
            "@fastify/mongodb": "^6.0.1",
            "@fastify/redis": "^6.0.0",
            "dot-object": "^2.1.4",
            "dotenv": "^16.0.1",
            "fastify": "4.4.0",
            "mongodb": "^4.8.1",
            "papaparse": "^5.3.2",
            "pino": "^8.4.1"
        }
    }, null, 2))
    await writeFile(resolve(SERVICES_DIR, 'tsconfig.json'), JSON.stringify({
        "compilerOptions": {
            "module": "ES2022",
            "target": "ES2021",
            "sourceMap": true,
            "moduleResolution": "node", // "strictNullChecks": true,
            "allowSyntheticDefaultImports": true
        }, "exclude": ["node_modules"], references: tags.map(tag => ({path: tag.name + '/webService'}))
    }, null, 2))
}
