
import split2 from 'split2'
import {Transform, TransformCallback} from "stream";
import {createReadStream, createWriteStream} from "fs";
import {pipeline} from "stream/promises";
import {RecordParser} from "./RecordParser.js";
import {classifyDisqualifiedOfficerRecordType, disqualifiedOfficersRecordTypes} from "./disqualifiedOfficersFile.js";

const options = {
  input: process.argv[2],
  limit: 10,
  output: undefined,
  verbose: true
}

const stringStream = new Transform({
  writableObjectMode: true,
  readableObjectMode: false,
  transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    callback(null, JSON.stringify(chunk) + '\n')
  }
})
const inputStream = options.input ? createReadStream(options.input) : process.stdin
const outputStream = options.output ? createWriteStream(options.output) : process.stdout
const parser = new RecordParser(disqualifiedOfficersRecordTypes, classifyDisqualifiedOfficerRecordType)
const parseStream = split2(r=>parser.parse(r))

const ac = new AbortController()
const {signal} = ac
let count = -1
parseStream.on('data', ()=>{
  if(++count >= options.limit) ac.abort()
})

const startTime = performance.now()
await pipeline(inputStream, parseStream , stringStream, outputStream, {signal})
  .catch(e=>{
    if(e.code === 'ABORT_ERR') {
      if (options.verbose) console.log("Aborted due to reaching specified limit of", options.limit)
    }else throw e
  })
const duration = performance.now() - startTime
