import {createReadStream} from "fs";
import {RecordParser} from "./RecordParser.js";
import {classifyDisqualifiedOfficerRecordType, disqualifiedOfficersRecordTypes} from "./disqualifiedOfficersFile.js";
import {pipeline} from "stream/promises";
import split2 from 'split2'
import {setTimeout} from "timers/promises";
import { average } from "./utils.js";

// parse a single file and return the time taken
async function runBenchmark(){
  const inputStream = createReadStream('./benchmarkSample.txt')
  const parser = new RecordParser(disqualifiedOfficersRecordTypes, classifyDisqualifiedOfficerRecordType)
  const parseStream = split2(r=>parser.parse(r))
  let count = 0
  parseStream.on('data', ()=>count++)
  const startTime = performance.now()
  await pipeline(inputStream, parseStream)
  const durationMs = performance.now() - startTime
  return {count, durationMs}
}

// parse the file 5 times to get an average duration
const times = [] as number[]
for (let i = 0; i < 5; i++) {
  const {durationMs} = await runBenchmark()
  times.push(durationMs)
  await setTimeout(250)
}

console.log('Results: ', times.map(t=>t.toFixed(1)).join(' '))
const averageDuration = average(times)
console.log('Average:', averageDuration, 'ms ±', Math.round(Math.max(Math.max(...times) - averageDuration, averageDuration - Math.min(...times))))

