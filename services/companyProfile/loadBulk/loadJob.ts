import Papa from 'papaparse'
import {MongoClient} from "mongodb";
import {createWriteStream} from "fs";
import {transformCompany} from "./transformCompanyFromBulk.js";
import dot from 'dot-object'
import type {GetCompanyProfileResponse} from "../schemas/getCompanyProfileSchema.js";
import {getEnv} from "../controllers/reflect.js";
import {MongoInserter} from './mongoInserter.js';
import {resolve} from "path";
import {mkdir, stat} from "node:fs/promises";
import {request} from "http";
import {pipeline} from "stream/promises";
import {once} from "node:events";
import {promisify} from "util";
import {Readable, Transform} from "node:stream";
import * as yauzl from 'yauzl'

const yauzlOpenZip = promisify(yauzl.open)


const today = new Date()
today.setUTCDate(1)
const date = today.toISOString().split('T')[0]
/** using HTTP
 * @param index - the index of the file to download. eg 1of21
 * @param total - number of snapshot files on http://download.companieshouse.gov.uk/en_output.html
 */
async function downloadFile(index:number,total = 7){
  const filename = `BasicCompanyData-${date}-part${index}_${total}.zip`
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
// returns a readable stream of file contents of the only file in a ZIP archive
async function unzipFile(zipFilename: string){
  // @ts-ignore
  const zipfile = await yauzlOpenZip(zipFilename, {lazyEntries: true, autoClose: true})
  if(zipfile.entryCount === 1){
    let openReadStream = promisify(zipfile.openReadStream.bind(zipfile));
    zipfile.readEntry();
    const [entry] = await once(zipfile, 'entry')
    return await openReadStream(entry)
  }else{
    throw new Error('More than one file in zip archive')
  }
}


async function loadAll(total = 7, limit?:number){

  const segments = Array.from({length:total},(v,i)=>i+1)
  // @ts-ignore
  await Readable.from(segments).take(limit??total).map(async (i)=>{
    console.time("Download file "+i)
    const zipFilename = await downloadFile(i, total)
    console.timeEnd("Download file "+i)
    const unzipStream = await unzipFile(zipFilename)
    const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT, {header: true, fastMode: false, transformHeader: h=>h.trim(), dynamicTyping: h=>h!=='CompanyNumber', transform: val=>val===''?undefined:val})
    const inserter = new MongoInserter<GetCompanyProfileResponse>('ch', 'blk', 'company_number')

    // transform objects from their shape in the bulk file to API response shape
    const transformer = new Transform({
      objectMode: true,
      transform(chunk: any, encoding: BufferEncoding, callback) {
        const obj = dot.object(chunk)
        const apiResponse = transformCompany(obj)
        callback( null, apiResponse )
      }
    })

    console.time("Pipeline "+i)
    // unzip => parse CSV => transform objects => insert to mongo
    await pipeline(unzipStream, parseStream, transformer, inserter)
    console.timeEnd("Pipeline "+i)
  }, {concurrency: 1}).toArray()
  // tried a few values for concurrency:
  // - concurrency=8 avg 856 per second
  // - concurrency=2 avg 2642 per second
  // - concurrency=1 avg 5446 per second
  // not sure what the bottle neck is? maybe network?
}

async function createIndex(){
  const mongo = new MongoClient(getEnv('MONGO_URL'))
  await mongo.connect()
  await mongo.db('ch').createCollection('blk', {storageEngine: { wiredTiger: { configString: 'block_compressor=zstd' } }})
  await mongo.db('ch').collection('blk').createIndex({company_number:1}, {unique: true})
  await mongo.close()
}

await loadAll(7)

// this can load a file of 4,957,745 companies in 17m28s (averages 5,000 per second on my machine)
// gonna be faster when chunks are working. each chunk took 16 min to insert into mongo. avg 850 per second
