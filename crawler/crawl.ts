import {MongoClient} from "mongodb";
import {Crawler} from "./Crawler.js";
import JsonToTS from "json-to-ts";
import {createCompoundSchema} from "genson-js";
import {readFile, writeFile} from "fs/promises";
import {resolve} from "path";
import Ajv from "ajv";
import * as YAML from 'yaml'
import {mergeSchemas} from "genson-js";
import {Schema} from "genson-js";
import {ValueType} from "genson-js";

const db = new MongoClient('mongodb://localhost:27017')
await db.connect()

const cols = await db.db('responses').listCollections().toArray()
console.log(cols.map(col=>col.name))

const crawler = new Crawler(db.db('responses'))
// await crawler.crawl()
// await crawler.crawlDisqualifiedOfficers()
// await crawler.crawlPscStatements()
// await crawler.crawlPsc()
// await crawler.crawlSearchCompanies()
// await crawler.crawlSearchOfficers()
// await crawler.crawlSearchAdvanced()
await crawler.listenOnWebsocket()
// await crawler.crawlRegisteredOfficeAddress()
// await crawler.crawlOfficers()
// await crawler.crawlThroughCompaniesLinks()
// await crawler.crawlExemptions()
// await crawler.crawlFilingHistory()
// await crawler.crawlCharges()

const oldPaths = [
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


const paths = [
  {
    operation: 'getCharges',
    endpoint: '/company/{company_number}/charges/{charge_id}',
    collection: 'chargesItem'
  },
  {
    operation: 'listCharges',
    endpoint: '/company/{company_number}/charges',
    collection: 'charges'
  },
  {
    operation: 'getCompanyProfile',
    endpoint: '/company/{company_number}',
    collection: 'company'
  },
  {
    operation: 'getExemptions',
    endpoint: '/company/{company_number}/exemptions',
    collection: 'exemptions'
  },
  {
    operation: 'getFilingHistory',
    endpoint: '/company/{company_number}/filing-history/{transaction_id}',
    collection: 'filingHistoryItem'
  },
  {
    operation: 'listFilingHistory',
    endpoint: '/company/{company_number}/filing-history',
    collection: 'filingHistory'
  },
  {
    operation: 'getInsolvency',
    endpoint: '/company/{company_number}/insolvency',
    collection: 'insolvency'
  },
  {
    operation: 'getOfficers',
    endpoint: '/company/{company_number}/appointments/{appointment_id}',
    collection: 'officersItem'
  },
  {
    operation: 'getNaturalOfficer',
    endpoint: '/disqualified-officers/natural/{officer_id}',
    collection: 'disqualifiedOfficersNatural'
  },
  {
    operation: 'getCorporateOfficer',
    endpoint: '/disqualified-officers/corporate/{officer_id}',
    collection: 'disqualifiedOfficersCorporate'
  },
  {
    operation: 'listOfficers',
    endpoint: '/company/{company_number}/officers',
    collection: 'officers'
  },
  {
    operation: 'listOfficerAppointments',
    endpoint: '/officers/{officer_id}/appointments',
    collection: 'appointments'
  },
  {
    operation: 'getIndividual',
    endpoint: '/company/{company_number}/persons-with-significant-control/individual/{psc_id}',
    collection: 'pscIndividual'
  },
  {
    operation: 'getCorporateEntities',
    endpoint: '/company/{company_number}/persons-with-significant-control/corporate-entity/{psc_id}',
    collection: 'pscCorporate'
  },
  {
    operation: 'getLegalPersons',
    endpoint: '/company/{company_number}/persons-with-significant-control/legal-person/{psc_id}',
    collection: 'pscLegal'
  },
  {
    operation: 'getStatement',
    endpoint: '/company/{company_number}/persons-with-significant-control-statements/{statement_id}',
    collection: 'personsWithSignificantControlStatementsItem'
  },
  {
    operation: 'getSuperSecurePerson',
    endpoint: '/company/{company_number}/persons-with-significant-control/super-secure/{super_secure_id}',
    collection: 'pscSuperSecure'
  },
  {
    operation: 'listPersonsWithSignificantControl',
    endpoint: '/company/{company_number}/persons-with-significant-control',
    collection: 'personsWithSignificantControl'
  },
  {
    operation: 'listStatements',
    endpoint: '/company/{company_number}/persons-with-significant-control-statements',
    collection: 'personsWithSignificantControlStatements'
  },
  {
    operation: 'getRegisteredOfficeAddress',
    endpoint: '/company/{company_number}/registered-office-address',
    collection: 'registeredOfficeAddress'
  },
  {
    operation: 'getRegisters',
    endpoint: '/company/{company_number}/registers',
    collection: 'registers'
  },
  {
    operation: 'advancedCompanySearch',
    endpoint: '/advanced-search/companies',
    collection: 'advancedCompanySearch'
  },
  {
    operation: 'searchAll',
    endpoint: '/search',
    collection: 'searchAll'
  },
  {
    operation: 'searchCompanies',
    endpoint: '/search/companies',
    collection: 'searchCompanies'
  },
  {
    operation: 'searchOfficers',
    endpoint: '/search/officers',
    collection: 'searchOfficers'
  },
  {
    operation: 'searchDisqualifiedOfficers',
    endpoint: '/search/disqualified-officers',
    collection: 'searchDisqualifiedOfficers'
  },
  {
    operation: 'searchDissolvedCompanies',
    endpoint: '/dissolved-search/companies',
    collection: 'searchDissolved'
  },
  {
    operation: 'searchCompaniesAlphabetically',
    endpoint: '/alphabetical-search/companies',
    collection: 'searchCompaniesAlphabetically'
  },
  {
    operation: 'getUKEstablishments',
    endpoint: '/company/{company_number}/uk-establishments',
    collection: 'ukEstablishments'
  }
]


// generate test URLs
async function generateTestUrls(qty = 100) {
  const testUrls = {}
  for (const path of paths) {
    const {operation} = path
    const urls = await db.db('responses').collection(path.collection).aggregate([{$sample: {size: qty}}]).map(d=>d._id).toArray()
    testUrls[operation] = urls
  }
  await writeFile(resolve('testUrls.json'), JSON.stringify(testUrls, null, 1))
}

async function generateSchemas(typedefs = false, schemas = false){
  for (const path of paths) {
    const {operation, endpoint} = path
    generate: try {
      const docs = await db.db('responses').collection(path.collection).aggregate([{$sample: {size: 10000}}]).map(d => {
        delete d._id
        return d
      }).toArray()
// generate TypeScript defs
      if(typedefs) {
        const typeDefs = JsonToTS(docs.slice(0,500), {rootName: operation})
        await writeFile(resolve(`./types/${operation}TypeDefs.ts`), typeDefs.join('\n\n'))
      }
// generate JSON schema
      if(schemas) {
        const schema = createCompoundSchema(docs)
        //todo: merge with their spec to get documentation
        const responsePath = endpoint.replace('company_number', 'companyNumber')
        const officialSchema: Schema = await readFile(resolve('../spec/apispec.json')).then(String).then(JSON.parse).then(spec=>(spec.paths[endpoint]??spec.paths[responsePath]).get.responses[200].schema)
        flattenItemsRecursive(officialSchema)
        // console.log(officialSchema.type, schema.type)
        const combinedSchema = mergeSchemas([schema, officialSchema])
        Object.assign(combinedSchema, {additionalProperties: false, title: operation, example: docs[0]})
// update openapi.yaml
        const openapi = await readFile(resolve('../spec/openapi.yaml')).then(String).then(YAML.parse)
        openapi.paths[endpoint].get.responses[200].content['application/json'].schema = combinedSchema
        await writeFile(resolve('../spec/openapi.yaml'), YAML.stringify(openapi))
        Object.assign(combinedSchema, {'$schema': "http://json-schema.org/draft-07/schema#", example: undefined})
        await writeFile(resolve(`./schemas/${operation}JsonSchema.json`), JSON.stringify(combinedSchema, null, 2))
      }
    } catch (e) {
      console.log("Failed to generate", path,e)
    }
  }
}

//check documents pass validation
async function testValidation(){
for (const path of paths) {
  const {operation} = path
  test: {
    const docs = await db.db('responses').collection(path.collection).find()
    const schemaFromFile = await readFile(resolve(`./schemas/${operation}JsonSchema.json`)).then(String).then(JSON.parse)
    const ajv = new Ajv()
    const validate = ajv.compile(schemaFromFile)
    for await(const doc of docs) {
      const {_id} = doc
      delete doc._id
      const valid = validate(doc)
      if (!valid) console.log(_id, "Invalid:", validate.errors?.map(e=>e.message)?.join(', '))
    }
  }
}
}

await generateTestUrls(20)
await generateSchemas(true, true)
// await testValidation()


await db.close()



function flattenItemsRecursive(schema, skip?:string) {
  const isObject = obj => obj !== null && typeof obj === 'object';
  if (!isObject(schema)) return
  else if ('properties' in schema) {
    schema.type = ValueType.Object
    for (const property in schema.properties) {
      if (isObject(schema.properties[property])) {
        flattenItemsRecursive(schema.properties[property], property)
      }
    }
  }
  else if ('items' in schema) {
    if ((schema.items.title !== skip && skip !== 'items') || !('title' in schema.items)) {
      schema.type = ValueType.Object
      for (const item in schema.items) {
        schema[item] = schema.items[item]
      }
      delete schema.items
      flattenItemsRecursive(schema)
    }else{
      schema.type = ValueType.Array
      flattenItemsRecursive(schema.items)
    }
  }
}
