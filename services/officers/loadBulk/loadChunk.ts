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

const companyInserter = new MongoInserter<CompanyStorage>(DB_NAME, COMPANY_COLLECTION, ['company_number'])
const personInserter = new MongoInserter<OfficerStorage>(DB_NAME, OFFICER_COLLECTION, ['company_number','personNumber'])
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
    await new Promise<void>(res=>companyInserter.end(()=>res()))
    await new Promise<void>(res=>personInserter.end(()=>res()))
    callback()
  }
})

const insertStream = fileStream.pipe(split2(parseRecord)).pipe(inserterStreams)
await once(insertStream, 'finish')

await new Promise(resolve=>fileStream.close(resolve))

console.timeEnd('Process file '+filename)

parentPort?.postMessage('finished')
