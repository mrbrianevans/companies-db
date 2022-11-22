/*
Generates a directory to keep the database up-to-date by listening on streams and/or polling the official API.
 */

import {mkdir, writeFile} from "node:fs/promises";
import {resolve} from "path";
import {genWebServicePackageJson} from "./genWebServicePackageJson.js";
import {genWebServiceDockerfile} from "./genDockerCompose.js";
import {genWebServiceIndexFile} from "./genServiceIndexFiles.js";
import {prettyTs} from "../utils.js";

export async function genWebService(SERVICES_DIR, tag){

    //generate .dockerignore, Dockerfile, index.ts, package.json and tsconfig.json
    await mkdir(resolve(SERVICES_DIR, tag.name, 'webService'), {recursive: true})
    await genWebServicePackageJson(SERVICES_DIR, tag)
    await genWebServiceDockerfile(SERVICES_DIR, tag)
    await genWebServiceIndexFile(SERVICES_DIR, tag)
}


export async function generateWebServicePath({SERVICES_DIR, tag, name,Name,parameters,processParams,isPath,isQuery,getName,responseSchema,summary,path,description}){
//todo: the typescript interfaces should be properly generated from the JSON schema, at the moment they aren't accurately reflecting enums.
    await writeFile(resolve(SERVICES_DIR, tag,'webService', 'schemas', name + 'Schema.ts'), prettyTs(`
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
    await writeFile(resolve(SERVICES_DIR, tag,'webService', 'controllers', name + 'Controller.ts'), prettyTs(`
import {FastifyPluginAsync} from "fastify";
import {${name}, Context, init${Name}Collection} from "../service/${name}.js";
import { auth } from "./reflect.js";
import {${Name}Schema as schema, ${Name}QueryString, ${Name}Params } from "../schemas/${name}Schema.js";



const ${name}Controller: FastifyPluginAsync = async (fastify, opts)=>{
  fastify.log = fastify.log.child({route: '${name}'})
  await init${Name}Collection(fastify.mongo.db)
  fastify.get<{Params: ${Name}Params, Querystring: ${Name}QueryString}>('${path.replace(/\{(.*?)}/g, (whole, pName) => ':' + pName)}', schema, async (req, res)=>{
    ${parameters.filter(isPath).length ? `const {${parameters.filter(isPath).map(getName).join(', ')}} = req.params`:''}
     ${parameters.filter(isQuery).length ? `const {${parameters.filter(isQuery).map(getName).join(', ')}} = req.query`:''}
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      for(const [header, value] of Object.entries(ratelimit??{}))
        res.header(header, value)
    if (ratelimit === null) {
      // these requests should usually be filtered out by Caddy, but just in case some make it through:
      res.code(401).send({"statusCode": 401, "error": "Not authorised", "message": "Basic authentication token not included in request header."})
      return
    }
    if(ratelimit?.['X-Ratelimit-Remain'] <= 0){
      res.code(429).send({statusCode: 429, error: 'Too many requests', message:"Rate limit exceeded"})
      return
    }
    const {redis, mongo} = fastify
    const context: Context = {redis, mongo, req}
    const result = ${name}(context,${processParams(parameters)})
    if(result) return result
    else res.code(404).send({statusCode: 404, error:"Not found", message: 'Not found'})
  })
}
export default ${name}Controller
        `))
    // this reflects requests to the companies house api
    await writeFile(resolve(SERVICES_DIR, tag,'webService', 'controllers', 'reflect.ts'), prettyTs(`
import {getLogger} from '../../shared/lokiLogger.js'

const logger = getLogger('web-service') 
        const apiUrl = 'https://api.company-information.service.gov.uk'
const headers =  {Authorization: 'Basic '+Buffer.from(getEnv('RESTAPIKEY')+':').toString('base64')}

/** Get an environment variable, or throw if its not set */
export function getEnv(name: string): string{
    const value = process.env[name]
    if(value === undefined) throw new Error(\`$\{name} environment variable not set\`)
    return value
}


export async function reflect(path){
  logger.info({path, apiUrl}, "Outgoing request to Official API")
  const res = await fetch(apiUrl + path, { headers })
  logger.info({ path, status: res.status }, 'Requested official API - response status')
  if(res.ok)
  return await res.json()
  else return null
}
export async function auth(headers) {
try{
    const url = new URL(getEnv('AUTH_URL'))
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
//     await writeFile(resolve(SERVICES_DIR, tag,'webService', 'service', name + '.ts'), prettyTs(`
// import type { ${Name}Response } from "../schemas/${name}Schema.js";
// import type {FastifyRedis} from "@fastify/redis";
// import type {FastifyMongoObject} from "@fastify/mongodb";
// import type {FastifyRequest} from "fastify";
//
// import { ${Name}Schema } from "../schemas/${name}Schema.js";
// import {reflect} from "../controllers/reflect.js";
// import {performance} from "perf_hooks";
//
// export interface Context{
//   redis: FastifyRedis,
//   mongo: FastifyMongoObject
//   req: FastifyRequest
// }
// // the main database collection for the ${name} service
// const colName = '${name}'
//
// /** Must be called before any data is inserted */
// export async function init${Name}Collection(db: FastifyMongoObject['db']){
//   if(!db) throw new Error('DB not defined')
//   const exists = await db.listCollections({name:colName}).toArray().then(a=>a.length)
//   if(!exists) {
//     console.log('Creating collection', colName)
//     const {example, ...schema} = { ...${Name}Schema['schema']['response']['200'] }
//     await db.createCollection(colName, {
//       storageEngine: {wiredTiger: {configString: 'block_compressor=zstd'}},
//       // schema validation is temporarily disabled because mongo uses BSONschema which has slightly different types (doesn't support integer)
//       // validator: {$jsonSchema: schema },
//        // validationAction: "error" || "warn" // if a write fails validation
//     })
//     ${parameters.filter(isPath).length ?`await db.collection(colName).createIndex({${parameters.filter(isPath).map(p=>getName(p) + ': 1').join(', ')}},{unique: true})`:''}
//   }
// }
//
// /**
//  * ${summary ? summary + '.\n *' :''}
//  * ${description ? description + '.\n *' :''}
//  */
// export async function ${name}(context: Context, ${processParams(parameters, true)}): Promise<${Name}Response|null>{
//   if(!context.mongo.db) throw new Error('DB not defined')
//   const collection = context.mongo.db.collection<${Name}Response>(colName)
//   const startFind = performance.now()
//   let res = await collection.findOne({${processParams(parameters.filter(isPath))}})
//   const findDurationMs = performance.now() - startFind
//   context.req.log.trace({findDurationMs, found: Boolean(res)}, 'Find one operation in MongoDB')
//   if(!res){
//     res = await call${Name}Api({${processParams(parameters.filter(isPath))}}, {${processParams(parameters.filter(isQuery))}})
//     if(res){
//     try{
//     await collection.updateOne({${processParams(parameters.filter(isPath))}}, {$set: res}, {upsert: true})
//     }      catch (e) {
//         if(e.code === 121){
//           context.req.log.warn({${processParams(parameters)}},"Failed to upsert document from API due to validation error")
//         }else{
//           context.req.log.error({err: e},
//             'Failed to insert document for a different reason to validation'
//           )
//         }
//       }
//   }
//   }
//   return res ?? null
// }
//
// async function call${Name}Api(pathParams, queryParams) {
// const nonNullQueryParams = Object.fromEntries(Object.entries(queryParams).filter(([k,v])=>v).map(([k,v])=>[k, String(v)]))
//   const urlQuery = new URLSearchParams(nonNullQueryParams)
//     ${parameters.filter(isPath).length ? `const {${parameters.filter(isPath).map(getName).join(', ')}} = pathParams`:''}
//     const path = \`${path.replaceAll('{','${')}\`
//   return await reflect(path + '?' + urlQuery.toString())
// }
//
// `))
}
