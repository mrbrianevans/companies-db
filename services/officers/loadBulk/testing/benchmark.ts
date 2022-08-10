


import {createReadStream, createWriteStream} from "fs";
import {parseRecord} from "../recordParser/parseRecord.js";
import split2 from 'split2'
import {once} from "node:events";
import {performance} from "perf_hooks";
import {Transform, TransformCallback, Writable} from "stream";
/* Load the northern island file (about 86MB, 461,870 records) */
const smallFilepath = 'N:\\CompaniesHouse\\officersdata\\Prod195_2898\\Prod195_2898_ni_21042021010001.dat'
/* Load an england wales file (about 800MB, 3,843,191 records) */
const bigFilepath = 'N:\\CompaniesHouse\\officersdata\\Prod195_2898\\Prod195_2898_ew_1_21042021010001.dat'

const testFilepath = smallFilepath

async function simpleParseFileCountRecords(){
  const fileStream = createReadStream(testFilepath)
  let count = 0
  const insertStream = fileStream.pipe(split2(parseRecord)).on('data', (record)=>{count++})
  await once(insertStream, 'finish')
  await new Promise(resolve=>fileStream.close(resolve))
  return count
}
async function parseFileWriteNdjsonTransform(){
  const fileStream = createReadStream(testFilepath)
  const outStream = createWriteStream('./benchmarkOutput.json')
  let count = 0
  const stringStream = new Transform({
    writableObjectMode: true,
    readableObjectMode: false,
    transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
      count++
      callback(null, JSON.stringify(chunk) + '\n')
    }
  })
  const insertStream = fileStream.pipe(split2(parseRecord)).pipe(stringStream).pipe(outStream)
  await once(insertStream, 'finish')
  await new Promise(resolve=>fileStream.close(resolve))
  return count
}

async function parseFileWriteNdjsonWriteable(){
  const fileStream = createReadStream(testFilepath)
  const outStream = createWriteStream('./benchmarkOutput.json')
  let count = 0
  const writeStream = new Writable({
    objectMode: true,
    write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
      count++
      outStream.write(JSON.stringify(chunk) + '\n',callback)
    },
    async final(callback: (error?: (Error | null)) => void) {
      await new Promise(resolve=>outStream.end(resolve))
      outStream.close(callback)
    }
  })
  const insertStream = fileStream.pipe(split2(parseRecord)).pipe(writeStream)
  await once(insertStream, 'finish')
  await new Promise(resolve=>fileStream.close(resolve))
  return count
}

async function simpleParseFileCountRecordByType(){
  const fileStream = createReadStream(testFilepath)
  let counts = {'1':0,'2':0}
  const insertStream = fileStream.pipe(split2(parseRecord)).on('data', (record)=>{counts[record['recordType']]++})
  await once(insertStream, 'finish')
  await new Promise(resolve=>fileStream.close(resolve))
  return counts['1']+counts['2']
}

/** Time a runner. The runner function should return the number of records parsed in the time */
const benchmark = async (runner: () => Promise<number>) => {
  const startTime = performance.now()

  const count = await runner()

  const duration = performance.now() - startTime
  console.log("Benchmark file took", duration, 'milliseconds to parse', count, 'records')
  const rate = count / (duration / 1000)
  console.log('Rate of', Math.round(rate), 'per second')
}

await benchmark(parseFileWriteNdjsonTransform)
