/*

Strategy for bulk exports:

 - daily job to create exports and upload them to Google Cloud
 - (nice to have) multiple exports for filters like resigned=false
 - (might be in another component, eg web-service) generate a signed URL to the GCP object for users to download
 - export to JSON and CSV
 -

 */


import {officerCollectionName} from '../shared/storageTypes/Officer.js';
import {exportBulkQueueName} from "../shared/bull/queueNames.js";
import {bullRedisConnection} from "../shared/bull/bullRedisConnection.js";
import {Job, Worker as BullWorker} from "bullmq";
import {exportCollection} from "./exportCollection.js";

const ac = new AbortController()
const {signal} = ac

async function processJob(job: Job){
  console.log('Processing job', job.name, 'on queue', job.queueName, job.id)
  //todo: could get export options from job data with sensible defaults
  console.time('Export officers')
  await exportCollection({collectionName: officerCollectionName, uniqueIndex:{
      company_number: 1, person_number:  1, officer_role:  1, appointed_on:  1}, limit: 500_000, signal, type:'json'})
  console.timeEnd('Export officers')
}

const worker = new BullWorker(exportBulkQueueName, processJob,{connection: bullRedisConnection})

process.on('SIGINT', shutdown) // quit on ctrl-c when running docker in terminal
process.on('SIGTERM', shutdown)// quit properly on docker stop
async function shutdown(sig: string){
  console.info('Graceful shutdown commenced', new Date().toISOString(), sig);
  ac.abort() // this signals to the function to finish the current record and then exit, closing connections and files
  await worker.close()
  process.exit()
}
