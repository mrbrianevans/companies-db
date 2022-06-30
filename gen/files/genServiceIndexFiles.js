import {readFile, writeFile} from "node:fs/promises";
import {resolve} from "path";
import {prettyTs} from "../utils.js";


const importMarker = '// --- import controllers ---'
const registerMarker = '// --- register controllers ---'

export async function genWebServiceIndexFile(SERVICES_DIR, tag){
    await writeFile(resolve(SERVICES_DIR, tag.name,'webService', 'index.ts'), prettyTs(`import Fastify from 'fastify'
import fastifyRedis from "@fastify/redis";
import fastifyMongo from "@fastify/mongodb";
import {getEnv} from "./controllers/reflect.js";
${importMarker}

const fastify = Fastify({
  logger: { level: 'trace', base: { service: '${tag.name}' } }
})

fastify.register(fastifyRedis, { url: getEnv('REDIS_URL') })
fastify.register(fastifyMongo, { url: getEnv('MONGO_URL') + '/${tag.name}'})
${registerMarker}

await fastify.listen({port: 3000, host: '::'})
`))
}


export async function registerFastifyPluginInIndexFile(SERVICES_DIR, tagName, name, Name){
    // inject register to index fastify listener
    const index = await readFile(resolve(SERVICES_DIR, tagName,'webService', 'index.ts')).then(String)
        .then(index => index.replace(registerMarker, marker => `${marker}
fastify.register(${name}Controller)`))
        .then(index => index.replace(importMarker, marker => `${marker}
import { ${name}Controller } from '${['.', 'controllers', name + 'Controller.js'].join('/')}'`))
    await writeFile(resolve(SERVICES_DIR, tagName,'webService', 'index.ts'), prettyTs(index))
}
