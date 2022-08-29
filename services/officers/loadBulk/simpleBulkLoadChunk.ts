import {basename} from "path";
import {createReadStream} from "fs";
import split2 from 'split2'
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import {getMongoClient} from "../shared/dbClients.js";
import {RecordType} from "../shared/recordParser/RecordTypes.js";
import {CompanyStorage} from "../shared/storageTypes/Company.js";
import {OfficerStorage} from "../shared/storageTypes/Officer.js";
import assert from "node:assert";
import {parentPort} from "worker_threads";

/*
This script was designed to perform bulk operations by using stream iterator methods (Readable.take).

NI file takes 38 seconds with this method.
 */
const DB_NAME = 'officers', COMPANY_COLLECTION = 'companies', OFFICER_COLLECTION = 'officers';

const filepath = process.argv[2] // path to data file (required)
if(!filepath) throw new Error('Filepath not specified. Please provide argv.2 as the path to data file.')
const filename = basename(filepath)

const mongo = await getMongoClient()
const officers = mongo.db(DB_NAME).collection(OFFICER_COLLECTION)
const companies = mongo.db(DB_NAME).collection(COMPANY_COLLECTION)
let counter = 0

console.time('Process file '+filename)
const fileStream = createReadStream(filepath)
const parseStream = split2(parseRecord)

const recordStream = fileStream.pipe(parseStream)

//todo: refactor this into a generic "MongoBulkInserter" so it can be used on PSC and companies as well.
const BulkOpSize = 1998
const officerBuffer: OfficerStorage[] = []
const companyBuffer: CompanyStorage[] = []
for await(const item of recordStream){
  switch (item.recordType) {
    case RecordType.Header:
      console.log(new Date(), 'File Header Record:', {runNumber: item['Run Number'], date: item['Production Date']})
      break;
    case RecordType.Company:
      delete item.recordType
      companyBuffer.push(item)
      if(companyBuffer.length === BulkOpSize){
        await bulkInsert(companyBuffer.splice(0, companyBuffer.length), RecordType.Company)
      }
      break;
    case RecordType.Person:
      delete item.recordType
      officerBuffer.push(item)
      if(officerBuffer.length === BulkOpSize){
        await bulkInsert(officerBuffer.splice(0, officerBuffer.length), RecordType.Person)
      }
      break;
    case RecordType.Trailer:
      // when trailer is reach, insert final remaining records in buffers
      await bulkInsert(officerBuffer.splice(0, officerBuffer.length), RecordType.Person)
      await bulkInsert(companyBuffer.splice(0, companyBuffer.length), RecordType.Company)
      // check that the right amount of records was processed
      console.log("Inserted", counter, 'records. Trailer record expects', item['Record Count'], 'records.')
      assert.equal(counter, item['Record Count'], 'Trailer record count should equal counter')
      break
  }
}

await mongo.close()
await new Promise(resolve=>fileStream.close(resolve))

console.timeEnd('Process file '+filename)

parentPort?.postMessage({counter})
function throwIfErr(e){
  if(e.code !== 11000) throw e
}
async function bulkInsert(items: any[], recordType: RecordType){
  //todo: this could rather increment a counter based on the result of the bulk operation, and split by record type.
  switch (recordType) {
    case RecordType.Company: {
      await companies.bulkWrite(items.map(comp => ({insertOne: comp}))).catch(throwIfErr)
    }
      break;
    case RecordType.Person: {
      // there are duplicate officer records in the bulk file
      await officers.bulkWrite(items.map(comp => ({insertOne: comp}))).catch(throwIfErr)
    }
      break;
  }
  counter += items.length
}
