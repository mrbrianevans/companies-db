import type {RecordTypeSpec} from "./RecordParser.js";

/*
Prod 200 contains a record for every company (maybe ever registered) and has its company number, sic codes and status.
 */

export enum SicFileRecordType{
  Header,
  COMPANY,
  Trailer
}

// returns true if a header record indicates that the file is prod200
function isSicFileHeaderRecord(headerRecord: string){
  return /^AAAAAAAA\d{4}\d{6}$/.test(headerRecord)
}

export function classifySicFileRecordType(record: string): SicFileRecordType|null{
  switch (record.length) {
    case 18:
      return SicFileRecordType.Header
    case 29:
    case 28:
      return SicFileRecordType.COMPANY
    case 16:
      return SicFileRecordType.Trailer
    default:
      console.log('Could not parse record type for record:', JSON.stringify(record), 'length', record.length)
      return null
  }
}


export const sicFileRecordTypes: RecordTypeSpec[] = [
  {
    recordTypeEnum: SicFileRecordType.Header,
    transformer: s=>s,
    fields: [
      {
        name: 'headerIdentifier',
        dataType: 'X',
        start: 0,
        length: 8,
        comment: 'Always AAAAAAAA'
      },
      {
        name: 'runNumber',
        dataType: '9',
        start: 8,
        length: 4,
        comment: 'Run Number'
      },
      {
        name: 'productionDate',
        dataType: 'D',
        start: 12,
        length: 6,
        comment: 'Date in YYMMDD'
      }
    ]
  },
  {
    recordTypeEnum: SicFileRecordType.COMPANY,
    transformer: s=>s,
    fields: [
      {
        name: 'companyNumber',
        dataType: 'X',
        start: 0,
        length: 8,
        comment: 'Company number'
      },
      {
        name: 'sicCode1',
        dataType: 'X',
        start: 8,
        length: 5,
        comment: 'SIC code 1'
      },
      {
        name: 'sicCode2',
        dataType: 'X',
        start: 13,
        length: 5,
        comment: 'SIC code 2'
      },
      {
        name: 'sicCode3',
        dataType: 'X',
        start: 18,
        length: 5,
        comment: 'SIC code 3'
      },
      {
        name: 'sicCode4',
        dataType: 'X',
        start: 23,
        length: 5,
        comment: 'SIC code 4'
      },
      {
        name: 'companyStatus',
        dataType: 'X',
        start: 28,
        length: 1,
        comment: 'Company Status. C for closed/converted. D for dissolved. L for liquidation. R for receivership. Else blank.'
      }
    ]
  },
  {
    recordTypeEnum: SicFileRecordType.Trailer,
    transformer: s=>s,
    fields: [
      {
        name: 'trailerIdentifier',
        dataType: 'X',
        start: 0,
        length: 8,
        comment: 'Always 99999999'
      },
      {
        name: 'numberOfRecords',
        dataType: '9',
        start: 8,
        length: 8,
        comment: 'Number of Data Records, excluding header and trailer.'
      }
    ]
  }
]
