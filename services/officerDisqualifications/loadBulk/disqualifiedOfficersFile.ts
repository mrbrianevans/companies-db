import type {RecordTypeSpec} from './RecordParser.js'

enum DisqualifiedOfficersRecordType{
  Header,
  Person,
  Disqualification,
  Exemption,
  Variation,
  Trailer
}


export function classifyDisqualifiedOfficerRecordType(record: string): DisqualifiedOfficersRecordType|null{
  return parseInt(record[0]) || (record.length === 20 ? DisqualifiedOfficersRecordType.Header : record.length === 53 ? DisqualifiedOfficersRecordType.Trailer:null)
}


export const disqualifiedOfficersRecordTypes: RecordTypeSpec[] = [
  {
    recordTypeEnum: DisqualifiedOfficersRecordType.Header,
    fields: [
      {name: 'Header Identifier', dataType: 'X', start: 0, length: 8},
      {name: 'Run Number', dataType: '9', start: 8, length: 4},
      {name: 'Production Date', dataType: 'D', start: 12, length: 8}
    ]
  }
]
