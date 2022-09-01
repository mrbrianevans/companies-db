/*
Record types that can be found in the different files.
 */


import {OfficerStorage} from "../storageTypes/Officer.js";
import {CompanyStorage} from "../storageTypes/Company.js";
import {HeaderRecord, PersonUpdate, TrailerRecord} from "./transformers.js";
import {RecordType} from "./RecordTypes.js";

export type OfficerBulkFileRecordWithRecordType = WithRecordType<OfficerStorage>|WithRecordType<CompanyStorage>|WithRecordType<HeaderRecord>|WithRecordType<TrailerRecord>
export type OfficerBulkFileRecord = Omit<OfficerBulkFileRecordWithRecordType, 'recordType'>
export type OfficerUpdateFileRecordWithRecordType = WithRecordType<PersonUpdate>|WithRecordType<CompanyStorage>|WithRecordType<HeaderRecord>|WithRecordType<TrailerRecord>

type RecordTypes = ({recordType: RecordType.Company}&CompanyStorage)
  |({recordType: RecordType.Person}&OfficerStorage)
  |({recordType: RecordType.Header}&HeaderRecord)
  |({recordType: RecordType.Trailer}&TrailerRecord)
  |({recordType: RecordType.PersonUpdate}&PersonUpdate)

type GetRecordType<Records> = Records extends CompanyStorage ? RecordType.Company : Records extends OfficerStorage ? RecordType.Person : Records extends HeaderRecord ? RecordType.Header : Records extends TrailerRecord ? RecordType.Trailer: Records extends PersonUpdate ? RecordType.PersonUpdate : RecordType

type WithRecordType<Records> = Records & { recordType: GetRecordType<Records> }


