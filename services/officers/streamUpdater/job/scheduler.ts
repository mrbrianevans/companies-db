/*
Schedule a daily job to:
  1. fetch the latest file over SFTP
  2. convert to JSON
  3. (optional) backup to cloud storage bucket
  4. perform update on database
*/




import { Queue, QueueScheduler } from 'bullmq';
import {queueName} from "./queueName.js";
import {bullRedisConnection} from "./bullRedisConnection.js";


const queueScheduler = new QueueScheduler(queueName, {connection: bullRedisConnection, autorun: true})

const queue = new Queue(queueName,{connection: bullRedisConnection})

await queue.add('daily-update', {}, {
  repeat: {pattern: '0 8 * * *'} // 8AM every day
})

queueScheduler.on('failed', (jobId: string, failedReason: Error, prev: string)=>{
  console.log("Job failed: ", jobId, failedReason.message, prev)
})

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', shutdown);

// quit properly on docker stop
process.on('SIGTERM', shutdown)

async function shutdown(){
  console.info('Graceful shutdown commenced', new Date().toISOString());
  await queueScheduler.close()
  await queue.close()
  process.exit(0)
}
