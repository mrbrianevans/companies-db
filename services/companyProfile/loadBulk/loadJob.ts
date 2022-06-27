import Papa from 'papaparse'
import {MongoClient} from "mongodb";
import {createReadStream} from "fs";
import {transformCompany} from "./transformCompanyFromBulk.js";
import dot from 'dot-object'
import type {GetCompanyProfileResponse} from "../schemas/getCompanyProfileSchema.js";
import {initGetCompanyProfileCollection} from "../service/getCompanyProfile.js";
import {getEnv} from "../controllers/reflect.js";
import { MongoInserter } from './mongoInserter.js';

// const readable = createReadStream('C:\\Users\\bme\\projects\\companies-house-database-manager\\samples\\companies\\sample.csv')
const readable = createReadStream('C:\\Users\\bme\\projects\\companies-house-database-manager\\samples\\companies\\BasicCompanyDataAsOneFile-2021-07-01.csv')

const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT, {header: true, fastMode: false, transformHeader: h=>h.trim(), dynamicTyping: h=>h!=='CompanyNumber', transform: val=>val===''?undefined:val})


// make sure compression is enabled, and an index is created. This is necessary for reasonable speeds.
const mongo = new MongoClient(getEnv('MONGO_URL'))
await mongo.connect()
await initGetCompanyProfileCollection(mongo.db('company-profile'))
await mongo.close()

const inserter = new MongoInserter<GetCompanyProfileResponse>('ch', 'blk', 'company_number')
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
