import Papa from 'papaparse'
import {Writable} from "stream";
import {MongoClient, UnorderedBulkOperation} from "mongodb";
import {createReadStream} from "fs";
import {transformCompany} from "./transformCompanyFromBulk.js";
import dot from 'dot-object'
import type {GetCompanyProfileResponse} from "../schemas/getCompanyProfileSchema.js";
import {initGetCompanyProfileCollection} from "../service/getCompanyProfile.js";
import {getEnv} from "../controllers/reflect.js";

// const readable = createReadStream('C:\\Users\\bme\\projects\\companies-house-database-manager\\samples\\companies\\sample.csv')
const readable = createReadStream('C:\\Users\\bme\\projects\\companies-house-database-manager\\samples\\companies\\BasicCompanyDataAsOneFile-2021-07-01.csv')

const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT, {header: true, fastMode: false, transformHeader: h=>h.trim(), dynamicTyping: h=>h!=='CompanyNumber', transform: val=>val===''?undefined:val})

/**
 * Writable stream to save data to MongoDB. Uses bulk operations to be faster than individual writes. Can do about 5,000 ops/sec on my computer.
 */
class MongoInserter extends Writable{
  private mongo: MongoClient
  collectionName: string
  dbName: string
  constructor(dbName: string, collectionName: string) {
    super({objectMode: true, highWaterMark: 1000});
    this.dbName = dbName
    this.collectionName = collectionName
  }
  async _construct(callback: (error?: (Error | null)) => void) {
    try{
      this.mongo = new MongoClient(getEnv('MONGO_URL'))
      await this.mongo.connect()
      callback()
    }catch (e) {
      callback(e)
    }
  }

  async _writev(chunks: Array<{ chunk: GetCompanyProfileResponse; encoding: BufferEncoding }>, callback: (error?: (Error | null)) => void) {
    const bulk = this.mongo.db(this.dbName).collection(this.collectionName).initializeUnorderedBulkOp({})
    for (const {chunk} of chunks)
      bulk.find({company_number: chunk.company_number}).upsert().replaceOne(chunk)
    const startTime = performance.now()
    await bulk.execute()
    const execTime = performance.now() - startTime
    console.log('WriteV perf:', chunks.length,'in', execTime.toFixed(2),'millis. ', (chunks.length / (execTime/1000)).toFixed(2),'per second')
    callback()
  }

  async _final(callback: (error?: (Error | null)) => void) {
    await this.mongo.close()
    callback()
  }
}

// make sure compression is enabled, and an index is created. This is necessary for reasonable speeds.
const mongo = new MongoClient(getEnv('MONGO_URL'))
await mongo.connect()
await initGetCompanyProfileCollection(mongo.db('company-profile'))
await mongo.close()

const inserter = new MongoInserter('ch', 'blk')
console.time('Load file')
readable.pipe(parseStream)
  .take(150_00) // for testing
  .map(chunk=>{
    const obj = dot.object(chunk)
    return transformCompany(obj)
  }, {concurrency:8})
  .pipe(inserter)
.on('finish', ()=>console.timeEnd('Load file'))
// this can load a file of 4,957,745 companies in 17m28s (averages 5,000 per second on my machine)
