import {mkdir, readFile, writeFile} from 'node:fs/promises'
import {resolve} from "path";
import {addCaddyFileEntry, newCaddyFile} from "./files/genCaddyFile.js";
import {camelCase, kebabCase, prettyTs} from "./utils.js";
import {addPathSystemTest, genSystemTest} from "./files/genSystemTest.js";
import YAML from 'yaml'
import {genDockerCompose, genDockerfile} from "./files/genDockerCompose.js";
import {genPrometheusConfig} from "./files/genPrometheus.js";
import {genServiceIndexFile, registerFastifyPluginInIndexFile} from "./files/genServiceIndexFiles.js";
import {genPackageJson} from "./files/genPackageJson.js";
import {genServiceMonolith} from "./files/genServiceMonolith.js";

// read apispec.{yaml|json}
// for each tag, create a directory containing: package.json, tsconfig.json, index.ts, service dir, and controllers dir
// for each path:
// create a controller, using the parameters for path params and query params. Can just copy {schema}
// create a service, export an async function with arguments for all the parameters
// create a monolith that links all the microservices

const SERVICES_DIR = resolve('../services')
const SYS_TEST_DIR = resolve('../testing/tests')
console.log({SERVICES_DIR})


async function createTagDirectories(tags) {
    await mkdir(resolve(SERVICES_DIR), {recursive: true})
    await mkdir(resolve(SYS_TEST_DIR), {recursive: true})
    await newCaddyFile(SERVICES_DIR)
    await genPrometheusConfig(SERVICES_DIR)
    await genDockerCompose(SERVICES_DIR, tags)
    await genServiceMonolith(SERVICES_DIR, tags)
    for (const tag of tags) {
        await mkdir(resolve(SERVICES_DIR, tag.name), {recursive: true})
        await genSystemTest(SYS_TEST_DIR, tag.name)
        await genPackageJson(SERVICES_DIR, tag) // also does tsconfig
        await genServiceIndexFile(SERVICES_DIR, tag)
        await genDockerfile(SERVICES_DIR, tag)
        await mkdir(resolve(SERVICES_DIR, tag.name, 'controllers'), {recursive: true})
        await mkdir(resolve(SERVICES_DIR, tag.name, 'service'), {recursive: true})
        await mkdir(resolve(SERVICES_DIR, tag.name, 'schemas'), {recursive: true})
    }
}

const isObject = obj => obj !== null && typeof obj === 'object';

// fixes the schema where type=array has been used, but is supposed to be type=object
function flattenItemsRecursive(schema, skip) {
    if (!isObject(schema)) return
    else if ('properties' in schema) {
        schema.type = 'object'
        for (const property in schema.properties) {
            if (isObject(schema.properties[property])) {
                flattenItemsRecursive(schema.properties[property], property)
            }
        }
    }
    else if ('items' in schema) {
        if (schema.items.title !== skip && skip !== 'items') {
            schema.type = 'object'
            for (const item in schema.items) {
                schema[item] = schema.items[item]
            }
            flattenItemsRecursive(schema)
            delete schema.items
        }else{
            schema.type = 'array'
            flattenItemsRecursive(schema.items)
        }
    }
}
function removeSchemaRequirements(schema){
    return // skip for now, testing new schemas with correct requirements
    if (!isObject(schema)) return
    if ('required' in schema) schema.required = []
    if ('items' in schema) removeSchemaRequirements(schema.items)
    else if ('properties' in schema) {
        for (const property in schema.properties)
                removeSchemaRequirements(schema.properties[property])
    }
}

const types = new Map()
types.set('integer', "number")

const getName = p => p.name ?? p.title

function processParams(params, includeTypes = false, sep = ', ', docs = false) {
    function getType(param) {
        return `${param.required ? ':' : '?:'} ${types.get(param.schema.type) ?? param.schema.type}`
    }

    return params.sort((a, b) => (a.required === b.required) ? 0 : a.required ? -1 : 1).map(p => (docs ? `/** ${p.description} */\n` : '') + `${getName(p)}${includeTypes ? getType(p) : ''}`).join(sep)
}

const isPath = p => (p.paramType ?? p.in) === 'path'
const isQuery = p => (p.paramType ?? p.in) === 'query'

async function createRoutes(paths, responsePaths) {
    for (const path in paths) {
        const {get: {parameters, ['x-operationName']: operationName, tags: [tag], summary, description}} = paths[path]
        const responsePath = path.replace('company_number', 'companyNumber')
        const {get: {responses}} = responsePaths[responsePath] ?? responsePaths[path] // these are sometimes different
        const responseSchema = responses[200].content['application/json'].schema
        const op = camelCase(operationName ?? 'get')
        const name = op === 'list' || op === 'get' ? camelCase(op + ' ' + tag) : op,
            Name = name.replace(/^\w/, l => l.toUpperCase())
        // if (responseSchema) flattenItemsRecursive(responseSchema)
        // removeSchemaRequirements(responseSchema)
        for (const parameter of parameters) {
            parameter.required = isPath(parameter) || getName(parameter) === 'q' // query parameters are never required and path parameters are always required
        }
        await addPathSystemTest(SYS_TEST_DIR, tag, path, name, responseSchema)
        await addCaddyFileEntry(SERVICES_DIR, path, tag)
        await writeFile(resolve(SERVICES_DIR, tag, 'schemas', name + 'Schema.ts'), prettyTs(`
import { FromSchema } from "json-schema-to-ts";

export interface ${Name}Params {
  ${processParams(parameters.filter(isPath), true, ';\n\t', true)}
}

export interface ${Name}QueryString {
  ${processParams(parameters.filter(isQuery), true, ';\n\t', true)}
}

export const ${Name}Schema = {
  schema: ${JSON.stringify({
            params: {
                type: 'object',
                properties: Object.fromEntries(parameters.filter(isPath).map(p => [getName(p), p.schema])),
                required: parameters.filter(isPath).filter(p => p.required).map(getName)
            },
            querystring: {
                type: 'object',
                properties: Object.fromEntries(parameters.filter(isQuery).map(p => [getName(p), p.schema])),
                required: parameters.filter(isQuery).filter(p => p.required).map(getName)
            },
            response: {200: responseSchema}
        }, null, 2)}
} as const

export type ${Name}Response = FromSchema<typeof ${Name}Schema['schema']['response']['200']>
//export type ${Name}Response = any // temporary until schemas can be fixed
        
        `))
        await writeFile(resolve(SERVICES_DIR, tag, 'controllers', name + 'Controller.ts'), prettyTs(`
import {FastifyPluginAsync} from "fastify";
import {${name}, Context, init${Name}Collection} from "../service/${name}.js";
import { reflect, auth } from "./reflect.js";
import {${Name}Schema as schema, ${Name}QueryString, ${Name}Params } from "../schemas/${name}Schema.js";



export const ${name}Controller: FastifyPluginAsync = async (fastify, opts)=>{
  await init${Name}Collection(fastify.mongo.db)
  fastify.get<{Params: ${Name}Params, Querystring: ${Name}QueryString}>('${path.replace(/\{(.*?)}/g, (whole, pName) => ':' + pName)}', schema, async (req, res)=>{
    const {${parameters.filter(isPath).map(getName).join(', ')}} = req.params
    const {${parameters.filter(isQuery).map(getName).join(', ')}} = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      for(const [header, value] of Object.entries(ratelimit??{}))
        res.header(header, value)
    if(ratelimit?.['X-Ratelimit-Remain'] <= 0){
      res.code(429).send("Rate limit hit")
      return
    }
    const {redis, mongo} = fastify
    const context: Context = {redis, mongo, req}
    const result = ${name}(context,${processParams(parameters)})
    if(result) return result
    else res.code(404).send("Not found")
  })
}

        `))
        // this reflects requests to the companies house api
        await writeFile(resolve(SERVICES_DIR, tag, 'controllers', 'reflect.ts'), prettyTs(`
        import pino from 'pino'
const logger = pino()
        const apiUrl = 'https://api.company-information.service.gov.uk'
const headers =  {Authorization: 'Basic '+Buffer.from(process.env.RESTAPIKEY+':').toString('base64')}

if(!process.env.AUTH_URL) logger.error('AUTH_URL environment variable not set')
if(!process.env.RESTAPIKEY) logger.error('RESTAPIKEY environment variable not set')

export async function reflect(path){
  logger.info({path, apiUrl, keySet: Boolean(process.env.RESTAPIKEY)}, "Outgoing request to Official API")
  const res = await fetch(apiUrl + path, { headers })
  logger.info({ path, status: res.status }, 'Requested official API - response status')
  if(res.ok)
  return await res.json()
  else return null
}
export async function auth(headers) {
try{
    const url = new URL(process.env.AUTH_URL)
  const ratelimit = await fetch(url.toString(), { headers }).then(r=>r.ok ? r.json() : null)
  logger.info({ratelimit}, 'Fetched ratelimit from auth service')
  return ratelimit
  }catch (e){
  logger.error("Failed to get authorization headers")
  throw e
  }
}
        `))
        // write service stub
        await writeFile(resolve(SERVICES_DIR, tag, 'service', name + '.ts'), prettyTs(`
import type { ${Name}Response } from "../schemas/${name}Schema.js";
import type {FastifyRedis} from "@fastify/redis";
import type {FastifyMongoObject} from "@fastify/mongodb";
import type {FastifyRequest} from "fastify";

import { ${Name}Schema } from "../schemas/${name}Schema.js";
import {reflect} from "../controllers/reflect.js";
import {performance} from "perf_hooks";

export interface Context{
  redis: FastifyRedis,
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the ${name} service
const colName = '${name}'

/** Must be called before any data is inserted */
export async function init${Name}Collection(db: FastifyMongoObject['db']){
  const exists = await db.listCollections({name:colName}).toArray().then(a=>a.length)
  if(!exists) {
    console.log('Creating collection', colName)
    const schema = {...${Name}Schema['schema']['response']['200']}
    delete schema.example // not supported by mongodb
    await db.createCollection(colName, {
      storageEngine: {wiredTiger: {configString: 'block_compressor=zstd'}},
      // schema validation is temporarily disabled because mongo uses BSONschema which has slightly different types (doesn't support integer)
      // validator: {$jsonSchema: schema },
       // validationAction: "error" || "warn" // if a write fails validation
    })
    ${parameters.filter(isPath).length ?`await db.collection(colName).createIndex({${parameters.filter(isPath).map(p=>getName(p) + ': 1').join(', ')}})`:''}
  }
}

/**
 * ${summary ? summary + '.\n *' :''}
 * ${description ? description + '.\n *' :''}
 */
export async function ${name}(context: Context, ${processParams(parameters, true)}): Promise<${Name}Response>{
  const collection = context.mongo.db.collection<${Name}Response>(colName)
  const startFind = performance.now()
  let res = await collection.findOne({${processParams(parameters.filter(isPath))}})
  const findDurationMs = performance.now() - startFind
  context.req.log.trace({findDurationMs, found: Boolean(res)}, 'Find one operation in MongoDB')
  if(!res){
    res = await call${Name}Api({${processParams(parameters.filter(isPath))}}, {${processParams(parameters.filter(isQuery))}})
    if(res){
    try{
    await collection.updateOne({${processParams(parameters.filter(isPath))}}, {$set: res}, {upsert: true})
    }      catch (e) {
        if(e.code === 121){
          context.req.log.warn({${processParams(parameters)}},"Failed to upsert document from API due to validation error")
        }else{
          context.req.log.error({err: e},
            'Failed to insert document for a different reason to validation'
          )
        }
      }
  }
  }
  return res ?? null
}

async function call${Name}Api(pathParams, queryParams) {
const nonNullQueryParams = Object.fromEntries(Object.entries(queryParams).filter(([k,v])=>v).map(([k,v])=>[k, v.toString()]))
  const urlQuery = new URLSearchParams(nonNullQueryParams)
    const path = '${path}'.replace(/\\{(.+?)}/g, (w, n)=> pathParams[n])
  return await reflect(path + '?' + urlQuery.toString())
}

`))
        await registerFastifyPluginInIndexFile(SERVICES_DIR, tag, name, Name)
        const monolith = await readFile(resolve(SERVICES_DIR, 'monolith.ts')).then(String).then(index => index.replace(`// --- register controllers ---`, marker => `${marker}
fastify.register(${name}Controller)`)).then(index => index.replace(`// --- import controllers ---`, marker => `${marker}
import { ${name}Controller } from '${['.', tag, 'controllers', name + 'Controller.js'].join('/')}'`))
        await writeFile(resolve(SERVICES_DIR, 'monolith.ts'), prettyTs(monolith))


    }
}

// json spec contains response schema
const spec = await readFile(resolve('../spec/apispec.json')).then(String).then(JSON.parse)
// yaml spec is more correct
const Yspec = await readFile(resolve('../spec/openapi.yaml')).then(String).then(YAML.parse)


await createTagDirectories(Yspec.tags)
await createRoutes(Yspec.paths, Yspec.paths)
// console.log(Object.keys(Yspec.paths).map(p=>`"${p}": [{query: {}, params: {company_number: getCompanyNumber()}}]`).join(',\n\t'))
