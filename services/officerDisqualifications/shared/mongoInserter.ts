import {AnyBulkWriteOperation, BulkResult, MongoBulkWriteError} from "mongodb";
import {Readable} from "node:stream";
import {getMongoClient} from "./dbClients.js";

// modified from companyProfile service on 25/11/2022

interface MongoBulkWriterOpts{
  /**
   * number of operations to send to server in each batch. Buffers operations up to this amount.
   * @default 1998
   */
  BulkOpSize?: number,
  /**
   * whether the operations must remain in order. Recommended for update operations, but not necessary for inserts or deletes. Faster when ordered=false.
   * @default false
   */
  ordered?: boolean
  /**
   * a function to process any records which don't match a value in recordTypes. Defaults to logging to console.
   * @default console.log
   */
  processUnrecognisedRecords?:(item:any)=>void
}

/**
 * Bulk writer for performing many MongoDB operations efficiently.
 * Can do replace, update, delete and insert operations.
 * @param recordTypeField - a field in each record which identifies which type of record it is. This field is deleted before being passed to the mapper function. Special value null means all records will be classed as the first recordType.
 * @param recordTypes - an array of the different types of records which could be passed. For each record type, it needs a `collection` name to operate on, the `value` that indicates a record is this type, and a `mapper` function which converts a record of this type to a Mongo BulkWriteOperation.
 * @param dbName - name of MongoDB database to perform operations on.
 * @param opts - options for the writer. See individual options for more documentation.
 */
export const mongoBulkWriter = (recordTypeField: string|null, recordTypes:{collection:string,value:any, mapper: (val: any)=>AnyBulkWriteOperation}[], dbName:string, {BulkOpSize = 1998, processUnrecognisedRecords = console.log, ordered = false}: MongoBulkWriterOpts={}) =>
  async function(source: Readable){
    function throwIfErr(e: MongoBulkWriteError){
      if(e.code !== 11000) throw e
      return e.result
    }
    const mongo = await getMongoClient()
    const db = mongo.db(dbName)
    const buffers = Object.fromEntries(recordTypes.map(r=>[r.collection, <any[]>[]]))
    let counter = 0, stats = Object.fromEntries(recordTypes.map(r=>[r.collection, {matched: 0, inserted: 0, modified: 0, upserted: 0, removed: 0, errors: 0}]))

    function addStats(collection,res: BulkResult){
      stats[collection].matched += res.nMatched
      stats[collection].inserted += res.nInserted
      stats[collection].modified += res.nModified
      stats[collection].upserted += res.nUpserted
      stats[collection].removed += res.nRemoved
      stats[collection].errors += res.writeErrors.length
    }
    // perform a bulk operation for a record type. modifies the buffer for that record type by removing all items.
    async function bulkOp(recordType) {
      const items = buffers[recordType.collection].splice(0, buffers[recordType.collection].length)
      if (items.length > 0) {
        const res = await db.collection(recordType.collection)
          .bulkWrite(items.map(comp => recordType.mapper(comp)), {ordered}).catch(throwIfErr)
        counter += items.length
        addStats(recordType.collection, res.result)
      }
    }
    for await(const item of source){
      const recordType = recordTypeField === null ? recordTypes[0] : recordTypes.find(r=>r.value === item[recordTypeField])
      if(!recordType) processUnrecognisedRecords(item)
      else {
        if(recordTypeField !== null) delete item[recordTypeField]
        buffers[recordType.collection].push(item)
        if(buffers[recordType.collection].length === BulkOpSize){
          await bulkOp(recordType)
        }
      }
    }
    for(const recordType of recordTypes){
      await bulkOp(recordType)
    }

    await mongo.close()
    return {counter, stats}
  }

  interface SingleMongoBulkWriterOptions extends Omit<MongoBulkWriterOpts, 'processUnrecognisedRecords'>{
  /** the name of the Mongo collection to write to. */
  collection: string,
    /** the name of the Mongo database to write to. */
    dbName: string,
    /** a function which maps each value in the stream to a Mongo operation. Defaults to inserting. */
    mapper?: (val: any)=>AnyBulkWriteOperation
  }

  // added using the companyProfile inserter

/**
 * A simplified mongo bulk writer designed for cases where there is only one "record type" being inserted into one collection.
 * Just a wrapper around mongoBulkWriter which takes optimised parameters.
 */
export const singleMongoBulkWriter = ({collection, dbName, mapper, ...otherOptions}: SingleMongoBulkWriterOptions) =>
  mongoBulkWriter(null,
    [{collection, value: null, mapper: mapper ?? (val => ({insertOne: val}))}],
    dbName, {processUnrecognisedRecords: ()=>{}, ...otherOptions})
