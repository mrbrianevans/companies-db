import {mkdir, readFile, writeFile} from 'node:fs/promises'
import {resolve} from "path";
import prettier from 'prettier'

const prettyTs = code => prettier.format(code, {
    semi: false,
    parser: 'typescript',
    singleQuote: true,
    trailingComma: 'none'
})
// read apispec.{yaml|json}
// for each tag, create a directory containing: package.json, tsconfig.json, index.ts, service dir, and controllers dir
// for each path:
// create a controller, using the parameters for path params and query params. Can just copy {schema}
// create a service, export an async function with arguments for all the parameters
// create a monolith that links all the microservices

const SERVICES_DIR = resolve('../services')
console.log({SERVICES_DIR})

// this doesn't perfectly handle multiple capitals, such as APIKey or UKEstablishments, which should be api-key etc
const kebabCase = (str) => str.replaceAll(/([A-Z]*)([A-Z])([a-z]*)/g, (all) => '-' + all.toLowerCase() + '-')
    .replaceAll(/-+/g, '-')
    .replaceAll(/(^-)|(-$)/g, '')

async function createTagDirectories(tags) {
    await mkdir(resolve(SERVICES_DIR), {recursive: true})
    await writeFile(resolve(SERVICES_DIR, 'Caddyfile'), `:80 {
    # proxy to microservices
}
`)
    await writeFile(resolve(SERVICES_DIR, 'docker-compose.yaml'), YAML.stringify({
        version: '3',
        services: Object.fromEntries(tags.map((tag, i) => [kebabCase(tag.name), {
            build: tag.name,
            networks: ['microservices'],
            env_file: ['.env']
        }]).concat([['gateway', {
            image: 'caddy',
            volumes: ['./Caddyfile:/etc/caddy/Caddyfile'],
            ports: ['3000:80'], networks: ['microservices']
        }], ['auth-db', {image: 'redis', networks: ['auth']}],
        ['auth-service', {build: 'auth', networks: ['auth', 'microservices']}]])),
        networks: {microservices: {driver: 'bridge'}, auth: {driver: 'bridge'}}
    }, {defaultStringType: 'QUOTE_DOUBLE'}))
    await writeFile(resolve(SERVICES_DIR, 'monolith.ts'), prettyTs(`import Fastify from 'fastify'
// --- import controllers ---

const fastify = Fastify({logger: true})

// --- register controllers ---

await fastify.listen(3000, '::')
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
                "@types/node": "^17.0.34",
                "json-schema-to-ts": "^2.4.0",
                "pino-pretty": "^7.6.1",
                "typescript": "^4.6.4"
            },
            "dependencies": {
                "fastify": "^3.29.0"
            }
        }, null, 2)
    )
    await writeFile(resolve(SERVICES_DIR, 'tsconfig.json'), JSON.stringify({
        "compilerOptions": {
            "module": "ES2022",
            "target": "ES2021",
            "sourceMap": true,
            "moduleResolution": "node",
            // "strictNullChecks": true
        },
        "exclude": [
            "node_modules"
        ],
        references: tags.map(tag => ({path: tag.name}))
    }, null, 2))
    for (const tag of tags) {
        await mkdir(resolve(SERVICES_DIR, tag.name), {recursive: true})
        await writeFile(resolve(SERVICES_DIR, tag.name, 'package.json'), JSON.stringify({
            "name": kebabCase(tag.name+'-service'),
            "description": tag.description,
            "type": "module",
            "scripts": {
                "start": "node index | pino-pretty -c -t",
                "build": "tsc -b",
                "watch": "tsc -b -w",
                "clean": "tsc -b --clean"
            },
            "version": "1.0.0",
            "dependencies": {
                "fastify": "^3.29.0"
            },
            "devDependencies": {
                "@types/node": "^17.0.34",
                "pino-pretty": "^7.6.1",
                "json-schema-to-ts": "^2.4.0",
                "typescript": "^4.6.4"
            }
        }, null, 2))

        const tsconfig = {
            "compilerOptions": {
                "module": "ES2022",
                "target": "ES2021",
                "sourceMap": true,
                "moduleResolution": "node",
                // "strictNullChecks": true,
                "composite": true
            },
            "exclude": [
                "node_modules"
            ],
            "include": ["**/*.ts"]
        }
        await writeFile(resolve(SERVICES_DIR, tag.name, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2))
        await writeFile(resolve(SERVICES_DIR, tag.name, 'index.ts'), prettyTs(`import Fastify from 'fastify'
// --- import controllers ---

const fastify = Fastify({logger: true})

// --- register controllers ---

await fastify.listen(3000, '::')
`))
        await writeFile(resolve(SERVICES_DIR, tag.name, 'Dockerfile'), `FROM node:18

WORKDIR /service
COPY package*.json ./
RUN npm i
COPY tsconfig.json index.ts ./
COPY controllers controllers/
COPY service service/
COPY schemas schemas/
RUN npm exec tsc -- -b --clean
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
`)
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
        if (schema.items.title !== skip) {
            schema.type = 'object'
            for (const item in schema.items) {
                flattenItemsRecursive(schema.items[item])
                schema[item] = schema.items[item]
            }
            delete schema.items
        }else{
            flattenItemsRecursive(schema.items)
        }
    }
}
function removeSchemaRequirements(schema){
    if (!isObject(schema)) return
    if ('required' in schema) schema.required = []
    if ('items' in schema) removeSchemaRequirements(schema.items)
    else if ('properties' in schema) {
        for (const property in schema.properties)
                removeSchemaRequirements(schema.properties[property])
    }
}

function camelCase(input) {
    return input.trim().replaceAll(/\s(\w)(\w*)/g, (all, letter, rest) => {
        return letter.toUpperCase() + rest
    })
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
        const op = camelCase(operationName ?? 'get')
        const name = op === 'list' || op === 'get' ? camelCase(op + ' ' + tag) : op,
            Name = name.replace(/^\w/, l => l.toUpperCase())
        if (responses?.[200]?.schema) flattenItemsRecursive(responses[200].schema)
        removeSchemaRequirements(responses?.[200]?.schema)
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
            response: {200: responses[200].schema}
        }, null, 2)}
} as const

export type ${Name}Response = FromSchema<typeof ${Name}Schema['schema']['response']['200']>
//export type ${Name}Response = any // temporary until schemas can be fixed
        
        `))
        await writeFile(resolve(SERVICES_DIR, tag, 'controllers', name + 'Controller.ts'), prettyTs(`
import {FastifyPluginAsync} from "fastify";
import {${name}} from "../service/${name}.js";
import { reflect, auth } from "./reflect.js";
import {${Name}Schema as schema, ${Name}QueryString, ${Name}Params } from "../schemas/${name}Schema.js";



export const ${name}Controller: FastifyPluginAsync = async (fastify, opts)=>{
  fastify.get<{Params: ${Name}Params, Querystring: ${Name}QueryString}>('${path.replace(/\{(.*?)}/g, (whole, pName) => ':' + pName)}', schema, async (req, res)=>{
    const {${parameters.filter(isPath).map(getName).join(', ')}} = req.params
    const {${parameters.filter(isQuery).map(getName).join(', ')}} = req.query
      const ratelimit = await auth({ Authorization: req.headers.authorization })
      res.header('X-Ratelimit-Limit', ratelimit.limit)
      res.header('X-Ratelimit-Remain', ratelimit.remain)
      res.header('X-Ratelimit-Reset', ratelimit.reset)
      res.header('X-Ratelimit-Window', ratelimit.window)
    return reflect(req.url)
    return ${name}(${processParams(parameters)})
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
 return await res.json()
}
export async function auth(headers) {
  const ratelimit = await fetch(process.env.AUTH_URL, { headers }).then(r=>r.json())
  logger.info({ratelimit}, 'Fetched ratelimit from auth service')
  return ratelimit
}
        `))
        // write service stub
        await writeFile(resolve(SERVICES_DIR, tag, 'service', name + '.ts'), prettyTs(`
import type { ${Name}Response } from "../schemas/${name}Schema.js";

/**
 * ${summary??''}.
 *
 * ${description??''}.
 */
export async function ${name}(${processParams(parameters, true)}): Promise<${Name}Response>{
  //todo: Write logic for function here, access database, return response  
  return Promise.resolve(null) 
}


`))
        // inject register to index fastify listener
        const index = await readFile(resolve(SERVICES_DIR, tag, 'index.ts')).then(String).then(index => index.replace(`// --- register controllers ---`, marker => `${marker}
fastify.register(${name}Controller)`)).then(index => index.replace(`// --- import controllers ---`, marker => `${marker}
import { ${name}Controller } from '${['.', 'controllers', name + 'Controller.js'].join('/')}'`))
        await writeFile(resolve(SERVICES_DIR, tag, 'index.ts'), prettyTs(index))

        const monolith = await readFile(resolve(SERVICES_DIR, 'monolith.ts')).then(String).then(index => index.replace(`// --- register controllers ---`, marker => `${marker}
fastify.register(${name}Controller)`)).then(index => index.replace(`// --- import controllers ---`, marker => `${marker}
import { ${name}Controller } from '${['.', tag, 'controllers', name + 'Controller.js'].join('/')}'`))
        await writeFile(resolve(SERVICES_DIR, 'monolith.ts'), prettyTs(monolith))


        const caddyfile = await readFile(resolve(SERVICES_DIR, 'Caddyfile')).then(String).then(caddyfile => caddyfile.replace(`# proxy to microservices`, marker => `${marker}
    reverse_proxy ${path.replace(/\{(.*?)}/g, '*')} ${kebabCase(tag)}:3000`))
        await writeFile(resolve(SERVICES_DIR, 'Caddyfile'), caddyfile)
    }
}

// json spec contains response schema
const spec = await readFile(resolve('../spec/apispec.json')).then(String).then(JSON.parse)
// yaml spec is more correct
const Yspec = await readFile(resolve('../spec/openapi.yaml')).then(String).then(YAML.parse)


await createTagDirectories(Yspec.tags)
await createRoutes(Yspec.paths, spec.paths)
// console.log(Object.keys(Yspec.paths).map(p=>`"${p}": [{query: {}, params: {company_number: getCompanyNumber()}}]`).join(',\n\t'))
