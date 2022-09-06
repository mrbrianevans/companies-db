import {start} from 'node:repl'
import {queueName} from '../shared/bull/queueName.js'
import {bullRedisConnection} from '../shared/bull/bullRedisConnection.js'
import {getMongoClient, getRedisClient} from '../shared/dbClients.js'
import { Queue } from "bullmq";

if(process.argv.slice(1).includes('--help')) console.log("This is a custom repl for managing the officers service. Try\n\n\t" +
  "docker compose exec repl node index.js")


const server = start({
  prompt: '$ '
})

const queue = new Queue(queueName,{connection: bullRedisConnection})
const mongo = await getMongoClient()
const redis = await getRedisClient()
server.context.mongo = mongo
server.context.redis = redis
server.context.queue = queue

server.on('exit', shutdown) // when the user types .exit or Ctrl+D
process.on('SIGINT', shutdown) // quit on ctrl-c when running docker in terminal
process.on('SIGTERM', shutdown)// quit properly on docker stop
async function shutdown(sig: string){
  console.log("Thank you for using the custom REPL :)")
  console.info('Graceful shutdown commenced', new Date().toISOString(), sig);
  await queue.close()
  await redis.quit()
  await mongo.close()
  process.exit(0)
}
