import {createReadStream} from "fs";
import {RecordParser} from "./RecordParser.js";
import {classifyDisqualifiedOfficerRecordType, disqualifiedOfficersRecordTypes} from "./disqualifiedOfficersFile.js";
import split2 from 'split2'
import {pipeline} from "node:stream/promises";
import {Transform, TransformCallback} from "stream";

const inputStream = createReadStream('./benchmarkSample.txt')
const parser = new RecordParser(disqualifiedOfficersRecordTypes, classifyDisqualifiedOfficerRecordType)
const parseStream = split2(r=>parser.parse(r))

const stringStream = new Transform({
  writableObjectMode: true,
  readableObjectMode: false,
  transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    callback(null, JSON.stringify(chunk) + '\n')
  }
})
// combines multiple records for the same person, and formats it like an API response
async function* formatRecords (source, { signal }) {
  console.log('Format records')
  let currentPerson = 0
  for await (const chunk of source) {
    if(currentPerson++ < 10) console.log(JSON.stringify(chunk))
    // todo: need typescript types for chunk
    //if a person is encountered, insert current person to Mongo and store new line as current person
    //   if a disqual/exemption/variation is encountered, add it to current person (checking person numbers to verify)
    //mongo operation should be find and replace I think, or otherwise the db should be dropped before this starts
    if(signal.aborted) break;
  }
}

//@ts-ignore
await pipeline(inputStream, parseStream, formatRecords, /* should stream to Mongo here using Find and Replace stringStream,process.stdout*/)
