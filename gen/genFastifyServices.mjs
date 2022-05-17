import {readFile,mkdir,writeFile} from 'node:fs/promises'
import {resolve} from "path";

// todo:
    // read app-spec.yaml
    // for each tag, create a directory containing: package.json, tsconfig.json, index.ts, service dir, and controllers dir
    // for each path:
        // create a controller, using the parameters for path params and query params. Can just copy {schema}
        // create a service, export an async function with arguments for all the parameters



const SERVICES_DIR = resolve('../services')
console.log({SERVICES_DIR})

async function createTagDirectories(tags){
    for(const tag of tags){
        await mkdir(resolve(SERVICES_DIR, tag.name), {recursive: true})
        await writeFile(resolve(SERVICES_DIR, tag.name, 'package.json'), JSON.stringify({
            "name": tag.name,
            "description": tag.description,
            "type": "module",
            "scripts": {
                "start": "node index | pino-pretty -c -t",
                "build": "tsc -b",
                "watch": "tsc -b -w"
            },
            "version": "1.0.0",
            "dependencies": {
                "fastify": "^3.29.0"
            },
            "devDependencies": {
                "pino-pretty": "^7.6.1",
                "json-schema-to-ts": "^2.4.0"
            }
        }, null, 2))

        const tsconfig = {
            "compilerOptions": {
                "module": "ES2022",
                "target": "ES2021",
                "sourceMap": true,
                "moduleResolution": "node"
            },
            "exclude": [
                "node_modules"
            ]
        }
        await writeFile(resolve(SERVICES_DIR, tag.name, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2))
        await writeFile(resolve(SERVICES_DIR, tag.name, 'index.ts'), `import Fastify from 'fastify'
// --- import controllers ---

const fastify = Fastify({logger: true})

// --- register controllers ---

await fastify.listen(3000)
`)
        await mkdir(resolve(SERVICES_DIR, tag.name, 'controllers'), {recursive: true})
        await mkdir(resolve(SERVICES_DIR, tag.name, 'service'), {recursive: true})
        await mkdir(resolve(SERVICES_DIR, tag.name, 'schemas'), {recursive: true})
    }
}
function camelCase(input){
    return input.trim().replaceAll(/\s(\w)(\w*)/g, (all, letter, rest)=>{
        return letter.toUpperCase() + rest
    })
}
const types = new Map()
types.set('integer', "number")
function processParams(params, includeTypes = false, sep = ', ', docs = false){
    function getType(param){
        return `${param.required?':':'?:'} ${types.get(param.schema.type) ?? param.schema.type}`
    }
    return params.sort((a,b)=>(a.required === b.required)? 0 : a.required? -1 : 1).map(p=>(docs ? `/** ${p.description} */\n`:'')+`${p.name??p.title}${includeTypes ? getType(p):''}`).join(sep)
}
const isPath = p=>(p.paramType??p.in) === 'path'
const isQuery = p=>(p.paramType??p.in) === 'query'
async function createRoutes(paths, responsePaths){
    for (const path in paths) {
        const {get: {parameters, ['x-operationName']: operationName, tags: [tag], summary, description }} = paths[path]
        const responsePath = path.replace('company_number','companyNumber')
        const {get: {responses}} = responsePaths[responsePath] ?? responsePaths[path] // these are sometimes different
        const op = camelCase(operationName ?? 'get')
        const name = op === 'list' || op === 'get' ? camelCase(op + ' ' + tag) : op, Name = name
        if(responses?.[200]?.schema) responses[200].schema.type = 'object'
        await writeFile(resolve(SERVICES_DIR, tag, 'schemas', Name + 'Schema.ts'), `
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
                properties: Object.fromEntries(parameters.filter(isPath).map(({name, schema}) => [name, schema])),
                required: parameters.filter(isPath).filter(p => p.required).map(({name}) => name)
            },
            querystring: {
                type: 'object',
                properties: Object.fromEntries(parameters.filter(isQuery).map(({title, schema}) => [title, schema])),
                required: parameters.filter(isQuery).filter(p => p.required).map(({title}) => title)
            },
            response: {200: responses[200].schema}
        }, null, 2)}
} as const

export type ${Name}Response = FromSchema<typeof ${Name}Schema['schema']['response']['200']>
        
        `)
        await writeFile(resolve(SERVICES_DIR, tag, 'controllers', name + 'Controller.ts'), `
import {FastifyPluginAsync} from "fastify";
import {${name}} from "../service/${name}.js";
import {${Name}Schema as schema, ${Name}QueryString, ${Name}Params } from "../schemas/${Name}Schema.js";



export const ${name}Controller: FastifyPluginAsync = async (fastify, opts)=>{
  fastify.get<{Params: ${Name}Params, Querystring: ${Name}QueryString}>('${path.replace(/\{(.*?)}/g, (whole, pName) => ':' + pName)}', schema, (req, res)=>{
    const {${parameters.filter(isPath).map(p => p.name).join(', ')}} = req.params
    const {${parameters.filter(isQuery).map(p => p.title).join(', ')}} = req.query
    return ${name}(${processParams(parameters)})
  })
}

        `)
function convertSchemaToTypedef(){

}
        // write service stub
        await writeFile(resolve(SERVICES_DIR, tag, 'service', name + '.ts'), `
import type { ${Name}Response } from "../schemas/${Name}Schema.js";

/**
 * ${summary??''}.
 *
 * ${description??''}.
 */
export async function ${name}(${processParams(parameters, true)}): Promise<${Name}Response>{
  //todo: Write logic for function here, access database, return response  
  return Promise.resolve(null) 
}


`)
        // inject register to index fastify listener
        const index = await readFile(resolve(SERVICES_DIR, tag, 'index.ts')).then(String).then(index=>index.replace(`// --- register controllers ---`, marker => `${marker}
fastify.register(${name}Controller)`)).then(index=>index.replace(`// --- import controllers ---`, marker => `${marker}
import { ${name}Controller } from '${['.','controllers', name + 'Controller.js'].join('/')}'`))
        await writeFile(resolve(SERVICES_DIR, tag, 'index.ts'), index)
        //todo: generate interface for return type in service
    }
}

// json spec contains response schema
const spec = await readFile(resolve('../spec/apispec.json')).then(String).then(JSON.parse)
// yaml spec is more correct
const Yspec = await readFile(resolve('../spec/openapi.yaml')).then(String).then(YAML.parse)


await createTagDirectories(Yspec.tags)
await createRoutes(Yspec.paths, spec.paths)
