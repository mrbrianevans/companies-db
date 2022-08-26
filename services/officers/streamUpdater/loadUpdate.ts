import split2 from 'split2'
import {parseRecord} from "../shared/recordParser/parseRecord.js";
import {Readable, Writable} from "stream";
import {MongoInserter} from "../shared/mongoInserter.js";
import {once} from "node:events";
import {RecordType} from "../shared/recordParser/RecordTypes.js";
import {CompanyStorage} from "../shared/storageTypes/Company.js";
import {classifyUpdateRecord, UpdateTypes} from "./classifyUpdateRecord.js";
import {pipeline} from "stream/promises";

export async function loadUpdateFile(updateFile: Readable)
{
  console.time('Process update file')

  const DB_NAME = 'officers', COMPANY_COLLECTION = 'companies', OFFICER_COLLECTION = 'officers';

  const companyInserter = new MongoInserter<CompanyStorage>(DB_NAME, COMPANY_COLLECTION, ['company_number'])
  let counter = {}
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
          // if(updateType === UpdateTypes.Unclassified)
          if(updateType === UpdateTypes.Unclassified && chunk.appointment_type.old.current) {
            // process.stdout.write('.')
            const {person_number: {old: person_number}, company_number} = chunk
            // console.log(JSON.stringify({person_number, company_number}),chunk)
          }
          if(UpdateTypes[updateType] in counter)counter[UpdateTypes[updateType]]++
          else counter[UpdateTypes[updateType]] = 0
          callback()
          break;
        default:
//todo: verify that the trailer record count matches the number of records processed
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

  const ac = new AbortController()
  // setTimeout(()=>ac.abort(), 60_000)
  await pipeline(updateFile, split2(parseRecord), inserterStreams, {signal: ac.signal}).catch(e=> {
    inserterStreams.end()
    updateFile.destroy()
    if(e.code !== 'ABORT_ERR') throw e
  })

  console.log("Classified counts:", counter)
  console.timeEnd('Process update file')
}

