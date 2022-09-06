import {dailyUpdatesQueueName} from "../../shared/bull/queueNames.js";
import { Worker, Job } from 'bullmq';
import {applyUpdatesSince} from "../loadUpdate.js";
import {getProductionDate} from "../../shared/lock/productionDate.js";
import {bullRedisConnection} from "../../shared/bull/bullRedisConnection.js";

const ac = new AbortController()
const {signal} = ac
async function processJob(job: Job){
  console.log(new Date(),'Update worker running', job.name, job.id)
  const lastProductionDate = await getProductionDate()
  const {totalCount, numUpdateFiles, untilDate} = await applyUpdatesSince(lastProductionDate, {ensureDownloaded: true, signal})
  console.log( new Date(), `Applied ${numUpdateFiles} update files, a total of ${totalCount} updates, since ${lastProductionDate.toString()}, until ${untilDate.toString()}`)
  await job.log(`Applied ${numUpdateFiles} update files, a total of ${totalCount} updates, since ${lastProductionDate.toString()}`)
  return {totalCount, numUpdateFiles, lastProductionDate:lastProductionDate.toString()}
}

const worker = new Worker(dailyUpdatesQueueName, processJob,{connection: bullRedisConnection}) // starts a worker listening for jobs

process.on('SIGINT', shutdown) // quit on ctrl-c when running docker in terminal
process.on('SIGTERM', shutdown)// quit properly on docker stop
async function shutdown(sig: string){
  console.info('Graceful shutdown commenced', new Date().toISOString(), sig);
  ac.abort() // this signals to the worker to finish the current file and then quit.
  await worker.close(false)
  process.exit(0)
}
