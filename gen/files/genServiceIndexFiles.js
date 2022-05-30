import {readFile, writeFile} from "node:fs/promises";
import {resolve} from "path";
import {prettyTs} from "../utils.js";


const importMarker = '// --- import controllers ---'
const registerMarker = '// --- register controllers ---'

export async function genServiceIndexFile(SERVICES_DIR, tag){
    await writeFile(resolve(SERVICES_DIR, tag.name, 'index.ts'), prettyTs(`import Fastify from 'fastify'
import fastifyRedis from "@fastify/redis";
import fastifyMongo from "@fastify/mongodb";
${importMarker}

const fastify = Fastify({logger: true})

if(!process.env.REDIS_URL) throw new Error('REDIS_URL environment variable not set')
fastify.register(fastifyRedis, {url: process.env.REDIS_URL})
if(!process.env.MONGO_URL) throw new Error('MONGO_URL environment variable not set')
fastify.register(fastifyMongo, {url: process.env.MONGO_URL + '/${tag.name}'})
${registerMarker}

await fastify.listen({port: 3000, host: '::'})
`))
}


export async function registerFastifyPluginInIndexFile(SERVICES_DIR, tagName, name, Name){
    // inject register to index fastify listener
    const index = await readFile(resolve(SERVICES_DIR, tagName, 'index.ts')).then(String)
        .then(index => index.replace(registerMarker, marker => `${marker}
fastify.register(${name}Controller)`))
        .then(index => index.replace(importMarker, marker => `${marker}
import { ${name}Controller } from '${['.', 'controllers', name + 'Controller.js'].join('/')}'`))
    await writeFile(resolve(SERVICES_DIR, tagName, 'index.ts'), prettyTs(index))
}
