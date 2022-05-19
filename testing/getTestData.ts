import dotenv from 'dotenv'
import {writeFile} from 'fs/promises'
dotenv.config({path: '../.env'})

// queries companies house api to get data for testing purposes
const apiUrl = 'https://api.company-information.service.gov.uk'
const headers =  {Authorization: 'Basic '+Buffer.from(process.env.RESTAPIKEY+':').toString('base64')}

async function get(path){
 const res = await fetch(apiUrl+path, {headers})
 return await res.json()
}


const companies = await get('/search/companies?q=sky&items_per_page=10')
const companyNumbers = companies.items.map(i=>i.company_number)

// officer IDs
const officerIds = []
const appointmentIds = {}
for (const companyNumber of companyNumbers) {
 const officers = await get(`/company/${companyNumber}/officers`).then(r=>r.items.map(i=>i.links))
 appointmentIds[companyNumber] = officers.map(link=>link.self.match(/\/company\/.*\/appointments\/(.*)/)[1])
 officerIds.push(...officers.map(link=>link.officer.appointments.match(/\/officers\/(.*)\/appointments/)[1]))
}

// filing history transaction IDs
const transactionIds = {}
for (const companyNumber of companyNumbers) {
 const filingHistory = await get(`/company/${companyNumber}/filing-history`).then(r=>r.items.map(i=>i.transaction_id))
 transactionIds[companyNumber] = filingHistory
}

await writeFile('testData.json', JSON.stringify({transactionIds, appointmentIds, officerIds, companyNumbers}))

// charges IDs
const chargeIds = {}
for (const companyNumber of companyNumbers) {
 const charges = await get(`/company/${companyNumber}/charges`).then(r=>r.items?.map(i=>i.links))
 chargeIds[companyNumber] = charges?.map(link=>link.self.match(/\/company\/.*\/charges\/(.*)/)[1])??[]
}

// psc  IDs
const pscIds = {individual: {}, corporate: {}, legal: {}, superSecure: {}}
for (const companyNumber of companyNumbers) {
 const pscs = await get(`/company/${companyNumber}/persons-with-significant-control`).then(r=>r.items?.map(i=>i.links))
 pscIds.individual[companyNumber] = pscs?.map(link=>link.self.match(/\/company\/.*\/persons-with-significant-control\/individual\/(.*)/)?.[1]).filter(s=>s)??[]
 pscIds.legal[companyNumber] = pscs?.map(link=>link.self.match(/\/company\/.*\/persons-with-significant-control\/legal-person\/(.*)/)?.[1]).filter(s=>s)??[]
 pscIds.corporate[companyNumber] = pscs?.map(link=>link.self.match(/\/company\/.*\/persons-with-significant-control\/corporate-entity\/(.*)/)?.[1]).filter(s=>s)??[]
 pscIds.superSecure[companyNumber] = pscs?.map(link=>link.self.match(/\/company\/.*\/persons-with-significant-control\/super-secure\/(.*)/)?.[1]).filter(s=>s)??[]
}

// psc statement IDs
const statementIds = {}
for (const companyNumber of companyNumbers) {
 const statementsResponse = await get(`/company/${companyNumber}/persons-with-significant-control-statements`)
 const statements = ('errors' in statementsResponse ? []:statementsResponse.items).map(i=>i.links)
 statementIds[companyNumber] = statements?.map(link=>link.self.match(/\/company\/.*\/persons-with-significant-control-statements\/(.*)/)?.[1]).filter(s=>s)??[]
}

await writeFile('testData.json', JSON.stringify({transactionIds, appointmentIds, officerIds, companyNumbers, chargeIds, statementIds, pscIds}, null, 2))
