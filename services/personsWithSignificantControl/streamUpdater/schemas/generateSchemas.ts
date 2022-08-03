

/*
 - get events: (either)
   - listen on stream
   - loop through saved events in a MongoDB collection
 - for each event, merge the schema with genson
 - save schema in JSON file

 */

import {getEnv} from "../utils.js";
import {extendSchema, createSchema} from "genson-js";
import {writeFile} from "fs/promises";
import camelcase from "camelcase";
import {setTimeout} from "timers/promises";
const capitalize = ([first, ...rest]: string, lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''));
/**
 * Stream events from websocket as an Async Generator.
 * @param resourceKind - resource_kind such as 'filing-history'
 * @param limit - number of events to emit before exiting
 */
async function * streamEvents(resourceKind: string,limit = 10){
  const {WebSocket} = await import('ws')
  const {subscribe} = await import( "event-iterator/lib/dom.js");
  const ws = new WebSocket('wss://companies.stream/events')
  let counter = 0
  for await(const message of subscribe.call(ws, 'message')){
    yield JSON.parse(message.data)
    if(counter++ > limit) break;
  }
}

/**
 * Async Generator of events stored in MongoDB collection named after resource_kind in 'events' db.
 * @param resourceKind - resource_kind such as 'filing-history'
 * @param limit - max number of events to get from database
 */
async function * savedEvents(resourceKind: string,limit = 10000){
  const {MongoClient} = await import('mongodb')
  const mongo = new MongoClient(getEnv('MONGO_URL'))
  await mongo.connect()
  const collection = mongo.db('events').collection(resourceKind)
  const count = await collection.countDocuments()
  console.log({count}, 'for', resourceKind)
  for await(const {_id, ...event} of collection.aggregate([{$sample:{size:limit}}]))
    yield event
  await mongo.close()
}

async function getKinds(){
  const {MongoClient} = await import('mongodb')
  const mongo = new MongoClient(getEnv('MONGO_URL'))
  await mongo.connect()
  const kinds = await mongo.db('events').listCollections({},{nameOnly:true}).map(k=>k.name).toArray()
  await mongo.close()
  return kinds
}

// const kinds = [
//   'company-charges',
//   'company-insolvency',
//   'company-officers',
//   'company-profile',
//   'company-psc-corporate',
//   'company-psc-individual',
//   'company-psc-legal',
//   'company-psc-supersecure',
//   'filing-history',
// ]

const kinds = await getKinds()
console.log({kinds})
for (const kind of kinds){
  const events = savedEvents(kind)
  const name = capitalize(camelcase(kind))
  const firstEvent = await events.next().then(e=>e.value)
  if(firstEvent === undefined) continue
  let schema = createSchema(firstEvent, {noRequired: false})
  for await(const event of events){
    schema = extendSchema(schema, event, {noRequired: false})
  }
  // @ts-ignore
  schema.properties.resource_kind = {"const": kind}
  // @ts-ignore
  schema.additionalProperties = false
  schema.required = Object.keys(firstEvent)
  const content = `
  import {FromSchema} from "json-schema-to-ts";
  
  export const ${name}Schema = ${JSON.stringify(schema, null, 2)} as const
  
  export type ${name} = FromSchema<typeof ${name}Schema>
  
  const sample${name}: ${name} = ${JSON.stringify(firstEvent, null, 2)}
  `
  await writeFile('schemas/'+name+'.ts', content)
  console.log("Schema for", kind, 'written')
}

await writeFile('schemas/AnyEvent.ts', `
${kinds.map(k=>`import {${capitalize(camelcase(k))}} from './${capitalize(camelcase(k))}.js'`).join('\n')}

export type AnyEvent = ${kinds.map(k=>capitalize(camelcase(k))).join(' | ')}
export type PscEvent = ${kinds.filter(k=>k.includes('psc')).map(k=>capitalize(camelcase(k))).join(' | ')}
`)

await setTimeout(60000)
console.log('Exiting')
export { };

