import { basename } from "path";
import {createReadStream} from "fs";
import split2 from 'split2'
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import {Writable} from "stream";
import {MongoInserter} from "../shared/mongoInserter.js";
import {once} from "node:events";
import {RecordType} from "../shared/recordParser/RecordTypes.js";
import { CompanyStorage } from "../shared/storageTypes/Company.js";
import {classifyUpdateRecord, UpdateTypes} from "./classifyUpdateRecord.js";

export async function loadUpdateFile(filepath: string)
{
  const filename = basename(filepath)
  console.time('Process update file ' + filename)

  const DB_NAME = 'officers', COMPANY_COLLECTION = 'companies', OFFICER_COLLECTION = 'officers';

  const fileStream = createReadStream(filepath)

  const companyInserter = new MongoInserter<CompanyStorage>(DB_NAME, COMPANY_COLLECTION, ['company_number'])
  const inserterStreams = new Writable({
    objectMode: true,
    async write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
      switch (chunk.recordType) {
        case RecordType.Company:
          delete chunk.recordType
          companyInserter.write(chunk, callback)
          break;
        case RecordType.PersonUpdate:
          delete chunk.recordType
          const updateType = await classifyUpdateRecord(chunk)
          console.log(UpdateTypes[updateType])
          callback()
          break;
        default:
          console.log(chunk)
          callback()
          break;
      }
    },
    async final(callback: (error?: (Error | null)) => void) {
      await new Promise<void>(res => companyInserter.end(() => res()))
      callback()
    }
  })

  const insertStream = fileStream.pipe(split2(parseRecord)).pipe(inserterStreams)
  await once(insertStream, 'finish')

  await new Promise(resolve => fileStream.close(resolve))

  console.timeEnd('Process update file ' + filename)
}

