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
// --- import controllers ---

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
            "@types/node": "^18.6.3", "json-schema-to-ts": "^2.5.5", "pino-pretty": "^7.6.1", "typescript": "^4.7.4"
        },
        "dependencies": {
            "@fastify/mongodb": "^6.0.1", "@fastify/redis": "^6.0.0", "dot-object": "^2.1.4", // used for converting bulk CSV file to JSON
            "dotenv": "^16.0.1", "fastify": "4.0.0-rc.3", "mongodb": "^4.8.1", // used for bulk inserting data into Mongo
            "papaparse": "^5.3.2", // used for parsing CSV
            "pino": "^7.11.0"
        }
    }, null, 2))
    await writeFile(resolve(SERVICES_DIR, 'tsconfig.json'), JSON.stringify({
        "compilerOptions": {
            "module": "ES2022",
            "target": "ES2021",
            "sourceMap": true,
            "moduleResolution": "node", // "strictNullChecks": true
        }, "exclude": ["node_modules"], references: tags.map(tag => ({path: tag.name + '/webService'}))
    }, null, 2))
}
