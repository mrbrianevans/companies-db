

/*

Loop through MongoDB and load their names into Redis.

*/


import {OfficerStorage} from '../shared/storageTypes/Officer.js'
import {getMongoClient} from '../shared/dbClients.js'
import {writeRedis} from '../shared/bulkWriteRedis.js'
import {pipeline} from "stream/promises";
import {Transform, TransformCallback} from 'stream'

export async function loadIndex(){
  const mongo = await getMongoClient()

  const inserter = writeRedis({prefix: 'officer'})
  const transformer = new Transform({
    objectMode: true,
    transform(chunk: {person_number:number, name_elements: Record<string,string>}, encoding: BufferEncoding, callback: TransformCallback) {
      try{
        callback(null, {id:chunk.person_number,value:chunk.name_elements})
      }catch (e) {
        callback(e)
      }
    }
  })
  const officers = mongo.db('officers')
    .collection<OfficerStorage>('officers')
    .find({resigned: false},{projection: {name_elements:1,person_number:1}})// title and honours only adds 5MB per million
    .stream()
  const {counter} = await pipeline(officers, transformer, inserter).catch(e=> {
    console.log('pipeline error', e)
    return {counter:0}
  })
  console.log('Loaded', counter, 'records into Redis')
  await mongo.close()
}
