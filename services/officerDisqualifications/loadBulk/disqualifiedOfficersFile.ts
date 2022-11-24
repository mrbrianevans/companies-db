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
  },
  {
    recordTypeEnum: DisqualifiedOfficersRecordType.Trailer,
    fields: [
      { name: 'Trailer Identifier ', dataType: 'X', start: 0, length: 8 },
      { name: 'Type 1 Record Count', dataType: '9', start: 9, length: 8 },
      { name: 'Type 2 Record Count', dataType: '9', start: 18, length: 8 },
      { name: 'Type 3 Record Count', dataType: '9', start: 27, length: 8 },
      { name: 'Type 4 Record Count', dataType: '9', start: 36, length: 8 },
      {
        name: 'Total Record Count excluding Header  Trailer',
        dataType: '9',
        start: 45,
        length: 8
      }
    ]
  },
  {
    recordTypeEnum: DisqualifiedOfficersRecordType.Person,
    fields: [
      { name: 'RECORD-TYPE', dataType: 'X', start: 0, length: 1 },
      { name: 'PERSON-NUMBER', dataType: '9', start: 1, length: 12 },
      { name: 'PERSON-DATE-OF-BIRTH', dataType: 'D', start: 13, length: 8 },
      { name: 'PERSON-POSTCODE', dataType: 'X', start: 21, length: 8 },
      { name: 'PERSON-VARIABLE-IND', dataType: '9', start: 29, length: 4 },
      {
        name: 'PERSON-DETAILS', dataType: 'V', start: 33, length: 1182 ,
        variableFormat: 'Title<Forenames<Surname<Honours<Address Line 1<Address Line 2<Posttown<County<Country<Nationality<Corporate-Number<Country-Registration<'
      }
    ]
  },
  {
    recordTypeEnum: DisqualifiedOfficersRecordType.Disqualification,
    fields: [
      {
        name: 'RECORD-TYPE',
        dataType: 'X',
        start: 0,
        length: 1,
        comment: '“2”'
      },
      {
        name: 'PERSON-NUMBER',
        dataType: '9',
        start: 1,
        length: 12
      },
      {
        name: 'DISQUAL-START-DATE',
        dataType: 'D',
        start: 13,
        length: 8,
        comment: 'CCYYMMDD'
      },
      {
        name: 'DISQUAL-END-DATE',
        dataType: 'D',
        start: 21,
        length: 8,
        comment: 'CCYYMMDD'
      },
      {
        name: 'SECTION-OF-THE-ACT',
        dataType: 'X',
        start: 29,
        length: 20
      },
      {
        name: 'DISQUALIFICATION-TYPE',
        dataType: 'X',
        start: 49,
        length: 30,
        comment: '“ORDER” or “UNDERTAKING”'
      },
      {
        name: 'DISQUAL-ORDER/UNDERTAKING-DATE',
        dataType: 'D',
        start: 79,
        length: 8,
        comment: 'CCYYMMDD or blank for older records'
      },
      {
        name: 'CASE-NUMBER',
        dataType: 'X',
        start: 87,
        length: 30,
      },
      {
        name: 'COMPANY-NAME',
        dataType: 'X',
        start: 117,
        length: 160,
      },
      {
        name: 'COURT-NAME-VARIABLE-IND',
        dataType: '9',
        start: 277,
        length: 4,
      },
      {
        name: 'COURT-NAME',
        dataType: 'X',
        start: 281,
        length: 4000,
        comment: 'Contains the court name for orders and “INSOLVENCY SERVICE” for undertakings.'
      }
    ]
  },
  {
    recordTypeEnum: DisqualifiedOfficersRecordType.Exemption,
    fields: [
      {
        name: 'RECORD-TYPE',
        dataType: 'X',
        start: 0,
        length: 1,
        comment: '“3”'
      },
      {
        name: 'PERSON-NUMBER',
        dataType: '9',
        start: 1,
        length: 12
      },
      {
        name: 'EXEMPTION-START-DATE',
        dataType: 'D',
        start: 13,
        length: 8,
        comment: 'CCYYMMDD'
      },
      {
        name: 'EXEMPTION -END-DATE',
        dataType: 'D',
        start: 21,
        length: 8,
        comment: 'CCYYMMDD'
      },
      {
        name: 'EXEMPTION-PURPOSE',
        dataType: '9',
        start: 29,
        length: 10,
        comment: '“1”, “2”, “3”, “4” or “5”'
      },
      {
        name: 'EXEMPTION-COMPANY-NAME-IND',
        dataType: 'X',
        start: 39,
        length: 4
      },
      {
        name: 'EXEMPTION-COMPANY NAME',
        dataType: 'X',
        start: 43,
        length: 160
      }
    ]
  },
  {
    recordTypeEnum: DisqualifiedOfficersRecordType.Variation,
    fields: [
      {
        name: 'RECORD-TYPE',
        dataType: 'X',
        start: 0,
        length: 1,
        comment: '“4”'
      },
      {
        name: 'PERSON-NUMBER',
        dataType: '9',
        start: 1,
        length: 12
      },
      {
        name: 'DISQUALIFICATION-TYPE',
        dataType: 'X',
        start: 13,
        length: 30,
        comment: '“ORDER” or “UNDERTAKING”'
      },
      {
        name: 'DISQUAL-ORDER/UNDERTAKING-DATE',
        dataType: 'D',
        start: 43,
        length: 8,
        comment: 'CCYYMMDD or blank for older records'
      },
      {
        name: 'VARIATION-COURT-ACTION-DATE',
        dataType: 'D',
        start: 51,
        length: 8,
        comment: 'CCYYMMDD'
      },
      {
        name: 'VARIATION-CASE-NUMBER',
        dataType: 'X',
        start: 59,
        length: 30,
      },
      {
        name: 'VARIATION-COURT-NAME-IND',
        dataType: 'X',
        start: 89,
        length: 4,
      },
      {
        name: 'VARIATION-COURT-NAME',
        dataType: 'X',
        start: 93,
        length: 4000
      }
    ]
  }
]
