import {createReadStream} from "fs";
import split2 from 'split2'
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import {writeMongo, writeMongoCustom} from "../shared/bulkWriteMongo.js";
import { OfficerBulkFileRecordWithRecordType } from '../shared/recordParser/FileRecordTypes.js';
import {setProductionDate} from "../shared/lock/productionDate.js";
import {RecordType} from "../shared/recordParser/RecordTypes.js";
import {parentPort} from "worker_threads";
import {pipeline} from "stream/promises";
import assert from "node:assert";

const DB_NAME = 'officers', COMPANY_COLLECTION = 'companies', OFFICER_COLLECTION = 'officers';

const filepath = process.argv[2] // path to data file (required)
if(!filepath) throw new Error('Filepath not specified. Please provide argv.2 as the path to data file.')

const ac = new AbortController()
const {signal} = ac
parentPort?.on('message', (msg)=> {
  if(msg === 'abort') ac.abort()
}) // allow parent thread to abort operation

console.time('Process file')
const fileStream = createReadStream(filepath)
const parseStream = split2(parseRecord)
const insertStream = writeMongoCustom('recordType', [
  {collection: COMPANY_COLLECTION, value: RecordType.Company, mapper: val => ({insertOne: {document: val}})},
  {collection: OFFICER_COLLECTION, value: RecordType.Person, mapper: val => ({insertOne: {document: val}})}], DB_NAME, processHeaderAndTrailer)
let expectedCount: number|null = null // this closure could be replaced by accessing customReturnValues
const {counter,stats, customReturnValues} = await pipeline(fileStream, parseStream, insertStream, {signal})
await new Promise(resolve=>fileStream.close(resolve))

console.timeEnd('Process file')
console.log('Trailer', 'Expected:',expectedCount, 'Actual count:', counter)
assert.equal(expectedCount, counter, 'Did not process the expected record count from trailer.')

const headerRecord = customReturnValues.find(r=>r?.recordType === RecordType.Header)
if(headerRecord && headerRecord.recordType === RecordType.Header)
  await setProductionDate(headerRecord.productionDate)
else throw new Error("Didn't get header record in update file, can't update redis productionDate")

parentPort?.postMessage({counter,stats, headerRecord})

async function processHeaderAndTrailer(record: OfficerBulkFileRecordWithRecordType){
  if(record.recordType === RecordType.Header){
    const {day, month, year} = record['Production Date']
    return {
      recordType: RecordType.Header,
      productionDate: {day: parseInt(day), month: parseInt(month), year: parseInt(year)},
      run: record["Run Number"]
    }
  }else if(record.recordType === RecordType.Trailer){
    expectedCount = record["Record Count"]
    return record
  }
}
