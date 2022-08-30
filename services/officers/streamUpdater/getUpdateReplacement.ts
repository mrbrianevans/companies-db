import { Readable } from "node:stream";
import { getMongoClient } from "../shared/dbClients.js";
import type {personUpdateTransformer} from "../shared/recordParser/transformers.js";
import {BulkResult, MongoBulkWriteError} from "mongodb";


/**
 * Get a filter and replacement value for the officers collection based on an update file. Used for bulk writes.
 * @param record
 */
export function getUpdateReplacement(record: ReturnType<typeof personUpdateTransformer>){
  const filter = {
    company_number: record.company_number,
    person_number: record.person_number.old,
    officer_role: record.appointment_type.old.officer_role
  }

  const replacement = {
    person_number: record.person_number.new,
    officer_role: record.appointment_type.new.officer_role,
    resigned: record.appointment_type.new.resigned,
    person_number_prefix: record.person_number_prefix.new,
    address: record.address.new,
    appointed_on: record.appointed_on,
    company_number: record.company_number,
    nationality: record.nationality,
    country_of_residence: record.country_of_residence,
    occupation: record.occupation,
    name_elements: record.name_elements,
    date_of_birth: record.date_of_birth,
    appointment_date_origin: record.appointment_date_origin,
    resignation_date_origin: record.resignation_date_origin,
    resigned_on: record.resigned_on,
    is_corporate_officer: record.is_corporate_officer,
    changed_on: record.changed_on,
    updated_on: record.updated_on
  }

  return {filter, replacement}
}

export async function bulkWriteUpdates(updates: AsyncIterable<any>){
  const BulkOpSize = 1998
  function throwIfErr(e: MongoBulkWriteError){
    if(e.code !== 11000) {
      throw e
    }
    return e.result
  }
  const mongo = await getMongoClient()
  const db = mongo.db('officers')
  const buffer: ReturnType<typeof getUpdateReplacement>[] = []
  let counter = 0, stats = {matched: 0, inserted: 0, modified: 0, upserted: 0}
  function addStats(res: BulkResult){
    stats.matched += res.nMatched
    stats.inserted += res.nInserted
    stats.modified += res.nModified
    stats.upserted += res.nUpserted
  }
  for await(const item of Readable.from(updates)){
      buffer.push(getUpdateReplacement(item))
      if(buffer.length === BulkOpSize){
        const items = buffer.splice(0, buffer.length)
        const res = await db.collection('officers')
          .bulkWrite(items.map(comp => ({replaceOne: {...comp, upsert: true}})),{ ordered: true }).catch(throwIfErr)
        counter += items.length
        addStats(res.result)
      }
  }
  {
    const items = buffer.splice(0, buffer.length)
    const res = await db.collection('officers')
      .bulkWrite(items.map(comp => ({replaceOne: {...comp, upsert: true}})),{ ordered: true }).catch(throwIfErr)
    counter += items.length
    addStats(res.result)
  }

  await mongo.close()
  return {counter, stats}
}
