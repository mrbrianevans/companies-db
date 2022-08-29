import {basename} from "path";
import {createReadStream} from "fs";
import split2 from 'split2'
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import {getMongoClient} from "../shared/dbClients.js";
import {RecordType} from "../shared/recordParser/RecordTypes.js";
import {CompanyStorage} from "../shared/storageTypes/Company.js";
import {OfficerStorage} from "../shared/storageTypes/Officer.js";
import assert from "node:assert";

/*
This script was designed to perform bulk operations by using stream iterator methods (Readable.take).

NI file takes 38 seconds with this method.
 */

const filepath = process.argv[2] // path to data file (required)
if(!filepath) throw new Error('Filepath not specified. Please provide argv.2 as the path to data file.')
const filename = basename(filepath)

const mongo = await getMongoClient()
const officers = mongo.db('officers').collection('ni_officers')
const companies = mongo.db('officers').collection('ni_companies')
let counter = 0

console.time('Process file '+filename)
const fileStream = createReadStream(filepath)
const parseStream = split2(parseRecord)

const recordStream = fileStream.pipe(parseStream)
// for (let items = await recordStream.take(1000).toArray(); items.length > 0; items = await recordStream.take(1000).toArray()) {
//   await bulkInsert(items)
// }

const BulkOpSize = 1998
const officerBuffer: OfficerStorage[] = []
const companyBuffer: CompanyStorage[] = []
for await(const item of recordStream){
  switch (item.recordType) {
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
    default:
      console.log(new Date(), item)
      break;
  }
}

await mongo.close()
await new Promise(resolve=>fileStream.close(resolve))

console.timeEnd('Process file '+filename)
console.log("Bulk wrote", counter, 'records. Should match trailer record count.')

async function bulkInsert(items: any[], recordType: RecordType){
  switch (recordType) {
    case RecordType.Company:
      await companies.bulkWrite(items.map(comp=>({insertOne: comp})))
      break;
    case RecordType.Person:
      await officers.bulkWrite(items.map(comp=>({insertOne: comp})))
      break;
  }
  // console.log("Bulk inserted", items.length, RecordType[recordType])
  counter += items.length
}

async function processChunk(chunk) {
  switch (chunk.recordType) {
    case RecordType.Company:
      delete chunk.recordType
      await companies.insertOne(chunk)
      break;
    case RecordType.Person:
      delete chunk.recordType
      await officers.insertOne(chunk)
      break;
    default:
      console.log(new Date(), chunk)
      break;
  }
}
