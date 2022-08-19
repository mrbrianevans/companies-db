//native imports
import {once} from "node:events";
import {Readable} from "node:stream";

// package imports
import {MongoClient} from "mongodb";

//project imports
import {getEnv} from "./utils.js";
import {Worker} from "worker_threads";

const concurrency = 7

const DB_NAME = 'companyProfile'
const COLL_NAME = 'getCompanyProfile'

const today = new Date()
today.setUTCDate(1)
const date = today.toISOString().split('T')[0]


async function loadAll(total = 7, limit?:number){
  console.time(`Load ${limit??total} files`)

  const segments = Array.from({length:total},(v,i)=>i+1)
  // @ts-ignore
  await Readable.from(segments).take(limit??total).map(async (index)=>{

    const w = new Worker('./loadChunk.js', {workerData: {DB_NAME,COLL_NAME,index, total, date}})
    const [output] = await once(w, 'message') // worker only messages at end of process

  }, {concurrency}).toArray()
  console.timeEnd(`Load ${limit??total} files`)
  // tried a few values for concurrency:
  // - concurrency=8 avg 856 per second
  // - concurrency=2 avg 2642 per second
  // - concurrency=1 avg 5446 per second
  // - concurrency=7 avg 8100 per second
  // not sure what the bottle neck is? maybe network?
}

/**
 * Creates collection with compression and an index on company number (if not exists).
 */
async function createIndex(){
  const mongo = new MongoClient(getEnv('MONGO_URL'))
  await mongo.connect()
  const exists = await mongo.db(DB_NAME)
    .listCollections({ name: COLL_NAME })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    throw new Error("Cannot bulk load because collection does not exist in database. Recreate database in Docker.")
  }
  await mongo.close()
}

await createIndex()
await loadAll(7)

// this can load a file of 4,957,745 companies in 17m28s (averages 5,000 per second on my machine)
// gonna be faster when chunks are working. each chunk took 16 min to insert into mongo. avg 850 per second


// UPDATE (after using Worker threads): this can load all 5,115,200 companies in about 4 minutes
// 7 concurrent workers, each doing 8,000+ per second
