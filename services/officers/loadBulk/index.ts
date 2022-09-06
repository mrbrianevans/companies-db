//
// load officers bulk file into mongo
// process the 9 chunk files in separate worker threads for concurrency
// stream file from disk, split with split2 module, parse with custom parser
// insert using bulk mongo operations
import {Worker} from "node:worker_threads";
import {Readable} from "node:stream";
import {once} from "node:events";
import {readdir} from "node:fs/promises";
import { resolve } from "node:path";
import { getEnv } from "../shared/utils.js";
import { Queue, Worker as BullWorker } from "bullmq";
import {loadBulkQueueName, dailyUpdatesQueueName} from "../shared/bull/queueNames.js";
import {bullRedisConnection} from "../shared/bull/bullRedisConnection.js";
const concurrency = 9

const ac = new AbortController()
const {signal} = ac
/**
 * Load all files in a directory into MongoDB.
 * Takes about 20 min to load prod216 (60m records), or 10 min to load prod195 (40m records).
 */
async function loadAllFiles(){
  // actual data dir should be mapped with a docker bind volume
  const directory: string = 'downloads'
  const files = await readdir(directory)
  let totalCount = 0
  console.time(`Load ${files.length} files`)
  await Readable.from(files).take(files.length).map(async (filename)=>{
    const filepath = resolve(directory, filename)
    const workerFilename = await import.meta.resolve?.call({}, './simpleBulkLoadChunk.js').then(f=>new URL(f)) ?? './simpleBulkLoadChunk.js'
    const w = new Worker(workerFilename, {argv: [filepath], stdout:true, env: {MONGO_URL: getEnv('MONGO_URL'),REDIS_URL: getEnv('REDIS_URL')}})
    signal.addEventListener('abort', ()=>w.postMessage('abort'))
    w.on('error', err => printOutput('Error', filename, err.message))
    // trying to prefix all worker output with the filename being processed.
    w.stdout.on('data', (d:Buffer)=>printOutput('',filename, d.toString('utf8')))
    const [{counter,stats,headerRecord}] = await once(w, 'message') // worker only messages at end of process
    printOutput('Msg', filename, JSON.stringify({counter, stats, headerRecord}) )
    totalCount += counter
  }, {concurrency}).toArray()
  console.timeEnd(`Load ${files.length} files`)
  console.log("Loaded", totalCount, 'total records across files')
  if(!signal.aborted) {
    // schedule updates after bulk loading to get the database up to current
    const queue = new Queue(dailyUpdatesQueueName, {connection: bullRedisConnection})
    const job = await queue.add('update-after-bulk', {}, {})
    console.log("Scheduled update job", job.name, job.id)
    await queue.close()
  }
}

/** Prints output from worker thread */
function printOutput(label: string, filename: string, message: string|number|boolean){
  //todo: this should also log to Loki
  process.stdout.write([label,'>',new Date().toLocaleTimeString(), filename,message.toString().trim()].join('\t')+'\n')
}

//to trigger this worker, run new Queue(loadBulkQueueName).add('rando-name')
const worker = new BullWorker(loadBulkQueueName, loadAllFiles,{connection: bullRedisConnection})

process.on('SIGINT', shutdown) // quit on ctrl-c when running docker in terminal
process.on('SIGTERM', shutdown)// quit properly on docker stop
async function shutdown(sig: string){
  console.info('Graceful shutdown commenced', new Date().toISOString(), sig);
  ac.abort() // this signals to each worker thread to finish the current record and then quit, closing DB connections.
  await worker.close(false)
  process.exit(0)
}
