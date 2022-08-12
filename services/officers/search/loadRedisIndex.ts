

/*

Loop through MongoDB and load their names into Redis.

*/


import {OfficerStorage} from '../shared/storageTypes/Officer.js'
import {getMongoClient} from '../shared/dbClients.js'
import {RedisInserter} from "./RedisInserter.js";
import {pipeline} from "stream/promises";


async function loadIndex(){
  const mongo = await getMongoClient()

  const inserter = new RedisInserter('officer')
  const officers = mongo.db('officers')
    .collection<OfficerStorage>('officers')
    .find({},{projection: {name:1,personNumber:1}})
    .skip(1_000_000)
    .map(o=>({id:o.personNumber,value:o.name})).stream()
  await pipeline(officers, inserter)

  await mongo.close()
}

console.time('Load index')
await loadIndex()
console.timeEnd('Load index')
