import {listenToStream} from "./listenToStream.js";
import {on} from "events";
import {MongoClient} from "mongodb";
import {getEnv} from '../shared/utils.js'
import {setTimeout} from "timers/promises";
import type {CompanyProfileEvent} from "./CompanyProfileEventSchema.js";
import {companyCollectionName, CompanyStorage} from '../shared/CompanyStorage.js'
import {getMongoClient, getRedisClient, mongoDbName} from '../shared/dbClients.js'


const streamTimepointKey = 'streams:timepoint:companies'
try {
  while(true) {//  reconnect if(when) ended
    const mongo = await getMongoClient()
    const redis = await getRedisClient()
    const ac = new AbortController()
    const {signal} = ac

    //pick up at left off timepoint (saved in redis)
    const previousTimepoint = await redis.get(streamTimepointKey)
    if(previousTimepoint) console.log("Picking up from previous time point:",previousTimepoint)
    const eventEmitter = await listenToStream('companies', previousTimepoint?parseInt(previousTimepoint):undefined)
    eventEmitter.on('end', () => {
      console.log("Event emitter ended", new Date())
      ac.abort()
    })
    eventEmitter.on('start', () => console.log("Event emitter started", new Date()))
    eventEmitter.on('error', (e) => console.log("Event emitter errored", new Date(), e))
    let counter = 0, lastTimepoint:number|null = null
    try{
      for await(const events of on(eventEmitter, 'event',{signal})) {
        for (const event of <CompanyProfileEvent[]>events) {
          counter++
          const result = await mongo.db(mongoDbName).collection<CompanyStorage>(companyCollectionName)
            .replaceOne({company_number: event.data.company_number}, event.data, {upsert: true})
          await redis.set(streamTimepointKey, event.event.timepoint)
          lastTimepoint = event.event.timepoint
          // const matched = result.matchedCount === 1
          // const upserted = result.upsertedCount === 1
          // const modified = result.modifiedCount === 1
          // console.log(event.data.company_number, {matched, upserted, modified})
        }
      }
    }catch (e) {
      if(e.code !== 'ABORT_ERR') throw e
    }
    console.log("End of loop after", counter, 'events. Will restart in 60 seconds. Last timepoint:', lastTimepoint)
    await setTimeout(60_000) // wait a minute before reconnecting
    await mongo.close()
    await redis.quit()
  }
}catch (e) {
  console.log("Exiting update script due to failure to connect to Streaming API.")
  console.log(e)
}
