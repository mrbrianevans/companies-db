import split2 from 'split2'
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import type {Readable} from "stream";
import {pipeline} from "stream/promises";
import {bulkWriteUpdates} from "./getUpdateReplacement.js";

export async function loadUpdateFile(updateFile: Readable)
{
  //todo: need some way of checking (probably in Redis) when the last update/bulk file was produced that has been applied.
  // Updates should only ever be applied in sequential order Eg Run3232 should only be applied after 3231 and before 3233.
  console.time('Process update file')

  const res = await pipeline(
    updateFile,
    split2(parseRecord),
    bulkWriteUpdates
  ).catch(e=>console.log(e))

  console.log("Update file. Inserted", res?.stats.upserted, 'Updated', res?.stats.modified)
  console.timeEnd('Process update file')
  return res?.counter ?? 0
}

