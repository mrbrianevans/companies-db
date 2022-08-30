import {Readable} from "node:stream";
import {getMongoClient} from "./dbClients.js";
import {RecordType} from "./recordParser/RecordTypes.js";
import {MongoBulkWriteError} from "mongodb";

/*

This inserter was made to replace MongoInserter (which was loosing records). By using AsyncIterators,
it ensures that every record is processed before the promise is fulfilled.

Using BulkWrites is more efficient than normal inserts. Using .insert() is more efficient than findOneAndReplace({upsert:true}).
Just make sure there is a unique index to enforce no-duplicates.

If the script gets stuck, try restarting the database to clear locked operations.

 */

export const writeMongo = (recordTypeField: string, recordTypes:{collection:string,value:any}[], dbName:string, processUnrecognisedRecords:(item:any)=>void = console.log, BulkOpSize = 1998) =>
  async function(source: Readable){
  function throwIfErr(e: MongoBulkWriteError){
    if(e.code !== 11000) throw e
    return e.result
  }
  const mongo = await getMongoClient()
  const db = mongo.db(dbName)
  const buffers = Object.fromEntries(recordTypes.map(r=>[r.collection, <any[]>[]]))
  let counter = 0, inserted = Object.fromEntries(recordTypes.map(r=>[r.collection, 0]))
  for await(const item of source){
    const recordType = recordTypes.find(r=>r.value === item[recordTypeField])
    if(!recordType) processUnrecognisedRecords(item)
    else {
      delete item[recordTypeField]
      buffers[recordType.collection].push(item)
      if(buffers[recordType.collection].length === BulkOpSize){
        const items = buffers[recordType.collection].splice(0, buffers[recordType.collection].length)
        const res = await db.collection(recordType.collection)
          .bulkWrite(items.map(comp => ({insertOne: comp})),{ ordered: false }).catch(throwIfErr)
        counter += items.length
        inserted[recordType.collection] += res.nInserted
      }
    }
  }
  for(const recordType of recordTypes){
    const items = buffers[recordType.collection].splice(0, buffers[recordType.collection].length)
    const res = await db.collection(recordType.collection)
      .bulkWrite(items.map(comp => ({insertOne: comp})),{ ordered: false }).catch(throwIfErr)
    counter += items.length
    inserted[recordType.collection] += res.nInserted
  }

  await mongo.close()
  return {counter, inserted}
}
