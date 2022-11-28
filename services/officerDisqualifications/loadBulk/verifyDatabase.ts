


/*

Verify the accuracy of the contents of the database.

Takes a sample of records from Mongo and calls the official companies house API to check that they are correct.

*/

import {getMongoClient, mongoDbName} from "../shared/dbClients.js"
import * as assert from "node:assert";
import { getEnv } from "../shared/utils.js";
import {detailedDiff, diff} from "deep-object-diff";


const API_URL = 'https://api.company-information.service.gov.uk'
const headers = {
  Authorization:
    'Basic ' + Buffer.from(getEnv('RESTAPIKEY') + ':').toString('base64')
}

await verifyDatabase(299)


async function verifyDatabase(size = 10){
  const mongo = await getMongoClient()
  let matched = 0, failed = 0, unfound = 0
  for await(const record of mongo.db(mongoDbName).collection('getNaturalOfficer').aggregate([{$sample: {size}}])){
    const officialRecord = await findOfficialRecord(record, mongo).then(normaliseDbRecord)
    const {date_of_birth, forename, surname} = record
    if(officialRecord?.date_of_birth !== date_of_birth) {
      unfound++
      continue
    }
    const normalisedRecord = normaliseDbRecord(record)
    const equal = compareRecords(normalisedRecord, officialRecord)
    const difference = diff(normalisedRecord, officialRecord)
    if(difference && !equal){
      failed++
      console.log("Difference in record", JSON.stringify({date_of_birth, forename, surname}))
      // console.log("Record does not match official record. Differences:")
      // console.log(JSON.stringify(record))
      // console.log(JSON.stringify(officialRecord))
      console.log(JSON.stringify(difference))
    }else{
      matched++
    }
  }
  console.log(matched, 'records matched out of', matched + failed, failed, 'failed')
  console.log('did not find', unfound, 'records on official api. skipped validating these')
  console.log('Percentage accurate:', (matched/(matched+failed)*100).toFixed(1))
  await mongo.close()
}

function normaliseDbRecord(record){
  delete record?._id
  delete record?.officer_id
  delete record?.etag
  delete record?.honours
  delete record?.links.self
  for(const d of record?.disqualifications??[]){
    delete d.reason.description_identifier
    d.address.address_line_1 = [d.address.premises,d.address.premise,d.address.address_line_1].filter(d=>d).join(' ')
    delete d.address.premises
    delete d.address.premise
  }
  for(const d of record?.permissions_to_act??[]){
    delete d.court_name
  }
  return JSON.parse(JSON.stringify(record).toLowerCase())
}

function compareRecords(a, b){
  try{
    assert.deepStrictEqual(a, b)
    return true
  }catch (e) {
    if(e instanceof assert.AssertionError){
      return false
    }else throw e
  }

}


async function findOfficialRecord(recordFromMongo, mongo){
  const cached = await mongo.db(mongoDbName).collection('naturalOfficerCache').findOne({_id:recordFromMongo.officer_id})
  if(cached) return cached
  const name = [recordFromMongo.forename, recordFromMongo.other_forenames, recordFromMongo.surname].join(' ')
  const {body:searchResults} = await callApi(`/search/disqualified-officers?q=${name}&items_per_page=3`)
  const bestMatch = searchResults.items?.find(i=>recordFromMongo.date_of_birth === undefined || i.date_of_birth?.startsWith(recordFromMongo.date_of_birth))
  if(!bestMatch) return null
  const {body: disqualificationRecord} = await callApi(bestMatch.links.self)
  if(disqualificationRecord) await mongo.db(mongoDbName).collection('naturalOfficerCache').insertOne({...disqualificationRecord, _id:recordFromMongo.officer_id})
  return disqualificationRecord
}

export interface ApiResponse{
  body: any, status: number,
  statusText: string,
  headers: Headers,
  isJson: boolean,
  duration: number
}

export async function callApi(path: string): Promise<ApiResponse>{
  // console.log("Requesting", path)
  const url = new URL(path, API_URL)
  const startTime = performance.now()
  const res = await fetch(url, {method: 'GET', headers})
  const {headers: responseHeaders, status, statusText} = res
  const isJson = responseHeaders.get('content-type')?.toLowerCase().includes('application/json')??false
  const body = await res.json()
  const duration = performance.now() - startTime
  return {headers: responseHeaders, status, statusText, body, isJson, duration}
}
