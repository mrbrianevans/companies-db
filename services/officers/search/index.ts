import {createRedisIndex} from "./createRedisIndex.js";
import {loadIndex} from "./loadRedisIndex.js";
import {performSearch} from "../shared/search/performSearch.js";

process.on('SIGINT', shutdown) // quit on ctrl-c when running docker in terminal
process.on('SIGTERM', shutdown)// quit properly on docker stop
async function shutdown(sig: string){
  console.info('Graceful shutdown commenced', new Date().toISOString(), sig);
  process.exit(0)
}


await createRedisIndex()


console.time('Load index')
await loadIndex()
console.timeEnd('Load index')



console.time('Search index')
const res = await performSearch('james @surname:"coombe"') // query language
console.timeEnd('Search index')
console.log("result:", res)
