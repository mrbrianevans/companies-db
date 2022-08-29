//
// load officers bulk file into mongo
// parse file line by line, inserting each record into the appropriate collection as it loops through
// for each line:
//  - determine the record type
//  - parse into an object (with modifications, such as enums)
//  - insert
// split chunks into worker_threads
import {Worker} from "node:worker_threads";
import {Readable} from "node:stream";
import {once} from "node:events";
import {readdir} from "fs/promises";
import { resolve } from "node:path";
const concurrency = 9

/**
 * Load all files in a directory into MongoDB.
 * @param directory - the directory path containing the data files.
 * @param limit - the max number of files to load.
 */
async function loadAllFiles(directory: string, limit ?:number){
  const files = await readdir(directory)
  console.time(`Load ${limit??files.length} files`)
  // @ts-ignore
  await Readable.from(files).take(limit??files.length).map(async (filename)=>{
    const filepath = resolve(directory, filename)
    const workerFilename = await import.meta.resolve?.call({}, './simpleBulkLoadChunk.js').then(f=>new URL(f)) ?? './simpleBulkLoadChunk.js'
    const w = new Worker(workerFilename, {argv: [filepath], workerData: {}, stdout:true})
    w.on('error', function(err){
      console.log('Error in processing worker', filename, err.message)
    })
    // trying to prefix all worker output with the filename being processed.
    w.stdout.on('data', d=>process.stdout.write(['','>',filename,d].join('\t')))
    const [output] = await once(w, 'message') // worker only messages at end of process
    //todo: output contains a count of the records inserted. This should add up the counts and print a total at the end.
    console.log("Output from worker", filename, output)
  }, {concurrency}).toArray()
  console.timeEnd(`Load ${limit??files.length} files`)
}
// takes about 20 minutes to load all 9 files like this, 10 minutes with new script
await loadAllFiles('N:\\CompaniesHouse\\officersdata\\Prod195_3243')
