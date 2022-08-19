import {isMainThread, parentPort, workerData} from "worker_threads";
import {getBulkFile} from "./getBulkFile.js";
import {MongoInserter} from "./mongoInserter.js";
import {GetCompanyProfile} from "./ApiResponseType.js";
import Papa from 'papaparse'
import {pipeline} from "node:stream/promises";
import {Transform} from "node:stream";
import {transformCompany} from "./transformCompanyFromBulk.js";
import dot from 'dot-object'


if(isMainThread) throw new Error("Cannot run this script directly, must be called by a parent thread with workerData")

const {DB_NAME,COLL_NAME, index, total, date } = workerData



const bulkFile = await getBulkFile(index, total, date)
const parseStream: Transform = Papa.parse(Papa.NODE_STREAM_INPUT, {header: true, fastMode: false, transformHeader: h=>h.trim(), dynamicTyping: h=>h!=='CompanyNumber', transform: val=>val===''?undefined:val})
const inserter = new MongoInserter<GetCompanyProfile>(DB_NAME, COLL_NAME, ['company_number'])

// transform objects from their shape in the bulk file to API response shape
const transformer = new Transform({
  objectMode: true,
  transform(chunk: any, encoding: BufferEncoding, callback) {
    const obj = dot.object(chunk)
    const apiResponse = transformCompany(obj)
    callback( null, apiResponse )
  }
})

// @ts-ignore
await pipeline(bulkFile, parseStream, transformer, inserter, {})

parentPort?.postMessage('finished')
