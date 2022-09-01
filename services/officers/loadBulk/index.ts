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
const concurrency = 9

/**
 * Load all files in a directory into MongoDB.
 * @param directory - the directory path containing the data files.
 * @param limit - the max number of files to load.
 */
async function loadAllFiles(directory: string, limit ?:number){
  const files = await readdir(directory)
  let totalCount = 0
  console.time(`Load ${limit??files.length} files`)
  // @ts-ignore
  await Readable.from(files).take(limit??files.length).map(async (filename)=>{
    const filepath = resolve(directory, filename)
    const workerFilename = await import.meta.resolve?.call({}, './simpleBulkLoadChunk.js').then(f=>new URL(f)) ?? './simpleBulkLoadChunk.js'
    const w = new Worker(workerFilename, {argv: [filepath], stdout:true, env: {MONGO_URL: getEnv('MONGO_URL')}})
    w.on('error', err => printOutput('Error', filename, err.message))
    // trying to prefix all worker output with the filename being processed.
    w.stdout.on('data', (d:Buffer)=>printOutput('',filename, d.toString('utf8')))
    const [{counter,stats}] = await once(w, 'message') // worker only messages at end of process
    printOutput('Msg', filename, JSON.stringify({counter, stats}) )
    totalCount += counter
  }, {concurrency}).toArray()
  console.timeEnd(`Load ${limit??files.length} files`)
  console.log("Loaded", totalCount, 'total records across files')
}
// takes about 20 minutes to load all 9 files like this, 10 minutes with new script
await loadAllFiles('N:\\CompaniesHouse\\officersdata\\Prod216_3232')

/** Prints output from worker thread */
function printOutput(label: string, filename: string, message: string|number|boolean){
  process.stdout.write([label,'>',new Date().toLocaleTimeString(), filename,message.toString().trim()].join('\t')+'\n')
}
