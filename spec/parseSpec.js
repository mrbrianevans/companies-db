import RefParser from '@apidevtools/json-schema-ref-parser';
import {writeFile} from 'fs/promises'
import {startServer} from "./proxy-ch.js";

const server = await startServer() // proxy server to resolve JSON refs

const parser = new RefParser()

const spec = await parser.dereference('https://developer-specs.company-information.service.gov.uk/api.ch.gov.uk-specifications/swagger-2.0/spec/swagger.json')

await writeFile('./apispec.json', JSON.stringify(spec))

server.close()
