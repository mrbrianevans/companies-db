import {MongoClient} from "mongodb";
import {Crawler} from "./Crawler.js";
import JsonToTS from "json-to-ts";
import {createCompoundSchema} from "genson-js";
import {readFile, writeFile} from "fs/promises";
import {resolve} from "path";
import Ajv from "ajv";
import * as YAML from 'yaml'
import {mergeSchemas} from "genson-js";

const db = new MongoClient('mongodb://localhost:27017')
await db.connect()

const cols = await db.db('responses').listCollections().toArray()
console.log(cols.map(col=>col.name))

const crawler = new Crawler(db.db('responses'))
// await crawler.listenOnWebsocket()
// await crawler.crawl()
// await crawler.crawlDisqualifiedOfficers()
// await crawler.crawlPscStatements()
// await crawler.crawlPsc()
// await crawler.crawlSearchCompanies()
// await crawler.crawlSearchOfficers()
// await crawler.crawlRegisteredOfficeAddress()
// await crawler.crawlOfficers()
// await crawler.crawlThroughCompaniesLinks()
// await crawler.crawlExemptions()
// await crawler.crawlFilingHistory()
// await crawler.crawlCharges()

const paths = [
  {collection: 'charges', operation: 'listCharge', endpoint: '/company/{company_number}/charges'},
  {collection: 'chargesItem', operation: 'getCharge', endpoint: '/company/{company_number}/charges/{charge_id}'},
  {collection: 'company', operation: 'getCompanyProfile', endpoint: '/company/{company_number}'},
  {collection: 'exemptions', operation: 'getExemptions', endpoint: '/company/{company_number}/exemptions'},
  {collection: 'filingHistory', operation: 'listFilingHistory', endpoint: '/company/{company_number}/filing-history'},
  {collection: 'filingHistoryItem', operation: 'filingHistoryItem', endpoint: '/company/{company_number}/filing-history/{transaction_id}'},
  {collection: 'insolvency', operation: 'getInsolvency', endpoint: '/company/{company_number}/insolvency'},
  {collection: 'appointments', operation: 'listOfficerAppointments', endpoint: '/officers/{officer_id}/appointments'},
  {collection: "disqualifiedOfficersNatural", operation: "getDisqualifiedOfficersNatural", endpoint: '/disqualified-officers/natural/{officer_id}'},
  {collection: "disqualifiedOfficersCorporate", operation: "getDisqualifiedOfficersCorporate", endpoint: '/disqualified-officers/corporate/{officer_id}'},
  {collection: 'officers', operation: 'listCompanyOfficers', endpoint: '/company/{company_number}/officers'},
  {collection: 'officersItem', operation: 'getCompanyAppointment', endpoint: '/company/{company_number}/appointments/{appointment_id}'},
  {collection: 'personsWithSignificantControl', operation: 'listPersonsWithSignificantControl', endpoint: '/company/{company_number}/persons-with-significant-control'},
  {collection: 'pscIndividual', operation: 'getPersonWithSignificantControlIndividual', endpoint: '/company/{company_number}/persons-with-significant-control/individual/{psc_id}'},
  {collection: 'pscCorporate', operation: 'getPersonWithSignificantControlCorporate', endpoint: '/company/{company_number}/persons-with-significant-control/corporate-entity/{psc_id}'},
  {collection: 'pscLegal', operation: 'getPersonWithSignificantControlLegal', endpoint: '/company/{company_number}/persons-with-significant-control/legal-person/{psc_id}'},
  {collection: 'personsWithSignificantControlStatements', operation: 'listPersonsWithSignificantControlStatements', endpoint: '/company/{company_number}/persons-with-significant-control-statements'},
  {collection: 'personsWithSignificantControlStatementsItem', operation: 'getPersonsWithSignificantControlStatement', endpoint: '/company/{company_number}/persons-with-significant-control-statements/{statement_id}'},
  {collection: 'pscSuperSecure', operation: 'getPersonsWithSignificantControlSuperSecure', endpoint: '/company/{company_number}/persons-with-significant-control/super-secure/{super_secure_id}'},
  {collection: 'registeredOfficeAddress', operation: 'getRegisteredOfficeAddress', endpoint: '/company/{company_number}/registered-office-address'},
  {collection: 'registers', operation: 'getCompanyRegister', endpoint: '/company/{company_number}/registers'},
  {collection: 'searchCompanies', operation: 'searchCompanies', endpoint: '/search/companies'},
  {collection: 'searchOfficers', operation: 'searchOfficers', endpoint: '/search/officers'},
  {collection: 'searchAll', operation: 'searchAll', endpoint: '/search'},
  {collection: 'searchDisqualifiedOfficers', operation: 'searchDisqualifiedOfficers', endpoint: '/search/disqualified-officers'},
  {collection: 'searchDissolved', operation: 'searchDissolved', endpoint: '/dissolved-search/companies'},
  // todo: /advanced-search/companies, /alphabetic-search/companies
  {collection: 'ukEstablishments', operation: 'listUkEstablishments', endpoint: '/company/{company_number}/uk-establishments'},
]


for (const path of paths) {
  const {operation, endpoint} = path
  generate: try {
    const docs = await db.db('responses').collection(path.collection).aggregate([{$sample:{size:10000}}]).map(d => {
      delete d._id
      return d
    }).toArray()
// generate TypeScript defs
//     const typeDefs = JsonToTS(docs, {rootName: operation})
//     await writeFile(resolve(`./types/${operation}TypeDefs.ts`), typeDefs.join('\n\n'))

// generate JSON schema
    const schema = createCompoundSchema(docs)
    // mergeSchemas([schema]) // merge with their spec to get documentation
    Object.assign(schema, {additionalProperties: false, title: operation, example: docs[0]})
// update openapi.yaml
    const openapi = await readFile(resolve('../spec/openapi.yaml')).then(String).then(YAML.parse)
    openapi.paths[endpoint].get.responses[200].content['application/json'].schema = schema
    await writeFile(resolve('../spec/openapi.yaml'), YAML.stringify(openapi))
    Object.assign(schema, {'$schema': "http://json-schema.org/draft-07/schema#", example: undefined})
    await writeFile(resolve(`./schemas/${operation}JsonSchema.json`), JSON.stringify(schema, null, 2))
  }catch (e){
    console.log("Failed to generate", path)
  }

//check documents pass validation
  test: {
//     const docs = await db.db('responses').collection(path.collection).find()
//     const schemaFromFile = await readFile(resolve(`./schemas/${operation}JsonSchema.json`)).then(String).then(JSON.parse)
//     const ajv = new Ajv()
//     const validate = ajv.compile(schemaFromFile)
//     for await(const doc of docs) {
//       const {_id} = doc
//       delete doc._id
//       const valid = validate(doc)
//       if (!valid) console.log(_id, "Invalid:", validate.errors?.map(e=>e.message)?.join(', '))
//     }
  }
}
await db.close()
