import {MongoInserter} from "./mongoInserter.js";
import {createReadStream, createWriteStream} from "fs";
import {createInterface} from "readline";
import {Readable } from "node:stream";
import type {StoredPsc} from "./PscTypes.js";
import {transformPscFromBulk} from "./transformPscFromBulk.js";
import {pipeline} from "stream/promises";
import {once} from 'node:events'
import {request} from "http";

import { resolve } from "path";
import { stat , mkdir} from "node:fs/promises";
import {promisify} from "util";
import * as yauzl from 'yauzl'
import type {PscBulk} from "./bulkFileTypes.js";
const yauzlOpenZip = promisify(yauzl.open)
/*
unfortunately, its impossible to stream the zip file through a pipeline due to the format used (.ZIP).
It would only work if it used something like gunzip. So need to download entire file, then unzip entire file.
The best way to do this is going to be to download the "chunks" of 60mb from CH, one at a time and process them concurrently.
Readable.map({concurrency:8}) to download 8 chunks at a time. Need a library like archiver to unzip files.
Could also use a worker_thread() for each chunk.
 */
const date = new Date().toISOString().split('T')[0]
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


async function loadAllFiles(total = 21, limit ?:number){
  console.time(`Load ${limit??total} files`)
  //todo: maybe better served by using concurrent worker_threads() rather than map({concurrent})
  const segments = Array.from({length:total},(v,i)=>i+1)
  // @ts-ignore
  await Readable.from(segments).take(limit??total).map(async (i)=>{
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
    const inserter = new MongoInserter<StoredPsc>('ch', 'psc','pscId')
    // insert to mongo
    console.time('Insert file '+i)
    const insertStream= Readable.from(lines)
      // @ts-ignore
      // .take(100_000)
      // .drop(300_000)
      .map(JSON.parse)
      .filter((l: PscBulk)=> {
        if(l.data.kind === "totals#persons-of-significant-control-snapshot"){
          console.log('file contents summary',l.data)
          return false
        }else{
          return true
        }
      })
      .map(transformPscFromBulk)
      .pipe(inserter)
    await once(insertStream, 'finish')
    console.timeEnd('Insert file '+i)
    lines.close()
    file.close()
    console.log()
    console.timeEnd('Full process file '+i)
    console.log()
  }, {concurrency: 10}).toArray()
  console.timeEnd(`Load ${limit??total} files`)
}

await loadAllFiles(21)
