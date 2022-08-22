import {listenToStream} from "./listenToStream.js";
import {on} from "events";
import {MongoClient} from "mongodb";
import {getEnv} from '../shared/utils.js'
import type {CompanyProfileEvent} from "./CompanyProfileEventSchema.js";
import type {CompanyStorage} from '../shared/CompanyStorage.js'


try {
  const mongo = new MongoClient(getEnv('MONGO_URL'))
  await mongo.connect()

  //todo: pick up at left off timepoint (save in redis)
  const eventEmitter = await listenToStream('companies')
  eventEmitter.on('end', () => console.log("Event emitter ended", new Date())) // todo: reconnect if(when) ended
  eventEmitter.on('start', () => console.log("Event emitter started", new Date()))
  eventEmitter.on('error', (e) => console.log("Event emitter errored", new Date(),e))

  for await(const events of on(eventEmitter, 'event')){
    for(const event of <CompanyProfileEvent[]>events){
//todo: extract db name and collection name to ../shared and use in all service components
      const result = await mongo.db('companyProfile').collection<CompanyStorage>('getCompanyProfile')
        .replaceOne({company_number: event.data.company_number}, event.data, {upsert: true})

      const matched = result.matchedCount === 1
      const upserted = result.upsertedCount === 1
      const modified = result.modifiedCount === 1
      // console.log(event.data.company_number, {matched, upserted, modified})
    }
  }

}catch (e) {
  console.log(e)
}
