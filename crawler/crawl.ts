import {MongoClient} from "mongodb";
import {Crawler} from "./Crawler.js";
import JsonToTS from "json-to-ts";
import {createCompoundSchema} from "genson-js";
import {readFile, writeFile} from "fs/promises";
import {resolve} from "path";
import Ajv from "ajv";
import * as YAML from 'yaml'

const db = new MongoClient('mongodb://localhost:27017')
await db.connect()

const cols = await db.db('responses').listCollections().toArray()
console.log(cols.map(col=>col.name))

const crawler = new Crawler(db.db('responses'))
await crawler.listenOnWebsocket()
// await crawler.crawl()
// await crawler.crawlOfficers()
// await crawler.crawlFilingHistory()
// await crawler.crawlCharges()

const paths = [
  {collection: 'personsWithSignificantControl', operation: 'listPersonsWithSignificantControl', endpoint: '/company/{company_number}/persons-with-significant-control'},
  {collection: 'appointments', operation: 'listOfficerAppointments', endpoint: '/officers/{officer_id}/appointments'},
  {collection: 'officers', operation: 'listCompanyOfficers', endpoint: '/company/{company_number}/officers'},
  {collection: 'officersItem', operation: 'getCompanyAppointment', endpoint: '/company/{company_number}/appointments/{appointment_id}'},
  {collection: 'filingHistory', operation: 'listFilingHistory', endpoint: '/company/{company_number}/filing-history'},
  {collection: 'filingHistoryItem', operation: 'filingHistoryItem', endpoint: '/company/{company_number}/filing-history/{transaction_id}'},
  {collection: 'company', operation: 'getCompanyProfile', endpoint: '/company/{company_number}'},
  {collection: 'ukEstablishments', operation: 'listUkEstablishments', endpoint: '/company/{company_number}/uk-establishments'},
  {collection: 'registers', operation: 'getCompanyRegister', endpoint: '/company/{company_number}/registers'},
  {collection: 'charges', operation: 'listCharge', endpoint: '/company/{company_number}/charges'},
  {collection: 'chargesItem', operation: 'getCharge', endpoint: '/company/{company_number}/charges/{charge_id}'},
]


for (const path of paths) {
  const docs = await db.db('responses').collection(path.collection).aggregate([{$sample:{size:5000}}]).map(d => {
    delete d._id
    return d
  }).toArray()
  const {operation, endpoint} = path
  generate: {
// generate TypeScript defs
//     const typeDefs = JsonToTS(docs, {rootName: operation})
//     await writeFile(resolve(`./types/${operation}TypeDefs.ts`), typeDefs.join('\n\n'))

// generate JSON schema
    const schema = createCompoundSchema(docs)
    Object.assign(schema, {additionalProperties: false, title: operation})
// update openapi.yaml
    const openapi = await readFile(resolve('../spec/openapi.yaml')).then(String).then(YAML.parse)
    openapi.paths[endpoint].get.responses[200].content['application/json'].schema = schema
    await writeFile(resolve('../spec/openapi.yaml'), YAML.stringify(openapi))
    Object.assign(schema, {'$schema': "http://json-schema.org/draft-07/schema#"})
    await writeFile(resolve(`./schemas/${operation}JsonSchema.json`), JSON.stringify(schema, null, 2))
  }

  test: {
// check documents pass validation
    const schemaFromFile = await readFile(resolve(`./schemas/${operation}JsonSchema.json`)).then(String).then(JSON.parse)
    const ajv = new Ajv()
    const validate = ajv.compile(schemaFromFile)
    for (const doc of docs) {
      const valid = validate(doc)
      if (!valid) console.log(path, "Invalid:", validate.errors)
    }
  }
}
await db.close()
