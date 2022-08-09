import {getRecordType, RecordType} from "./RecordTypes.js";

export type RecordTypeFormat = ({start: number, length: number, name: string, comment?: string}&({dataType: 'V', variableFormat: string}|{dataType: 'X'|'9'|'D'}))[]
const personRecordVariableDataFormat = 'TITLE<FORENAMES<SURNAME<HONOURS<CARE OF<PO BOX<ADDRESS LINE 1<ADDRESS LINE 2<POST TOWN<COUNTY<COUNTRY<OCCUPATION<NATIONALITY<USUAL RESIDENTIAL COUNTRY<'
const companyRecordVariableDataFormat = 'COMPANY NAME<'
export const PersonRecordFormat: RecordTypeFormat = [
  { start: 0, dataType: 'X', length: 8, name: 'Company Number' },
  { start: 8, dataType: '9', length: 1, name: 'Record Type', comment: 'Indicates that the record is describing a person rather than a company, and it is always a 2 for person records (whereas it\'s a 1 for company records).' },
  { start: 9, dataType: 'X', length: 1, name: 'App Date Origin' },
  { start: 10, dataType: '9', length: 2, name: 'Appointment Type' },
  { start: 12, dataType: '9', length: 12, name: 'Person Number' },
  { start: 24, dataType: 'X', length: 1, name: 'Corporate indicator', comment: 'This is a "Y" character when the officer is corporate, otherwise its a space.' },
  { start: 25, dataType: 'X', length: 7, name: 'Filler' },
  { start: 32, dataType: 'D', length: 8, name: 'Appointment Date' },
  { start: 40, dataType: 'D', length: 8, name: 'Resignation Date' },
  { start: 48, dataType: 'X', length: 8, name: 'Person Postcode' },
  {
    start: 56,
    dataType: 'D',
    length: 8,
    name: 'Partial Date of Birth'
  },
  { start: 64, dataType: 'D', length: 8, name: 'Full Date of Birth' },
  { start: 72, dataType: '9', length: 4, name: 'Variable Data Length' },
  {
    start: 76,
    dataType: 'V',
    variableFormat: personRecordVariableDataFormat,
    length: 1125,
    name: 'Variable Data (Name/ Address/ Occupation Nationality/Usual Residential Country )'
  }
]

export const CompanyRecordFormat: RecordTypeFormat = [
  { start: 0, dataType: 'X', length: 8, name: 'Company Number' },
  { start: 8, dataType: '9', length: 1, name: 'Record Type', comment: 'Indicates that the record is describing a company rather than a person, and it is always a 1 for company records (whereas it\'s a 2 for person records).' },
  { start: 9, dataType: 'X', length: 1, name: 'Company Status' },
  { start: 10, dataType: 'X', length: 22, name: 'Filler' },
  { start: 32, dataType: '9', length: 4, name: 'Number of Officers' },
  { start: 36, dataType: '9', length: 4, name: 'Company Name Length' },
  {
    start: 40,
    dataType: 'V',
    variableFormat: companyRecordVariableDataFormat,
    length: 161,
    name: 'Company Name (Delimited by "<")'
  }
]


export const HeaderRecordFormat: RecordTypeFormat = [
  { start: 0, dataType: 'X', length: 8, name: 'Header Identifier', comment: 'Always "DDDDSNAP" for snapshots and "DDDDUPDT" for updates.' },
  { start: 8, dataType: '9', length: 4, name: 'Run Number' },
  { start: 12, dataType: 'D', length: 8, name: 'Production Date', comment: 'The date that the bulk file was produced.' }
]

export const TrailerRecordFormat: RecordTypeFormat = [
  { start: 0, dataType: 'X', length: 8, name: 'Trailer Identifier' },
  { start: 8, dataType: '9', length: 8, name: 'Record Count' }
]



export function getRecordFormat(recordType: RecordType){
  let format = PersonRecordFormat
  switch (recordType) {
    case RecordType.Trailer:
      format = TrailerRecordFormat
      break;
    case RecordType.Header:
      format = HeaderRecordFormat
      break;
    case RecordType.Company:
      format = CompanyRecordFormat;
      break;
    case RecordType.Person:
      format = PersonRecordFormat;
      break;
  }
  return format
}
