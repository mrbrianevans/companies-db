type ParsedDate = {day:string, month: string, year: string}
export interface ParsedPersonRecord {
  'Company Number': string;
  'Record Type': number;
  'App Date Origin': string;
  'Appointment Type': number;
  'Person Number': number;
  'Corporate indicator': string;
  'Filler': string;
  'Appointment Date': ParsedDate;
  'Resignation Date': ParsedDate;
  'Person Postcode': string;
  'Partial Date of Birth': ParsedDate;
  'Full Date of Birth': ParsedDate;
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
  'Production Date': ParsedDate;
}

export interface ParsedTrailerRecord {
  'Trailer Identifier': string;
  'Record Count': number;
}

export interface ParsedPersonUpdateRecord{
  'Company Number': string;
  'Record Type': number;
  'App Date Origin': string;
  'Res Date Origin': string;
  'Correction indicator': boolean;
  'Corporate indicator': boolean;
  'Filler': string;
  'Old Appointment Type': number;
  'New Appointment Type': number;
  'Old Person Number': number;
  'New Person Number': number;
  'Partial Date of Birth': ParsedDate;
  'Full Date of Birth': ParsedDate;
  'Old Person Postcode': string;
  'New Person Postcode': string;
  'Appointment Date': ParsedDate;
  'Resignation Date': ParsedDate;
  'Change Date': ParsedDate;
  'Update Date': ParsedDate;
  'Variable Data Length': number;
  'Variable Data (variable length field)':  {
    'New Title': string;
    'New Forenames': string;
    'New Surname': string;
    'New Honours': string;
    'Care Of': string;
    'PO Box': string;
    'New Address Line 1': string;
    'New Address Line 2': string;
    'New Post Town': string;
    'New County': string;
    'New Country': string;
    'Occupation': string;
    'New Nationality': string;
    'New Residential Country': string;
  };
}

export enum RecordType {
  Header,
  Company,
  Person,
  Trailer,
  PersonUpdate
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
      if(record[11] === 'Y' || record[11] === ' ')
        return RecordType.PersonUpdate
      else
        return RecordType.Person
    }
    else if(recordType === '1') {
      return RecordType.Company
    }
  }
  throw new Error('Could not determine record type '+record)
}
