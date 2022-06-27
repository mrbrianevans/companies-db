import {MongoInserter} from "./mongoInserter.js";
import {createReadStream, createWriteStream} from "fs";
import {createInterface} from "readline";
import {Readable } from "node:stream";
import type {StoredPsc} from "./PscTypes.js";
import {transformPscFromBulk} from "./transformPscFromBulk.js";
import {pipeline} from "stream/promises";
import {once} from 'node:events'
import {request} from "http";

// using HTTP
async function downloadFiles(){
  /*
  unfortunately, its impossible to stream the zip file through a pipeline due to the format used (.ZIP).
  It would only work if it used something like gunzip. So need to download entire file, then unzip entire file.
  The best way to do this is going to be to download the "chunks" of 60mb from CH, one at a time and process them concurrently.
  Readable.map({concurrency:8}) to download 8 chunks at a time. Need a library like archiver to unzip files.
   */

  const total = 21 // number of snapshot files on http://download.companieshouse.gov.uk/en_pscdata.html
  // @ts-ignore
  return Readable.from(Array(21)).map(async (i)=>{
    const zipUrl = `http://download.companieshouse.gov.uk/psc-snapshot-${new Date().toISOString().split('T')[0]}_${i}of${total}.zip`
    const req = request(zipUrl)
    req.on('response', async (res)=>{
      await pipeline(res, createWriteStream('./pscDownlaod.zip'))
    })
    req.end()
    await once(req, 'close')

  }, {concurrency: 8})
}

// using pre-downloaded file
const sampleFile = 'C:\\Users\\bme\\projects\\companies-house-database-manager\\samples\\psc\\persons-with-significant-control-snapshot-2021-07-22.json'

const file = createReadStream(sampleFile, {highWaterMark: 16384})
const lines = createInterface({input: file})
const inserter = new MongoInserter<StoredPsc>('ch', 'psc','pscId')

console.time('Load file')
Readable.from(lines)
  // @ts-ignore
  .take(100_0)
  .map(JSON.parse, {concurrency: 8}) // concurrency doesn't seem to affect performance
  .map(transformPscFromBulk, {concurrency: 8})
  .pipe(inserter)
  .on('finish', ()=> {
    console.timeEnd('Load file')
    lines.close()
    file.close()
  })


// console.time('Test file')
// //@ts-ignore
// const count = await Readable.from(lines).map(d=> {
//   JSON.parse(d)
//   return undefined
// }, {concurrency: 8}).reduce((previousValue, currentValue) => previousValue + 1, 0)
// console.timeEnd('Test file')
// console.log({count})

// lines.close()
// file.close()
