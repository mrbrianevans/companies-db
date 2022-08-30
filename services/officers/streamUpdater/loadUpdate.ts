import split2 from 'split2'
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import {Readable, Writable} from "stream";
import {MongoInserter} from "../shared/mongoInserter.js";
import {once} from "node:events";
import {RecordType} from "../shared/recordParser/RecordTypes.js";
import {CompanyStorage} from "../shared/storageTypes/Company.js";
import {classifyUpdateRecord, UpdateTypes} from "./classifyUpdateRecord.js";
import {pipeline} from "stream/promises";
import {getRecordEvent} from "./getRecordEvent.js";
import {bulkWriteUpdates} from "./getUpdateReplacement.js";

export async function loadUpdateFile(updateFile: Readable)
{
  console.time('Process update file')

  const res = await pipeline(
    updateFile,
    split2(parseRecord),
    async function*(source){for await(const item of source) if((<any>item).recordType === RecordType.PersonUpdate){yield item}},
    bulkWriteUpdates
  ).catch(e=>console.log(e))

  console.log("Classified counts:", res)
  console.timeEnd('Process update file')
}

