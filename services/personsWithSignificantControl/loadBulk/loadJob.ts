import {Readable} from "node:stream";
import {once} from 'node:events'
import {MongoClient} from "mongodb";
import {getEnv} from "./utils.js";
import {Worker} from "worker_threads";
/*
unfortunately, its impossible to stream the zip file through a pipeline due to the format used (.ZIP).
It would only work if it used something like gunzip. So need to download entire file, then unzip entire file.
The best way to do this is going to be to download the "chunks" of 60mb from CH, one at a time and process them concurrently.
Readable.map({concurrency:8}) to download 8 chunks at a time. Need a library like archiver to unzip files.
Could also use a worker_thread() for each chunk.
 */
const DB_NAME = 'personsWithSignificantControl';
const concurrency = 10

async function loadAllFiles(total = 22, limit ?:number){
  console.time(`Load ${limit??total} files`)
  const segments = Array.from({length:total},(v,i)=>i+1)
  // @ts-ignore
  await Readable.from(segments).take(limit??total).map(async (i)=>{
    const w = new Worker('./loaderWorker.js', {argv: [i, total], workerData: {DB_NAME}})
    const [output] = await once(w, 'message') // worker only messages at end of process
    console.log("Output from worker", i, output)
  }, {concurrency}).toArray()
  console.timeEnd(`Load ${limit??total} files`)
}
const collections = ['getIndividual','getLegalPersons','getCorporateEntities','getSuperSecurePerson','getStatement','getExemptions']
/**
 * Creates collections with compression and an index on pscId (if not exists).
 */
async function createIndexes(){
  // the index creation logic is now in a startup script for the mongo database, so that there is never a database which does not have the required indexes, as this poses a serious performance risk
  const mongo = new MongoClient(getEnv('MONGO_URL'))
  await mongo.connect()
  for (const collection of collections) {
    const exists = await mongo.db(DB_NAME)
      .listCollections({ name: collection })
      .toArray()
      .then((a) => a.length)
    if (!exists) {
      console.log("Collection does not exist. Cannot do bulk operation without compression and index", {DB_NAME, collection})
    }
  }
  await mongo.close()
}

await createIndexes()
await loadAllFiles(22)
