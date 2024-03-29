import {readFile, writeFile} from "node:fs/promises";
import {resolve} from "path";
import {prettyTs} from "../utils.js";


const registerMarker = '// --- register controllers ---'

export async function genWebServiceIndexFile(SERVICES_DIR, tag){
    await writeFile(resolve(SERVICES_DIR, tag.name,'webService', 'index.ts'), prettyTs(`import Fastify from 'fastify'
import {getEnv} from "../shared/utils.js";
import {pinoLokiOptions} from '../shared/lokiLogger.js'
import { mongoDbName} from "../shared/dbClients.js";

const fastify = Fastify({
  logger: { level: 'trace', transport: { target: 'pino-loki', options: pinoLokiOptions } }
})
// @ts-ignore
fastify.register(import('@fastify/redis'), { url: getEnv('REDIS_URL') })
// @ts-ignore
fastify.register(import('@fastify/mongodb'), { url: getEnv('MONGO_URL') + '/' + mongoDbName})
${registerMarker}

await fastify.listen({port: 3000, host: '::'})
`))
    await genFastifyTypeDeclarationFile(SERVICES_DIR, tag.name)
}

async function genFastifyTypeDeclarationFile(SERVICES_DIR, tagName){
    const content = `
import {FastifyMongoNestedObject, FastifyMongoObject} from "@fastify/mongodb";
import {FastifyRedis} from "@fastify/redis";

declare module 'fastify' {
  export interface FastifyInstance {
    // fastify mongo
    mongo: FastifyMongoObject & FastifyMongoNestedObject
    // fastify redis
    redis: FastifyRedis;
  }
}
export {}

`
    await writeFile(resolve(SERVICES_DIR, tagName, 'webService', 'fastify.d.ts'), prettyTs(content))
}

export async function registerFastifyPluginInIndexFile(SERVICES_DIR, tagName, name, Name){
    // inject register to index fastify listener
    const index = await readFile(resolve(SERVICES_DIR, tagName,'webService', 'index.ts')).then(String)
        .then(index => index.replace(registerMarker, marker => `${marker}
fastify.register(import('${['.', 'controllers', name + 'Controller.js'].join('/')}'))`))
    await writeFile(resolve(SERVICES_DIR, tagName,'webService', 'index.ts'), prettyTs(index))
}
