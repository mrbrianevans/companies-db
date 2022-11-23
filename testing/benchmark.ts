import testUrls from './testUrls.json' assert {type: 'json'}
import {getHeaders, headers} from "./headers.js";
import autocannon from "autocannon";
import {getRandomCompanyNumbers} from "./getRandomCompanyNumbers.js";

// the urls to test. comment out to skip testing a domain
const urls = [
  'http://localhost:3000',
  // 'https://companiesdb.co.uk',
  'https://api.company-information.service.gov.uk'
] as const

// the API keys to use for the respective domains
const keys: Record<typeof urls[number]|string, string> = {
  'http://localhost:3000': process.env.LOCALRESTKEY,
  'https://companiesdb.co.uk': process.env.COMPANIESDBKEY,
  "https://api.company-information.service.gov.uk": process.env.RESTAPIKEY
}

// the URLs to test with. testUrls.json is a local file on my PC, generated with randomly sampled company numbers.
const requests = []
  // .concat(testUrls.getCorporateEntities.map(path=>({path})))
  // .concat(testUrls.getIndividual.map(path=>({path})))
  // .concat(testUrls.getLegalPersons.map(path=>({path})))
  // .concat(testUrls.getSuperSecurePerson.map(path=>({path})))
  // .concat(testUrls.getStatement.map(path=>({path})))
  // .concat(testUrls.getExemptions.map(path=>({path})))
  // .concat(testUrls.listPersonsWithSignificantControl.map(path=>({path})))
  // .concat(testUrls.listStatements.map(path=>({path})))
  .concat(await getRandomCompanyNumbers().then(c=>c.map(n=>({path:`/company/${n}/persons-with-significant-control`}))))
console.log(requests)
for (const url of urls) {
  const results = await autocannon({url, requests, headers:getHeaders(keys[url]), amount: 2, connections: 1})
  console.log('\nFor URL:', url)
  console.log(autocannon.printResult(results))
}

