/*

Strategy for bulk exports:

 - daily job to create exports and upload them to Google Cloud
 - (nice to have) multiple exports for filters like resigned=false
 - (might be in another component, eg web-service) generate a signed URL to the GCP object for users to download
 - export to JSON and CSV
 -

 */


import {getMongoClient, mongoDbName} from '../shared/dbClients.js';
import {officerCollectionName, OfficerStorage} from '../shared/storageTypes/Officer.js';
import SonicBoom from "sonic-boom";
import { once } from 'node:events';

type ExportType = 'csv'|'json'
interface ExportCollectionOptions{
  collectionName: string,
// sort is used to ensure the same order in every export. All uniquely indexed fields must be used in sort.
  uniqueIndex: Record<string, 1 | -1 >,
  type?:ExportType,
  outputName?: string,
  limit?:number,
  signal?: AbortSignal,
  // directory to save export in
  outDir?: string
}

// this can go at 40 seconds per million
async function exportCollection({collectionName, uniqueIndex, type = 'csv', outputName = collectionName + '.' + type,limit=Infinity, signal, outDir = 'exports'}:ExportCollectionOptions){
  const mongo = await getMongoClient()
  const collection = mongo.db(mongoDbName).collection<OfficerStorage>(collectionName)

  const count = limit ?? await collection.estimatedDocumentCount()
  console.log("Exporting", count, collectionName)

  const file = new SonicBoom({dest: outputName, mkdir: true})
  let wroteCount = 0, slowDownCount = 0
  const officers = collection.find().sort(uniqueIndex).limit(limit)
  for await(const officer of officers.stream()){
    if(signal?.aborted) break
    const slowDown = file.write(stringifyRecord(officer, type))
    if(slowDown) slowDownCount++
    wroteCount++
  }
  console.log(new Date(), "Needed to slow down", slowDownCount, 'times')
  file.end()
  await once(file, 'finish')
  await mongo.close()
  console.log(new Date(), "Finished writing to", outputName, wroteCount, 'records')
  signal?.dispatchEvent(new Event('finished'))
}

function stringifyRecord(record: any, type: ExportType): string{
  if(type === 'json'){
    // this can be made faster by using a JSONSchema compiled stringify function such as https://github.com/fastify/fast-json-stringify
    return JSON.stringify(record) + '\n'
  }else if(type === 'csv'){
    // this probably needs to be done by an external package such as Papa
    return Object.values(record).join(',')
  }else{
    return 'Unrecognised export type: '+type
  }
}


const ac = new AbortController()
const {signal} = ac

process.on('SIGINT', shutdown) // quit on ctrl-c when running docker in terminal
process.on('SIGTERM', shutdown)// quit properly on docker stop
async function shutdown(sig: string){
  console.info('Graceful shutdown commenced', new Date().toISOString(), sig);
  signal.addEventListener('finished', ()=>process.exit(0)) // only exit when async function sends event
  ac.abort() // this signals to the function to finish the current record and then exit, closing connections and files
}

console.time('Export officers')
await exportCollection({collectionName: officerCollectionName, uniqueIndex:{
  company_number: 1, person_number:  1, officer_role:  1, appointed_on:  1}, limit: 500_000, signal, type:'json'})
console.timeEnd('Export officers')
