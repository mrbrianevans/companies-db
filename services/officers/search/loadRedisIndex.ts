

/*

Loop through MongoDB and load their names into Redis.

*/


import {MongoClient} from "mongodb";
import {OfficerStorage} from '../shared/storageTypes/Officer.js'
import {getEnv} from '../shared/utils.js'
import {createClient, RediSearchSchema, SchemaFieldTypes, SchemaTextFieldPhonetics} from "redis"
import {RedisInserter} from "./RedisInserter.js";
import {Readable} from "stream";
import {pipeline} from "stream/promises";

async function getRedisClient(){
  const redis = createClient({url: getEnv('REDIS_URL')})
  await redis.connect()
  return redis
}

async function getMongoClient(){
  const mongo = new MongoClient(getEnv('MONGO_URL'))
  await mongo.connect()
  return mongo
}

async function createIndex(){
  const redis = await getRedisClient()
  // for indexing names, stemming is disabled, but phonetic matching is enabled so that John will also match Jon.
  const schema: RediSearchSchema = {
    forenames: {type:SchemaFieldTypes.TEXT,NOSTEM: true,PHONETIC:SchemaTextFieldPhonetics.DM_EN},
    surname: {type:SchemaFieldTypes.TEXT,NOSTEM: true,PHONETIC:SchemaTextFieldPhonetics.DM_EN}
    // title and honours are not indexed, but are stored in the hash
  }
  await redis.ft.CREATE('names', schema, {ON:'HASH', PREFIX: 'officer:',NOOFFSETS: true,NOFREQS:true})
  await redis.quit()
}

async function loadIndex(){
  const mongo = await getMongoClient()

  const inserter = new RedisInserter('officer')
  const officers = mongo.db('officers')
    .collection<OfficerStorage>('officers')
    .find({},{projection: {name:1,personNumber:1}})
    .skip(1_000_000)
    .map(o=>({id:o.personNumber,value:o.name}))
  await pipeline(Readable.from(officers), inserter)

  await mongo.close()
}

async function searchIndex(searchTerm: string){
  const redis = await getRedisClient()
  const res = await redis.ft.search('names', searchTerm, {LIMIT: {size:3,from:0}})
  await redis.quit()
  return res.documents.map(d=>d.value).map(n=>[n.title, n.forenames, n.surname, n.honours ? `(${n.honours})`:''].join(' ').trim())
}

console.time('Load index')
await loadIndex()
console.timeEnd('Load index')

console.time('Search index')
const res = await searchIndex('james coombe'||'MARCIN NAKONOWSKI')
console.timeEnd('Search index')
console.log("result:", res)
