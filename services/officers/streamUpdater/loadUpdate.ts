import split2 from 'split2'
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import {Readable, Writable} from "stream";
import {MongoInserter} from "../shared/mongoInserter.js";
import {once} from "node:events";
import {RecordType} from "../shared/recordParser/RecordTypes.js";
import {CompanyStorage} from "../shared/storageTypes/Company.js";
import {classifyUpdateRecord, UpdateTypes} from "./classifyUpdateRecord.js";

export async function loadUpdateFile(updateFile: Readable)
{
  console.time('Process update file')

  const DB_NAME = 'officers', COMPANY_COLLECTION = 'companies', OFFICER_COLLECTION = 'officers';

  const companyInserter = new MongoInserter<CompanyStorage>(DB_NAME, COMPANY_COLLECTION, ['company_number'])
  let counter = Object.keys(UpdateTypes)
  const inserterStreams = new Writable({
    objectMode: true,
    async write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
      switch (chunk.recordType) {
        case RecordType.Company:
          delete chunk.recordType
          // companyInserter.write(chunk, callback)
          callback()
          break;
        case RecordType.PersonUpdate:
          delete chunk.recordType
          const updateType = await classifyUpdateRecord(chunk)
          // console.log(UpdateTypes[updateType])
          // if(updateType === UpdateTypes.Unclassified) console.log(chunk)
          if(updateType === UpdateTypes.Unclassified) {
            process.stdout.write('.')
            counter[UpdateTypes[updateType]]++
          }
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

  const insertStream = updateFile.pipe(split2(parseRecord)).pipe(inserterStreams)
  await once(insertStream, 'finish')
  console.log("Classified counts:", counter)
  console.timeEnd('Process update file')
}

