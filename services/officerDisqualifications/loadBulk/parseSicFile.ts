
import {createReadStream} from "fs";
import {RecordParser} from "./RecordParser.js";
import {pipeline} from "stream/promises";
import {setTimeout} from "timers/promises";
import {average} from "./utils.js";
import {classifySicFileRecordType, sicFileRecordTypes} from "./prod200.js";
import split2 from 'split2'
import * as assert from "assert";

const benchmarkFilename = process.argv[2] // the file to parse for the benchmark. must be a prod200 file.

// parse a single prod200 file and return the time taken
async function runBenchmark(filename){
  const inputStream = createReadStream(filename)
  const parser = new RecordParser(sicFileRecordTypes, classifySicFileRecordType)
  const parseStream = split2(r=>parser.parse(r))
  let count = 0
  parseStream.on('data', ()=>count++)
  const startTime = performance.now()
  await pipeline(inputStream, parseStream)
  const durationMs = performance.now() - startTime
  return {count, durationMs}
}

// parse the file a few times to get an average duration. Takes about 45 seconds on my PC to parse 14 million records.
const times = [] as number[]
let totalCount
for (let i = 0; i < 2; i++) {
  const {durationMs, count} = await runBenchmark(benchmarkFilename)
  times.push(durationMs)
  if(totalCount) assert.equal(totalCount, count)
  else totalCount = count
  await setTimeout(250)
}

console.log('Results: ', times.map(t=>t.toFixed(1)).join(' '))
const averageDuration = average(times)
console.log('Average:', averageDuration, 'ms ±', Math.round(Math.max(Math.max(...times) - averageDuration, averageDuration - Math.min(...times))))
console.log("Parsed", totalCount, 'records')
