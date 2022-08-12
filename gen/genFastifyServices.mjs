import {mkdir, readFile, writeFile} from 'node:fs/promises'
import {resolve} from "path";
import {addCaddyFileEntry, newCaddyFile} from "./files/genCaddyFile.js";
import {camelCase, kebabCase, prettyTs} from "./utils.js";
import {addPathSystemTest, genSystemTest} from "./files/genSystemTest.js";
import YAML from 'yaml'
import {genDockerCompose, genWebServiceDockerfile, genServiceDockerComposeFile} from "./files/genDockerCompose.js";
import {genPrometheusConfig} from "./files/genPrometheus.js";
import {genWebServiceIndexFile, registerFastifyPluginInIndexFile} from "./files/genServiceIndexFiles.js";
import {genWebServicePackageJson} from "./files/genWebServicePackageJson.js";
import {genServiceMonolith} from "./files/genServiceMonolith.js";
import {genLoadBulk} from "./files/genLoadBulk.js";
import {genDatabases} from "./files/genDatabases.js";
import {genUpdater} from "./files/genUpdater.js";
import {generateWebServicePath, genWebService} from "./files/genWebService.js";

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
        await genWebService(SERVICES_DIR, tag)
        await genServiceDockerComposeFile(SERVICES_DIR, tag)
        await genLoadBulk(SERVICES_DIR, tag.name)
        await genDatabases(SERVICES_DIR, tag.name)
        await genUpdater(SERVICES_DIR, tag.name)
        await mkdir(resolve(SERVICES_DIR, tag.name,'webService', 'controllers'), {recursive: true})
        await mkdir(resolve(SERVICES_DIR, tag.name,'webService', 'service'), {recursive: true})
        await mkdir(resolve(SERVICES_DIR, tag.name,'webService', 'schemas'), {recursive: true})
        await mkdir(resolve(SERVICES_DIR, tag.name, 'loadBulk'), { recursive: true })
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
        await generateWebServicePath({path,description,SERVICES_DIR, tag, name,Name,parameters,processParams,isPath,isQuery,getName,responseSchema,summary})
        await registerFastifyPluginInIndexFile(SERVICES_DIR, tag, name, Name)
        const monolith = await readFile(resolve(SERVICES_DIR, 'monolith.ts')).then(String).then(index => index.replace(`// --- register controllers ---`, marker => `${marker}
fastify.register(${name}Controller)`)).then(index => index.replace(`// --- import controllers ---`, marker => `${marker}
import { ${name}Controller } from '${['.', tag, 'webService', 'controllers', name + 'Controller.js'].join('/')}'`))
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
