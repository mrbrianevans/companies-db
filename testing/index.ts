import testData from './testData.json' assert { type: 'json' }
import autocannon from "autocannon";
import dotenv from 'dotenv'
import {getCompanyProfileRequests} from "./companyProfile.js";
import {baseUrl} from "./url";
import {headers} from "./headers";
dotenv.config({path: '../.env'})


const requests = getCompanyProfileRequests(testData)
const results = await autocannon({url: baseUrl , headers, amount: 200, requests })

console.log(autocannon.printResult(results))
console.log(results)



const getCompanyNumber = () => '12763564'

const testingTable: {[key: string]: {query: {[key: string]: string}, params: {[key: string]: string}}[]} = {
  "/company/{company_number}/registered-office-address": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/search": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/search/companies": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/search/officers": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/search/disqualified-officers": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/dissolved-search/companies": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/alphabetic-search/companies": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/advanced-search/companies": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/officers": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/appointments/{appointment_id}": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/registers": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/filing-history/{transaction_id}": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/filing-history": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/exemptions": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/disqualified-officers/natural/{officer_id}": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/disqualified-officers/corporate/{officer_id}": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/officers/{officer_id}/appointments": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/charges": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/charges/{charge_id}": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/insolvency": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/uk-establishments": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/persons-with-significant-control": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/persons-with-significant-control/individual/{psc_id}": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/persons-with-significant-control/corporate-entity/{psc_id}": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/persons-with-significant-control/legal-person/{psc_id}": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/persons-with-significant-control-statements": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/persons-with-significant-control-statements/{statement_id}": [{query: {}, params: {company_number: getCompanyNumber()}}],
  "/company/{company_number}/persons-with-significant-control/super-secure/{super_secure_id}": [{query: {}, params: {company_number: getCompanyNumber()}}]
}

// for (const [path, data] of Object.entries(testingTable)) {
//   for (const {query, params} of data) {
//     const url = new URL(baseUrl+path.replace(/\{(.*?)}/g, (all, key)=>params[key]))
//     for(const [queryKey,queryValue] of Object.entries(query)){
//       url.searchParams.set(queryKey, queryValue)
//     }
//     console.log(url.toString())
//     const results = await autocannon({url: url.toString() , amount: 10, requests: [{}] })
//     console.log(results.url, '500 errors:',results["5XX"], '400 errors:',results['4XX'])
//   }
// }

