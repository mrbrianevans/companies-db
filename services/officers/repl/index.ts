import {start} from 'node:repl'
import {
  dailyUpdatesQueueName,
  exportBulkQueueName,
  loadBulkQueueName,
  loadSearchQueueName
} from '../shared/bull/queueNames.js'
import {bullRedisConnection} from '../shared/bull/bullRedisConnection.js'
import {getMongoClient, getRedisClient} from '../shared/dbClients.js'
import { Queue } from "bullmq";

if(process.argv.slice(1).includes('--help')) console.log("This is a custom repl for managing the officers service. Try\n\n\t" +
  "docker compose exec repl node index.js")


const server = start({
  prompt: '$ '
})

const queueNames = [dailyUpdatesQueueName, loadSearchQueueName, exportBulkQueueName, loadBulkQueueName]
const queues = Object.fromEntries(queueNames.map(q=>[q, new Queue(q, {connection: bullRedisConnection})]))
const mongo = await getMongoClient()
const redis = await getRedisClient()
server.context.mongo = mongo
server.context.redis = redis
server.context.queueNames = queueNames
server.context.queues = queues
server.defineCommand('q', function(){
  this.clearBufferedCommand()
  console.log('Try await queues[<name>].getMetrics() where <name> is one of these: '+queueNames.join(', '))
  this.displayPrompt()
})
server.on('exit', shutdown) // when the user types .exit or Ctrl+D
process.on('SIGINT', shutdown) // quit on ctrl-c when running docker in terminal
process.on('SIGTERM', shutdown)// quit properly on docker stop
async function shutdown(sig: string){
  console.log("Thank you for using the custom REPL :)")
  console.info('Graceful shutdown commenced', new Date().toISOString(), sig);
  for (const queue in queues){
    await queues[queue].close()
  }
  await redis.quit()
  await mongo.close()
  process.exit(0)
}
