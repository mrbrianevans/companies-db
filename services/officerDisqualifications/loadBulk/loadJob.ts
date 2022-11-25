import {createReadStream} from "fs";
import {RecordParser} from "./RecordParser.js";
import {
  classifyDisqualifiedOfficerRecordType,
  disqualifiedOfficersRecordTypes
} from "./disqualifiedOfficersFile.js";
import split2 from 'split2'
import {pipeline} from "node:stream/promises";
import {singleMongoBulkWriter} from '../shared/mongoInserter.js'
import {formatRecords} from "./formatRecords.js";
import ReadWriteStream = NodeJS.ReadWriteStream;
import {getEnv} from "./utils.js";
import { mongoDbName } from "../shared/dbClients.js";

const absFilePath = getEnv('DISQUAL_BULK_FILE_PATH')
const inputStream = createReadStream(absFilePath)
const parser = new RecordParser(disqualifiedOfficersRecordTypes, classifyDisqualifiedOfficerRecordType)
const parseStream = split2(r=>parser.parse(r))
const mongoStream = singleMongoBulkWriter( {
  dbName: mongoDbName, collection:'getNaturalOfficer', BulkOpSize: 8000,
  mapper: val=>({replaceOne: {replacement: val, upsert: true, filter: {officer_id:val.officer_id}}})
})

console.time('load disqualified officers')
const res = await pipeline(inputStream, parseStream, formatRecords as unknown as ReadWriteStream, mongoStream)
console.timeEnd('load disqualified officers')

console.log(res)

/*

Running this on my PC processes disqualified officers at just over 5,000 persons per second.
That is the number of records inserted to Mongo, which is much less than the number of records in the bulk file.
The bulk file has a new line for every disqualification and exemption, whereas the DB stores all records for a person together in the same document.

A fully loaded database uses about 2.5MB of storage space in Mongo. The original file is ~ 3.5MB and transformed to a JSON file is about 6MB.

 */
