// can be run in a worker thread

import {MongoInserter} from "./mongoInserter.js";
import {createReadStream, createWriteStream} from "fs";
import {createInterface} from "readline";
import {Readable} from "node:stream";
import type {StoredPsc} from "./PscTypes.js";
import {transformPscFromBulk} from "./transformPscFromBulk.js";
import {pipeline} from "stream/promises";
import {once} from 'node:events'
import {request} from "http";
import {resolve} from "path";
import {mkdir, stat} from "node:fs/promises";
import {promisify} from "util";
import * as yauzl from 'yauzl'
import type {PscBulk} from "./bulkFileTypes.js";
import {Transform, Writable} from "stream";
import {isMainThread, parentPort, workerData} from "worker_threads";

const yauzlOpenZip = promisify(yauzl.open)

const DB_NAME = workerData?.DB_NAME??'ch';
const date = new Date().toISOString().split('T')[0]
const i = parseInt(process.argv[2])
const total = parseInt(process.argv[3])
if (isMainThread) {
  console.log("Running worker in main thread")
} else {
  console.log('Worker started', {i, total})
  console.log('Worker data:', typeof workerData, workerData, workerData.DB_NAME)
}

/** using HTTP
 * @param index - the index of the file to download. eg 1of21
 * @param total - number of snapshot files on http://download.companieshouse.gov.uk/en_pscdata.html
 */
async function downloadFile(index:number,total = 21){
  const filename = `psc-snapshot-${date}_${index}of${total}.zip`
  const filepath = resolve('downloads', 'zipped',date, filename)
  //check if the file already exists
  const filestat = await stat(filepath).catch(e=>null)
  if(filestat?.isFile()) return filepath // early exit

  const zipUrl = `http://download.companieshouse.gov.uk/${filename}`
  console.log('Downloading '+zipUrl)
  const req = request(zipUrl)
  req.on('response', async (res)=>{
    await mkdir(resolve('downloads','zipped',date), {recursive: true})
    await pipeline(res, createWriteStream(filepath, {encoding: 'utf-8'}))
  })
  req.end()
  await once(req, 'close')
  return filepath
}

async function unzipFile(zipFilename: string){
  //todo: check if file already exists
  // @ts-ignore
  const zipfile = await yauzlOpenZip(zipFilename, {lazyEntries: true})
  if(zipfile.entryCount === 1){
    let openReadStream = promisify(zipfile.openReadStream.bind(zipfile));
    zipfile.readEntry();
    const [entry] = await once(zipfile, 'entry')
    const {compressedSize, uncompressedSize} = entry
    const fileName = entry.fileName
    const filepath = resolve('downloads','unzipped',date,fileName)
    // console.log("found entry:", {compressedSize, uncompressedSize, fileName});
    let stream = await openReadStream(entry);
    await mkdir(resolve('downloads','unzipped',date), {recursive: true})
    await pipeline(stream, createWriteStream(filepath))
    return filepath
  }else{
    throw new Error('More than one file in zip archive')
  }
}

// a transform stream that slows down a stream and only writes in batches of HWM. More efficient mongo inserts this way.
// buffers chunks until the buffer reaches a certain size, then it corks, writes all chunks, and uncorks.
class SlowDown extends Transform{
  bufferedChunks: any[]
  bufferSize: number
  constructor(bufferSize: number) {
    super({objectMode: true});
    this.bufferSize = bufferSize
    this.bufferedChunks = []
  }
  releaseChunks(){
    this.cork()
    for (const i in this.bufferedChunks) {
      this.push(this.bufferedChunks.pop()) // atomic operation to pop and push in a single line.
    }
    this.uncork()
  }
  _transform(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
    this.bufferedChunks.push(chunk)
    if(this.bufferedChunks.length > this.bufferSize){
      // console.log("releasing chunks due to filled buffer",this.bufferedChunks.length)
      this.releaseChunks()
    }
    callback()
  }
  _flush(callback) {
    // console.log("Flushed with", this.bufferedChunks.length, 'chunks still in buffer')
    this.releaseChunks()
    callback()
  }
}


console.time('Full process file '+i)
console.time('Download ZIP file '+i)
const zipFilename = await downloadFile(i, total)
console.timeEnd('Download ZIP file '+i)


console.time('Unzip ZIP file '+i)
const textFile = await unzipFile(zipFilename)
console.timeEnd('Unzip ZIP file '+i)

// stream and parse the json (.txt) file
const file = createReadStream(textFile, {highWaterMark: 65536}) // could pipe output of unzip straight to an interface, and avoid an unnecessary file save
const lines = createInterface({input: file})
const individualInserter = new SlowDown(10000)
individualInserter.pipe(new MongoInserter<StoredPsc>(DB_NAME, 'individual', "pscId"))
const legalInserter = new SlowDown(10000)
legalInserter.pipe(new MongoInserter<StoredPsc>(DB_NAME, 'legal', "pscId"))
const corporateInserter = new SlowDown(10000)
corporateInserter.pipe(new MongoInserter<StoredPsc>(DB_NAME, 'corporate', "pscId"))
const superSecureInserter = new SlowDown(10000)
superSecureInserter.pipe(new MongoInserter<StoredPsc>(DB_NAME, 'super-secure', "pscId"))
const statementInserter = new SlowDown(10000)
statementInserter.pipe(new MongoInserter<StoredPsc>(DB_NAME, 'statement', "pscId"))
const summaryInserter = new MongoInserter<StoredPsc>(DB_NAME, 'summary', "pscId")
const exemptionsInserter = new SlowDown(10000)
exemptionsInserter.pipe(new MongoInserter<StoredPsc>(DB_NAME, 'exemptions', "pscId"))

const splitterStream = new Writable({
  objectMode: true,
  highWaterMark: 3000,
  write(chunk: PscBulk, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
    switch (chunk.data.kind) {
      case "individual-person-with-significant-control":
        individualInserter.write(transformPscFromBulk(chunk), callback)
        break;
      case "legal-person-person-with-significant-control":
        legalInserter.write(transformPscFromBulk(chunk), callback)
        break;
      case "corporate-entity-person-with-significant-control":
        corporateInserter.write(transformPscFromBulk(chunk), callback)
        break;
      case "super-secure-person-with-significant-control":
        superSecureInserter.write(transformPscFromBulk(chunk), callback)
        break;
      case "persons-with-significant-control-statement":
        statementInserter.write(transformPscFromBulk(chunk), callback)
        break;
      case "totals#persons-of-significant-control-snapshot":
        const {data} = chunk as unknown as {data:{kind: string, generated_at: string}}
        summaryInserter.write({...data, _id: data.generated_at}, callback)
        break;
      case "exemptions":
        exemptionsInserter.write(transformPscFromBulk(chunk), callback)
        break;
    }
  },
  async final(callback: (error?: (Error | null)) => void) {
    await new Promise(res=>individualInserter.end(res))
    await new Promise(res=>legalInserter.end(res))
    await new Promise(res=>corporateInserter.end(res))
    await new Promise(res=>superSecureInserter.end(res))
    await new Promise(res=>statementInserter.end(res))
    await new Promise(res=>summaryInserter.end(res))
    await new Promise(res=>exemptionsInserter.end(res))
    callback()
  }
})
// insert to mongo
console.time('Insert file '+i)
const insertStream = Readable.from(lines)
  // @ts-ignore
  // .take(100_000)
  // .drop(300_000)
  .map(JSON.parse)
  .pipe(splitterStream)
await once(insertStream, 'finish')
console.timeEnd('Insert file '+i)
lines.close()
file.close()
console.log()
console.timeEnd('Full process file '+i)
console.log()

parentPort?.postMessage('finished')
