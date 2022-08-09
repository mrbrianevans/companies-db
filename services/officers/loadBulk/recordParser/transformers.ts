import {
  ParsedCompanyRecord, ParsedHeaderRecord, ParsedPersonRecord, ParsedTrailerRecord, RecordType
} from "./RecordTypes.js";

export function getTransformer(recordType: RecordType) {
  switch (recordType) {
    case RecordType.Header:
      return headerTransformer
      break;
    case RecordType.Company:
      return companyTransformer
      break;
    case RecordType.Person:
      return personTransformer
      break;
    case RecordType.Trailer:
      return trailerTransformer
      break;
  }
}

const companyStatuses = {
  '': 'other', 'C': 'closed', 'D': 'dissolved', 'L': 'liquidation', 'R': 'receivership'
}

function companyTransformer(parsedRecord: ParsedCompanyRecord) {
  return {
    companyNumber: parsedRecord['Company Number'],
    status: companyStatuses[parsedRecord['Company Status']],
    numberOfOfficers: parsedRecord['Number of Officers'],
    name: parsedRecord['Company Name (Delimited by "<")']['COMPANY NAME']
  }
}

function personTransformer(parsedRecord: ParsedPersonRecord) {
  const v = parsedRecord['Variable Data (Name/ Address/ Occupation Nationality/Usual Residential Country )']
  return {
    personNumber: parsedRecord['Person Number'],
    companyNumber: parsedRecord['Company Number'],
    appointmentDateOrigin: parsedRecord['App Date Origin'],
    appointmentType: parsedRecord['Appointment Type'],
    corporateIndicator: parsedRecord['Corporate indicator'],
    appointmentDate: parsedRecord['Appointment Date'],
    resignationDate: parsedRecord['Resignation Date'],//todo: should be undefined if not parsed
    dateOfBirth: parsedRecord['Partial Date of Birth'],//todo: need to coalesce here
    name: {
      title: v['TITLE'], forenames: v['FORENAMES'], surname: v['SURNAME'], honours: v['HONOURS']
    },
    address: {
      careOf: v['CARE OF'],
      poBox: v['PO BOX'],
      postCode: parsedRecord['Person Postcode'],
      addressLine1: v['ADDRESS LINE 1'],
      addressLine2: v['ADDRESS LINE 2'],
      postTown: v['POST TOWN'],
      county: v['COUNTY'],
      country: v['COUNTRY']
    },
    occupation: v['OCCUPATION'],
    nationality: v['NATIONALITY'],
    usualResidentialCountry: v['USUAL RESIDENTIAL COUNTRY']
  }
}

function headerTransformer(parsedRecord: ParsedHeaderRecord) {
  return parsedRecord

}

function trailerTransformer(parsedRecord: ParsedTrailerRecord) {
  return parsedRecord

}
