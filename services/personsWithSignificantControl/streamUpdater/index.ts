/*
 listen on companies.stream websocket for any updates to the PSC stream.
 save them in mongo.
 invalidate redis cache if necessary.
 */

import {MongoClient} from "mongodb";
import {getEnv} from "./utils.js";
import {AnyEvent, PscEvent} from "./schemas/AnyEvent.js";
import {addPscIdAndCompanyNumber} from "./transformPscEvent.js";


async function * streamEvents(): AsyncGenerator<AnyEvent, void>{
  const {WebSocket} = await import('ws')
  const {subscribe} = await import( "event-iterator/lib/dom.js");
  const ws = new WebSocket('wss://companies.stream/events')
  for await(const message of subscribe.call(ws, 'message')){
    yield JSON.parse(message.data)
  }
}

const mongo = new MongoClient(getEnv('MONGO_URL'))
await mongo.connect()
for await(const event of streamEvents()){
  await mongo.db('events').collection(event.resource_kind).insertOne(event) // insert into mongo for generating a schema
  const collections = {
    'company-psc-corporate': 'getCorporateEntities',
    'company-psc-individual': 'getIndividual',
    'company-psc-supersecure': 'getSuperSecurePerson',
    'company-psc-legal':'getLegalPersons'
  } as const
  if(event.resource_kind in collections){
    const entity = addPscIdAndCompanyNumber(<PscEvent>event)
    const {company_number, psc_id} = entity
    let collectionName = collections[event.resource_kind]
    const result = await mongo.db('personsWithSignificantControl').collection(collectionName).replaceOne({
      company_number,
      psc_id
    }, entity, {upsert: true})
    console.log('Replace',{company_number, psc_id},'Upserted?',result.upsertedCount === 1)
  }
}

await mongo.close()
