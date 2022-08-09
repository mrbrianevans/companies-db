//todo:
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
  await Readable.from(files).take(limit??total).map(async (filename)=>{
    const filepath = resolve(directory, filename)
    const w = new Worker('./loadChunk.js', {argv: [filepath], workerData: {}})
    const [output] = await once(w, 'message') // worker only messages at end of process
    console.log("Output from worker", filename, output)
  }, {concurrency}).toArray()
  console.timeEnd(`Load ${limit??files.length} files`)
}

await loadAllFiles('N:\\CompaniesHouse\\officersdata\\Prod195_2898')
