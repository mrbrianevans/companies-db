/*
 listen on companies.stream websocket/official HTTP stream for any updates to the PSC stream.
 save them in mongo.
 invalidate redis cache if necessary.
 */

import {AnyEvent, PscEvent} from "./schemas/AnyEvent.js";
import {addPscIdAndCompanyNumber} from "./transformPscEvent.js";
import {streamEventsContinuously} from "./listenToStream.js";
import { getMongoClient } from "../shared/dbClients.js";


async function * streamEventsWebSocket(): AsyncGenerator<AnyEvent, void>{
  const {WebSocket} = await import('ws')
  const {subscribe} = await import( "event-iterator/lib/dom.js");
  const ws = new WebSocket('wss://companies.stream/events?stream=persons-with-significant-control') // todo: this needs to pick up where left off
  for await(const message of subscribe.call(ws, 'message')){
    yield JSON.parse(message.data)
  }
}

const mongo = await getMongoClient()
for await(const event of streamEventsContinuously<PscEvent>('persons-with-significant-control')){
  const collections = {
    'company-psc-corporate': 'getCorporateEntities',
    'company-psc-individual': 'getIndividual',
    'company-psc-supersecure': 'getSuperSecurePerson',
    'company-psc-legal':'getLegalPersons',
    'corporate-entity-beneficial-owner':'getCorporateBeneficialOwner',
    'individual-beneficial-owner':'getIndividualBeneficialOwner',
  } as const
  if(event.resource_kind in collections){
    const {etag, ...entity} = addPscIdAndCompanyNumber(event)
    const {company_number, psc_id} = entity
    let collectionName = collections[event.resource_kind]
    const result = await mongo.db('personsWithSignificantControl').collection(collectionName).replaceOne({
      company_number,
      psc_id
    }, entity, {upsert: true})
    // console.log('Replace',{company_number, psc_id},'Upserted?',result.upsertedCount === 1)
  }
}

await mongo.close()
