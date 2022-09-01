import {createReadStream} from "fs";
import split2 from 'split2'
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import {writeMongo} from "../shared/bulkWriteMongo.js";
import {RecordType} from "../shared/recordParser/RecordTypes.js";
import {parentPort} from "worker_threads";
import {pipeline} from "stream/promises";
import assert from "node:assert";

const DB_NAME = 'officers', COMPANY_COLLECTION = 'companies', OFFICER_COLLECTION = 'officers';

const filepath = process.argv[2] // path to data file (required)
if(!filepath) throw new Error('Filepath not specified. Please provide argv.2 as the path to data file.')

console.time('Process file')
const fileStream = createReadStream(filepath)
const parseStream = split2(parseRecord)
const insertStream = writeMongo('recordType', [
  {collection: COMPANY_COLLECTION, value: RecordType.Company},
  {collection: OFFICER_COLLECTION, value: RecordType.Person}], DB_NAME, processUnrecognised)
let expectedCount: number|null = null
const {counter,stats} = await pipeline(fileStream, parseStream, insertStream)

await new Promise(resolve=>fileStream.close(resolve))

console.timeEnd('Process file')
console.log('Trailer', 'Expected:',expectedCount, 'Actual count:',counter)
assert.equal(expectedCount, counter, 'Did not process the expected record count from trailer.')

parentPort?.postMessage({counter,stats})

function processUnrecognised(item){
  if(item.recordType === RecordType.Header) console.log('Header', item['Run Number'], item['Production Date'])
  else if(item.recordType === RecordType.Trailer) expectedCount = item['Record Count']
}
