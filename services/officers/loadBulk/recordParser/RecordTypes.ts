export interface ParsedPersonRecord {
  'Company Number': string;
  'Record Type': number;
  'App Date Origin': string;
  'Appointment Type': number;
  'Person Number': number;
  'Corporate indicator': string;
  'Filler': string;
  'Appointment Date': string;
  'Resignation Date': string;
  'Person Postcode': string;
  'Partial Date of Birth': string;
  'Full Date of Birth': string;
  'Variable Data Length': number;
  'Variable Data (Name/ Address/ Occupation Nationality/Usual Residential Country )': {
    TITLE: string;
    FORENAMES: string;
    SURNAME: string;
    HONOURS: string;
    'CARE OF': string;
    'PO BOX': string;
    'ADDRESS LINE 1': string;
    'ADDRESS LINE 2': string;
    'POST TOWN': string;
    COUNTY: string;
    COUNTRY: string;
    OCCUPATION: string;
    NATIONALITY: string;
    'USUAL RESIDENTIAL COUNTRY': string;
  };
}


export interface ParsedCompanyRecord {
  'Company Number': string;
  'Record Type': number;
  'Company Status': string;
  'Filler': string;
  'Number of Officers': number;
  'Company Name Length': number;
  'Company Name (Delimited by "<")': {'COMPANY NAME':string};
}


export interface ParsedHeaderRecord{
  'Header Identifier': string;
  'Run Number': number;
  'Production Date': number;
}

export interface ParsedTrailerRecord {
  'Trailer Identifier': string;
  'Record Count': number;
}

export enum RecordType {
  Header,
  Company,
  Person,
  Trailer
}


export function getRecordType(record: string): RecordType{
  // this could also be done with a regex
  if(record.length === 16){
    return RecordType.Trailer
  }else if(record.length === 20){
    return RecordType.Header
  }else{
    const recordType = record[8]
    if(recordType === '2') {
      return RecordType.Person
    }
    else if(recordType === '1') {
      return RecordType.Company
    }
  }
  throw new Error('Could not determine record type '+record)
}
