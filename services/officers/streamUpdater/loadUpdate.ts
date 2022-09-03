import split2 from 'split2'
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import type {Readable} from "stream";
import {pipeline} from "stream/promises";
import {
  getCompanyReplacement,
  getPersonUpdateReplacement
} from "./processUpdates/getUpdateReplacement.js";
import {downloadAllInRange} from "./downloadUpdateFile.js";
import {readdir} from "fs/promises";
import {Temporal} from "@js-temporal/polyfill";
import {createReadStream} from "fs";
import {resolve} from "path";
import {setProductionDate} from "../shared/lock/productionDate.js";
import { OfficerUpdateFileRecordWithRecordType } from '../shared/recordParser/FileRecordTypes.js';
import { RecordType } from '../shared/recordParser/RecordTypes.js';
import { writeMongoCustom } from '../shared/bulkWriteMongo.js';


async function processHeaderAndTrailer(record: OfficerUpdateFileRecordWithRecordType){
  if(record.recordType === RecordType.Header){
    const {day, month, year} = record['Production Date']
    return {
      recordType: RecordType.Header,
      productionDate: {day: parseInt(day), month: parseInt(month), year: parseInt(year)}
    } as const
  }else if(record.recordType === RecordType.Trailer){
    return record
  }
}

export const bulkWriteUpdates = writeMongoCustom('recordType', [
  {value: RecordType.Company, collection: 'companies', mapper: getCompanyReplacement},
  {value: RecordType.PersonUpdate, collection: 'officers', mapper: getPersonUpdateReplacement}
], 'officers', processHeaderAndTrailer)


export async function loadUpdateFile(updateFile: Readable)
{
  console.time('Process update file')
  const res = await pipeline(
    updateFile,
    split2(parseRecord),
    bulkWriteUpdates
  ).catch(e=>console.log('Error in pipeline',e))
  console.timeEnd('Process update file')
  if(res){
    const headerRecord = res.customReturnValues.find(r=>r?.recordType === RecordType.Header)
    if(headerRecord && headerRecord.recordType === RecordType.Header)
      await setProductionDate(headerRecord.productionDate)
    else throw new Error("Didn't get header record in update file, can't update redis productionDate")
    console.log("Update file. Result Stats", res?.stats)
    return res?.counter ?? 0
  }else{
    throw new Error("Didn't finish processing update file. See above error logs.")
  }
}

export async function applyUpdatesSince(date: {year: number, month: number, day: number}, {ensureDownloaded = true,signal}: ApplyUpdatesSinceOpts={}){
  const startDate = Temporal.PlainDate.from(date).add({days: 1}) // get the update for the day after the
  if(ensureDownloaded) await downloadAllInRange(startDate)
  const allFiles = await readdir('downloads')
  const filesSince = allFiles.filter(f=>Temporal.PlainDate.from(f.slice(7,17)).since(startDate).sign === 1).sort()
  let totalCount = 0, fileCount = 0, untilDate = Temporal.PlainDate.from(date)
  for(const file of filesSince){
    if(signal?.aborted) break
    const str = createReadStream(resolve('downloads', file))
    const start = performance.now()
    const count = await loadUpdateFile(str)
    totalCount += count
    fileCount++
    untilDate = Temporal.PlainDate.from(file.slice(7,17))
    console.log((performance.now()-start).toFixed(0)+'ms','to load', count, 'records from', file)
  }
  return {totalCount, numUpdateFiles: fileCount, untilDate}
}

interface ApplyUpdatesSinceOpts{
  /** Whether to first download the update files over SFTP.
   * Only set to false if you know all the necessary files are downloaded to avoid connecting to the SFTP server.
   * @default true
   */
  ensureDownloaded?: boolean
  /**
   * An AbortSignal to stop processing. If no files have been processed yet, it will immediately return.
   * If it has started looping through files, it will finish the one that its on and then return.
   */
  signal?: AbortSignal
}
//todo:
// instead of the current arrangement of applyUpdatesSince of downloading the right files and then just
// applying all of them after the start date, it would be better to have a function called applyNextUpdate() which checks
// the most recent date in Redis, and downloads the file for the next consecutive update and loads it, until there are no more.
