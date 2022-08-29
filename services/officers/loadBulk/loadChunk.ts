import { basename } from "path";
import {isMainThread, parentPort, workerData} from "worker_threads";
import {createReadStream} from "fs";
import split2 from 'split2'
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import {Writable} from "stream";
import {MongoInserter} from "../shared/mongoInserter.js";
import {once} from "node:events";
import {RecordType} from "../shared/recordParser/RecordTypes.js";
import { CompanyStorage } from "../shared/storageTypes/Company.js";
import { OfficerStorage } from "../shared/storageTypes/Officer.js";
import {pipeline} from "stream/promises";

const filepath = process.argv[2] // path to data file (required)
if(!filepath) throw new Error('Filepath not specified. Please provide argv.2 as the path to data file.')
const filename = basename(filepath)
if (isMainThread) {
  console.log("Loading chunk in main thread")
} else {
  console.log("Loading chunk in worker thread for file", filename)
}

console.time('Process file '+filename)

const DB_NAME = 'officers', COMPANY_COLLECTION = 'companies', OFFICER_COLLECTION = 'officers';

const fileStream = createReadStream(filepath)

const companyInserter = new MongoInserter<CompanyStorage>(DB_NAME, COMPANY_COLLECTION, ['company_number'],3, 'insert')
const personInserter = new MongoInserter<OfficerStorage>(DB_NAME, OFFICER_COLLECTION, ['company_number','person_number','officer_role','appointed_on'], 3, 'insert')
const inserterStreams = new Writable({
  objectMode: true,
  write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
    switch (chunk.recordType) {
      case RecordType.Company:
        delete chunk.recordType
        companyInserter.write(chunk, callback)
        break;
      case RecordType.Person:
        delete chunk.recordType
        personInserter.write(chunk, callback)
        break;
      default:
        console.log(chunk)
        callback()
        break;
    }
  },
  async final(callback: (error?: (Error | null)) => void) {
//todo: verify that the trailer record count matches the number of records inserted
    // not sure what it is, but there is an error causing the last few thousand records to not be inserted.
    // this needs to be looked into because its causing a serious issue with the update files.
    await new Promise<void>(res=>companyInserter.end(()=>res()))
    await new Promise<void>(res=>personInserter.end(()=>res()))
    callback()
  }
})

await pipeline(fileStream, split2(parseRecord), inserterStreams)

await new Promise(resolve=>fileStream.close(resolve))

console.timeEnd('Process file '+filename)

parentPort?.postMessage('finished')
