/*
 listen on companies.stream websocket for any updates to the PSC stream.
 save them in mongo.
 invalidate redis cache if necessary.
 */


import WebSocket from 'ws'
import {PscEvent} from "./eventTypes.js";
import {MongoClient} from "mongodb";
import {getEnv} from "./utils.js";
import {CorporatePscStorage} from "../shared/storageTypes/corporatePscStorage.js";
import {AnyEvent} from "./schemas/AnyEvent.js";

const ws = new WebSocket('wss://companies.stream/events')
ws.on('open', ()=>console.log('WebSocket opened'))
const mongo = new MongoClient(getEnv('MONGO_URL'))
await mongo.connect()
ws.on('close', async () => {
  await mongo.close()
})

export function transformCorporatePsc(bulkCorporatePsc): CorporatePscStorage{
  const psc_ids = bulkCorporatePsc.data.links.self.match(/\/company\/([A-Z\d]{8})\/persons-with-significant-control\/corporate-entity\/(.+)/)
  if(!psc_ids) throw new Error('Cannot match PSC ID for record from bulk file: '+JSON.stringify(bulkCorporatePsc.data.links))
  const [,company_number,psc_id] = psc_ids
  return {...bulkCorporatePsc.data, psc_id, company_number}
}
//todo: get event types for the different types of PSC events, get a schema for each kind, and then make a transform function to convert it to the database format.

ws.on('message', async (message) => {
  const event: AnyEvent = JSON.parse(message.toString())
  await mongo.db('events').collection(event.resource_kind).insertOne(event) // insert into mongo for generating a schema
  switch (event.resource_kind) {
    case "company-psc-corporate":
      const entity = transformCorporatePsc(event)
      const {company_number, psc_id} = entity
      console.log('Replace one',{company_number,psc_id})
      // await mongo.db('').collection<CorporatePscStorage>('').replaceOne({company_number,psc_id}, entity)
      break;
    case "company-psc-individual":
      console.log(event.data.kind)
      break;

  }
})

