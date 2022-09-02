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
import { Queue } from "bullmq";
import {queueName} from "../shared/bull/queueName.js";
import {bullRedisConnection} from "../shared/bull/bullRedisConnection.js";
const concurrency = 9

/**
 * Load all files in a directory into MongoDB.
 * @param directory - the directory path containing the data files.
 */
async function loadAllFiles(directory: string){
  const files = await readdir(directory)
  let totalCount = 0
  console.time(`Load ${files.length} files`)
  await Readable.from(files).take(files.length).map(async (filename)=>{
    const filepath = resolve(directory, filename)
    const workerFilename = await import.meta.resolve?.call({}, './simpleBulkLoadChunk.js').then(f=>new URL(f)) ?? './simpleBulkLoadChunk.js'
    const w = new Worker(workerFilename, {argv: [filepath], stdout:true, env: {MONGO_URL: getEnv('MONGO_URL'),REDIS_URL: getEnv('REDIS_URL')}})
    w.on('error', err => printOutput('Error', filename, err.message))
    // trying to prefix all worker output with the filename being processed.
    w.stdout.on('data', (d:Buffer)=>printOutput('',filename, d.toString('utf8')))
    const [{counter,stats,headerRecord}] = await once(w, 'message') // worker only messages at end of process
    printOutput('Msg', filename, JSON.stringify({counter, stats, headerRecord}) )
    totalCount += counter
  }, {concurrency}).toArray()
  console.timeEnd(`Load ${files.length} files`)
  console.log("Loaded", totalCount, 'total records across files')

  // schedule updates after bulk loading to get the database up to current
  const queue = new Queue(queueName,{connection: bullRedisConnection})
  const job = await queue.add('update-after-bulk', {}, {})
  console.log("Scheduled update job", job.name, job.id)
  await queue.close()
}
// takes about 20 minutes to load all 9 files like this, 10 minutes with new script
await loadAllFiles('downloads') // actual data dir should be mapped with a docker bind volume

/** Prints output from worker thread */
function printOutput(label: string, filename: string, message: string|number|boolean){
  process.stdout.write([label,'>',new Date().toLocaleTimeString(), filename,message.toString().trim()].join('\t')+'\n')
}
