//native imports
import {once} from "node:events";
import {Readable} from "node:stream";

// package imports
import {Temporal} from '@js-temporal/polyfill'

//project imports
import {Worker} from "worker_threads";
import { companyCollectionName } from "../shared/CompanyStorage.js";
import {getMongoClient, mongoDbName} from "../shared/dbClients.js";

const concurrency = 7
const DB_NAME = mongoDbName
const COLL_NAME = companyCollectionName
const date = Temporal.Now.plainDateISO().with({day: 1}).toString()
const workers = new Set<Worker>()
async function loadAll(total = 7){
  console.time(`Load ${total} files`)
  const segments = Array.from({length:total},(v,i)=>i+1)
  await Readable.from(segments).map(async (index)=>{
    const startTime = performance.now()
    const w = new Worker('./loadChunk.js', {workerData: {DB_NAME,COLL_NAME,index, total, date}})
    workers.add(w)
    const [output] = await once(w, 'message') // worker only messages at end of process
    workers.delete(w)
    const {counter, stats} = output
    console.log('W'+index,'Loaded', counter, 'records in', ((performance.now()-startTime)/1000).toFixed(1), 'seconds')
    return counter
  }, {concurrency}).toArray()
  console.timeEnd(`Load ${total} files`)
}

await loadAll(7)

// this can load a file of 4,957,745 companies in 17m28s (averages 5,000 per second on my machine)
// gonna be faster when chunks are working. each chunk took 16 min to insert into mongo. avg 850 per second


// UPDATE (after using Worker threads): this can load all 5,115,200 companies in about 4 minutes
// 7 concurrent workers, each doing 8,000+ per second

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
async function shutdown(){
  console.info('Graceful shutdown commenced', new Date().toISOString());
  // ideally, this would post a message to each worker informing them of the shutdown, and they terminate MongoClients.
  for(const worker of workers){
    console.log('Terminating worker in thread',worker.threadId)
    await worker.terminate()
  }
  process.exit(0)
}
