import {Readable} from "node:stream";
import {once} from 'node:events'
import {MongoClient} from "mongodb";
import {getEnv} from "./utils.js";
import {getLogger} from "../shared/lokiLogger.js";
import {Worker} from "worker_threads";
/*
Downloads small 60mb chunks of the dataset (concurrently), unzips, parses and inserts into Mongo.
Much faster on multi-cored machines. Set MAX_CONCURRENCY environment variable to control concurrency.
 */
const DB_NAME = 'personsWithSignificantControl';
const concurrency = process.env.MAX_CONCURRENCY ? parseInt(process.env.MAX_CONCURRENCY) : 10
const logger = getLogger('loader', false)
async function loadAllFiles(total = 22, limit=total, skip = 0){
  logger.info('Bulk loading PSC. Total files=%i, limit=%i, skip=%i', total, limit, skip)
  console.time(`Load ${limit??total} files`)
  const segments = Array.from({length:total},(v,i)=>i+1)
  // @ts-ignore
  await Readable.from(segments).drop(skip).take(limit??total).map(async (i)=>{
    const w = new Worker('./loaderWorker.js', {argv: [i, total], workerData: {DB_NAME}})
    const [output] = await once(w, 'message') // worker only messages at end of process
    console.log("Output from worker", i, output)
    logger.info({output}, 'Worker %i %s', i, JSON.stringify(output))
  }, {concurrency}).toArray()
  console.timeEnd(`Load ${limit??total} files`)
}
const collections = ['getIndividual','getLegalPersons','getCorporateEntities','getSuperSecurePerson','getStatement','getExemptions']
/**
 * Creates collections with compression and an index on pscId (if not exists).
 */
async function createIndexes(){
  // the index creation logic is now in a startup script for the mongo database, so that there is never a database which does not have the required indexes, as this poses a serious performance risk
  const mongo = new MongoClient(getEnv('MONGO_URL'))
  await mongo.connect()
  for (const collection of collections) {
    const exists = await mongo.db(DB_NAME)
      .listCollections({ name: collection })
      .toArray()
      .then((a) => a.length)
    if (!exists) {
      console.log("Collection does not exist. Cannot do bulk operation without compression and index", {DB_NAME, collection})
    }
  }
  await mongo.close()
}

await createIndexes()
await loadAllFiles(22)
