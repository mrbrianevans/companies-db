import {queueName} from "./queueName.js";
import { Worker, Job } from 'bullmq';
import {Temporal} from "@js-temporal/polyfill";
import { streamUpdateFile } from "../downloadUpdateFile.js";
import { loadUpdateFile } from "../loadUpdate.js";
import { getRedisClient } from "../../shared/dbClients.js";
import { getEnv } from "../../shared/utils.js";

const redisUrl = new URL(getEnv('REDIS_URL'))

const worker = new Worker(queueName, async (job: Job) => {
  console.log('Worker running', job.name)
  const today = Temporal.Now.plainDateISO('UTC')
  const {year,month,day} = today
  const updateFile = await streamUpdateFile({year,month,day}, true)
  const count = await loadUpdateFile(updateFile)

  return count
},
  {connection: {host: redisUrl.hostname, port: parseInt(redisUrl.port, 10) || undefined }}
)

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', shutdown);

// quit properly on docker stop
process.on('SIGTERM', shutdown)

async function shutdown(){
  console.info('Graceful shutdown commenced', new Date().toISOString());
  if(worker.isRunning()){
    console.log("Worker process forcefully stopped while worker was processing")
  }
  await worker.close(true)
  process.exit(0)
}
