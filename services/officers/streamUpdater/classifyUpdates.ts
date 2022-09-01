import {createReadStream} from "fs";
import {resolve} from "path";
import {pipeline} from "stream/promises";
import split2 from "split2";
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import {classifyUpdateRecord, UpdateTypes} from "./classifyUpdateRecord.js";
import {OfficerUpdateFileRecordWithRecordType} from "../shared/recordParser/FileRecordTypes.js";
import {RecordType} from "../shared/recordParser/RecordTypes.js";

/*
This takes ridiculously long to run. About 6 hours to process 20,000 records for some reason. No idea what takes so long.
 */

const file = 'update-2022-08-03.dat'

console.time('Classify records in update file')
const counts = await pipeline(
  createReadStream(resolve('downloads', file)),
  split2(parseRecord),
  classifyUpdateRecords
).catch(e=>console.log('Pipeline error',e))
console.timeEnd('Classify records in update file')

console.log("Counts of each category:", counts)


async function classifyUpdateRecords(source: AsyncIterable<OfficerUpdateFileRecordWithRecordType>){
  const counts = {COMPANY:0}
  for await(const update of source){
    try{
      if (update.recordType === RecordType.PersonUpdate) {
        const category = await classifyUpdateRecord(update)
        if (UpdateTypes[category] in counts) counts[UpdateTypes[category]]++
        else counts[UpdateTypes[category]] = 1
      } else if (update.recordType === RecordType.Company) {
        counts['COMPANY']++
      }
    }catch (e) {
      console.log("Could not classify: ", update, e)
    }
  }
  return counts
}
