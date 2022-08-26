import {basename} from "path";
import {createReadStream} from "fs";
import split2 from 'split2'
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import {getMongoClient} from "../shared/dbClients.js";
import { RecordType } from "../shared/recordParser/RecordTypes.js";

/*
This was designed to be as simple as possible to avoid any errors, and sure enough it showed a flaw in loadChunk.ts.
This script inserts all the records, whereas that one misses out some.
However, this is much slower due to not using bulk operations. If this one could somehow be improved to use bulk?
NI takes 30-50 seconds using the loadChunk MongoInsert bulk streams, and about 2 minutes using map with concurrency=10.
 */

const filepath = process.argv[2] // path to data file (required)
if(!filepath) throw new Error('Filepath not specified. Please provide argv.2 as the path to data file.')
const filename = basename(filepath)

const mongo = await getMongoClient()
const officers = mongo.db('officers').collection('officers')
const companies = mongo.db('officers').collection('companies')

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


console.time('Process file '+filename)
const fileStream = createReadStream(filepath)
await fileStream.pipe(split2(parseRecord)).map(processChunk, {concurrency: 10}).toArray()
await mongo.close()
await new Promise(resolve=>fileStream.close(resolve))

console.timeEnd('Process file '+filename)
