import {isMainThread, parentPort, workerData} from "worker_threads";
import {getBulkFile} from "./getBulkFile.js";
import {mongoBulkWriter} from "../shared/MongoBulkWriter.js";
import Papa from 'papaparse'
import {pipeline} from "node:stream/promises";
import {Transform} from "node:stream";
import {transformCompany} from "./transformCompanyFromBulk.js";
import dot from 'dot-object'


if(isMainThread) throw new Error("Cannot run this script directly, must be called by a parent thread with workerData")

const {DB_NAME,COLL_NAME, index, total, date } = workerData

// transform objects from their shape in the bulk file to API response shape
function transform(row){
  const obj = dot.object(row)
  return transformCompany(obj)
}

const bulkFile = await getBulkFile(index, total, date)
const parseStream: Transform = Papa.parse(Papa.NODE_STREAM_INPUT, {header: true, fastMode: false, transformHeader: h=>h.trim(), dynamicTyping: h=>h!=='CompanyNumber', transform: val=>val===''?undefined:val})
const inserter = mongoBulkWriter(null, [{value: null, collection: COLL_NAME, mapper: val => ({insertOne: {document:transform(val)}})}], DB_NAME)

const {counter, stats} = await pipeline(bulkFile, parseStream, inserter)

parentPort?.postMessage({counter, stats})
