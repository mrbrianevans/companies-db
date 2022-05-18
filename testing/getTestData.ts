import dotenv from 'dotenv'
import autocannon from "autocannon";
import {writeFile} from 'fs/promises'
dotenv.config({path: '../.env'})

// queries companies house api to get data for testing purposes
const apiUrl = 'https://api.company-information.service.gov.uk'
const headers =  {Authorization: 'Basic '+Buffer.from(process.env.RESTAPIKEY+':').toString('base64')}

async function get(path){
 const res = await fetch(apiUrl+path, {headers})
 return await res.json()
}


const companies = await get('/search/companies?q=ltd&items_per_page=10')
const companyNumbers = companies.items.map(i=>i.company_number)
console.log({companyNumbers})
// officer IDs
const officerIds = []
const appointmentIds = {}
for (const companyNumber of companyNumbers) {
 const officers = await get(`/company/${companyNumber}/officers`).then(r=>r.items.map(i=>i.links))
 appointmentIds[companyNumber] = officers.map(link=>link.self.match(/\/company\/.*\/appointments\/(.*)/)[1])
 officerIds.push(...officers.map(link=>link.officer.appointments.match(/\/officers\/(.*)\/appointments/)[1]))
}
console.log({officerIds})
console.log({appointmentIds})

// filing history IDs
const filingHistoryIds = {}
for (const companyNumber of companyNumbers) {
 const filingHistory = await get(`/company/${companyNumber}/filing-history`).then(r=>r.items.map(i=>i.transaction_id))
 filingHistoryIds[companyNumber] = filingHistory
}
console.log({filingHistoryIds})

await writeFile('testData.json', JSON.stringify({filingHistoryIds, appointmentIds, officerIds, companyNumbers}))

