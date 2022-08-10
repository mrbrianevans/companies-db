/*

  Benchmark split2 against nodejs built-in createInterface for parsing ndjson.

  For parsing a file of 500,000 lines:
   - split2:          5.8s
   - createInterface: 7.3s

 */
import {createReadStream} from "fs";
import {createInterface} from "readline";
import split2 from 'split2'
import {Readable} from "stream";
import {setTimeout} from "timers/promises";

const sampleFile = 'C:\\Users\\bme\\projects\\companiesv2\\services\\personsWithSignificantControl\\loadBulk\\downloads\\unzipped\\2022-06-30\\psc-snapshot-2022-06-30_1of21.txt'


async function testSplit2(filename){
  const file = createReadStream(filename)
  console.time('Count records with split2')
  let counter = await file.pipe(split2(JSON.parse))
    .reduce((prev)=>prev+1, 0)
  console.timeEnd('Count records with split2')
  console.log("Counted", counter, 'lines with split2')
}


async function testInterface(filename){
  const file = createReadStream(filename)
  const lines = createInterface({input: file})
  console.time('Count records with interface')
  let counter = await Readable.from(lines)
    //@ts-ignore
    .map(JSON.parse, {concurrency: 8})
    .reduce((prev)=>prev+1, 0)
  console.timeEnd('Count records with interface')
  console.log("Counted", counter, 'lines with interface')
}

await testSplit2(sampleFile)
await testInterface(sampleFile)

await setTimeout(2000)

await testInterface(sampleFile)
await testSplit2(sampleFile)
