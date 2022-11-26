


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

await verifyDatabase(2)


async function verifyDatabase(size = 10){
  const mongo = await getMongoClient()
  let matched = 0
  for await(const record of mongo.db(mongoDbName).collection('getNaturalOfficer').aggregate([{$sample: {size}}])){
    const officialRecord = await findOfficialRecord(record)
    const equal = compareRecords(record, officialRecord)
    if(!equal){
      const difference = detailedDiff(record, officialRecord)
      //@ts-ignore
      delete difference.deleted._id
      //@ts-ignore
      delete difference.deleted.officer_id
      //@ts-ignore
      delete difference.updated.etag
      //@ts-ignore
      delete difference.updated.links.self

      console.log("Record does not match official record. Differences:")
      console.log(JSON.stringify(record))
      console.log(JSON.stringify(officialRecord))
      // console.log(difference)
    }else{
      matched++
    }
  }
  console.log(matched, 'records matched')
  await mongo.close()
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


async function findOfficialRecord(recordFromMongo){
  const name = [recordFromMongo.forename, recordFromMongo.other_names, recordFromMongo.surname].join(' ')
  const {body:searchResults} = await callApi(`/search/disqualified-officers?q=${name}`)
  const bestMatch = searchResults.items?.[0]
  if(!bestMatch) return null
  const {body: disqualificationRecord} = await callApi(bestMatch.links.self)
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
  console.log("Requesting", path)
  const url = new URL(path, API_URL)
  const startTime = performance.now()
  const res = await fetch(url, {method: 'GET', headers})
  const {headers: responseHeaders, status, statusText} = res
  const isJson = responseHeaders.get('content-type')?.toLowerCase().includes('application/json')??false
  const body = await res.json()
  const duration = performance.now() - startTime
  return {headers: responseHeaders, status, statusText, body, isJson, duration}
}
