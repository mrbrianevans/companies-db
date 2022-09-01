/*
 * To verify that a database is correct.
 *
 * This can be used after applying a series of update files to a previous bulk file to make sure that the database is correct.
 *
 * The way it works is by looping through the records in a new bulk file, comparing each record to what's in the database.
 */

// find all the officers for a company number in a single operation

import {readdir} from "node:fs/promises";
import {createReadStream} from "fs";
import split2 from "split2";
import {resolve} from "node:path";
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import {pipeline} from "stream/promises";
import {RecordType} from "../shared/recordParser/RecordTypes.js";
import {CompanyStorage} from "../shared/storageTypes/Company.js";
import {OfficerStorage} from "../shared/storageTypes/Officer.js";
import { getMongoClient } from "../shared/dbClients.js";
import assert from "node:assert";

const directory = 'N:\\CompaniesHouse\\officersdata\\Prod195_3243'

const files = await readdir(directory)

for (const file of files) {
  const filepath = resolve(directory, file)
  const fileStream = createReadStream(filepath)
  const parseStream = split2(parseRecord)
  const results = await pipeline(fileStream, parseStream, verifyStream)
  console.log(results)
}

async function verifyStream(source: AsyncIterable<({recordType: RecordType.Company}&CompanyStorage)|({recordType: RecordType.Person}&OfficerStorage)>){
  let officerBuffer:OfficerStorage[] = []
  const mongo = await getMongoClient()
  const officerResults = {missing: 0, additional: 0, correct: 0, unequal: 0}
  const companyResults = {missing: 0, additional: 0, correct: 0, unequal: 0}
  // const int = setInterval(()=>console.log({officerResults, companyResults}), 30000)
  for await (const record of source){
    const {recordType, ...r} = record
    if(recordType === RecordType.Company) {
      // assert company records are equal
      const company = await mongo.db('officers').collection<CompanyStorage>('companies').findOne({company_number: r.company_number}, {projection: {_id: 0}})
      if(!company) companyResults.missing++
      else if(companiesEqual(company, r)) companyResults.correct++
      else companyResults.unequal++
      // load officers into buffer
      officerBuffer = await mongo.db('officers').collection<OfficerStorage>('officers').find({company_number: r.company_number}, {projection: {_id: 0}}).toArray()
    }else if(recordType === RecordType.Person){
      // compare officer record with officers in buffer
      const officer = officerBuffer.find(o=>o.company_number === r.company_number && o.person_number === record.person_number && o.officer_role === record.officer_role && o.appointed_on === record.appointed_on)
      if(!officer) officerResults.missing++
      else if(officersEqual(officer, r)) officerResults.correct++
      else officerResults.unequal++
    }
  }
  // clearInterval(int)
  const dbCompanyCount = await mongo.db('officers').collection('companies').countDocuments()
  const dbOfficerCount = await mongo.db('officers').collection('officers').countDocuments()
  // compare count with result count to find additional records
  officerResults.additional = dbOfficerCount - (officerResults.unequal + officerResults.correct)
  companyResults.additional = dbCompanyCount - (companyResults.unequal + companyResults.correct)
  await mongo.close()
  return {officerResults, companyResults}
}


function officersEqual(o1,o2){
  try{
    assert.deepStrictEqual(o1, o2)
    return true
  }catch (e) {
    if(e instanceof assert.AssertionError){
      return false
    }else throw e
  }
}

function companiesEqual(c1,c2){
  try{
    assert.deepStrictEqual(c1, c2)
    return true
  }catch (e) {
    if(e instanceof assert.AssertionError){
      return false
    }else throw e
  }
}
