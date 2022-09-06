import {createRedisIndex} from "./createRedisIndex.js";
import {loadIndex} from "./loadRedisIndex.js";
import {Job, Worker as BullWorker} from "bullmq";
import {loadSearchQueueName} from "../shared/bull/queueNames.js";
import {bullRedisConnection} from "../shared/bull/bullRedisConnection.js";


async function processJob(job: Job){
  console.log('Processing job', job.name, 'on queue', job.queueName, job.id)
  await createRedisIndex()

  console.time('Load index')
  await loadIndex()
  console.timeEnd('Load index')
}

const worker = new BullWorker(loadSearchQueueName, processJob, {connection: bullRedisConnection})

process.on('SIGINT', shutdown) // quit on ctrl-c when running docker in terminal
process.on('SIGTERM', shutdown)// quit properly on docker stop
async function shutdown(sig: string){
  console.info('Graceful shutdown commenced', new Date().toISOString(), sig);
  await worker.close(true)
  process.exit(0)
}
