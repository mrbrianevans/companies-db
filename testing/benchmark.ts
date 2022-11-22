import testUrls from './testUrls.json' assert {type: 'json'}
import {getHeaders, headers} from "./headers.js";
import autocannon from "autocannon";
import {setTimeout} from "timers/promises";

const url1 = 'https://companiesdb.co.uk'
const url2 = 'https://api.company-information.service.gov.uk'
const urls = [url1,url2] as const

const keys: Record<typeof urls[number]|string, string> = {
  'https://companiesdb.co.uk': process.env.COMPANIESDBKEY,
  "https://api.company-information.service.gov.uk": process.env.RESTAPIKEY
}

const requests = testUrls.getCorporateEntities.map(path=>({path}))
  .concat(testUrls.getIndividual.map(path=>({path})))
  .concat(testUrls.getLegalPersons.map(path=>({path})))
  .concat(testUrls.getSuperSecurePerson.map(path=>({path})))
  // .concat(testUrls.getStatement.map(path=>({path})))
  // .concat(testUrls.getExemptions.map(path=>({path})))
  // .concat(testUrls.listPersonsWithSignificantControl.map(path=>({path})))
  // .concat(testUrls.listStatements.map(path=>({path})))
// call each API 500 times

for (const url of urls) {
  // await setTimeout(300_000)
  const results = await autocannon({url, requests, headers:getHeaders(keys[url]), amount: 200, connections: 1})
  console.log('\nFor URL:', url)
  console.log(autocannon.printResult(results))
}
/*
Tested on 30 May 2022, with my own server backed by mongo running on localhost:3000.
The mongo database only had a few megabytes of data in it, very few documents, but it cached the ones being tested.

For URL: localhost:3000
┌─────────┬───────┬───────┬───────┬───────┬──────────┬──────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev    │ Max    │
├─────────┼───────┼───────┼───────┼───────┼──────────┼──────────┼────────┤
│ Latency │ 22 ms │ 31 ms │ 46 ms │ 89 ms │ 32.18 ms │ 11.66 ms │ 152 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴──────────┴────────┘


For URL: https://api.company-information.service.gov.uk
┌─────────┬───────┬───────┬────────┬────────┬──────────┬──────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5%  │ 99%    │ Avg      │ Stdev    │ Max    │
├─────────┼───────┼───────┼────────┼────────┼──────────┼──────────┼────────┤
│ Latency │ 22 ms │ 30 ms │ 102 ms │ 138 ms │ 36.28 ms │ 20.54 ms │ 199 ms │
└─────────┴───────┴───────┴────────┴────────┴──────────┴──────────┴────────┘


 */
