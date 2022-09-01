import split2 from 'split2'
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import type {Readable} from "stream";
import {pipeline} from "stream/promises";
import {bulkWriteUpdates} from "./getUpdateReplacement.js";

export async function loadUpdateFile(updateFile: Readable)
{
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

