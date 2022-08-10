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
/** Returns first non-empty string */
function coalesceEmptyStrings(strings: string[]): string|undefined{
  for (const str of strings) {
    if(str) return str
  }
  return undefined
}

function coalesceDates(...dates: {day:string, month: string, year: string}[]): {day?:string, month?: string, year?: string}|undefined{
  const day = coalesceEmptyStrings(dates.map(d=>d.day))
  const month = coalesceEmptyStrings(dates.map(d=>d.month))
  const year = coalesceEmptyStrings(dates.map(d=>d.year))
  if(day !== undefined || month !== undefined || year !== undefined)
    return {day,month,year}
  else
    return undefined
}

const appointmentDateOrigins = {
  '1':'appointment-document',
  '2':'annual-return',
  '3':'incorporation-document',
  '4':'llp-appointment-document',
  '5':'llp-incorporation-document',
  '6':'overseas-appointment-document'
} as const
const appointmentTypes = {
  0: 'secretary',
  1: 'director',
  4: 'non-designated-llp-member',
  5: 'designated-llp-member',
  11: 'judicial-factor',
  12: 'charities-act-receiver-or-manager',
  13: 'caice-act-manager',
  17: 'se-member-of-administrative-organ',
  18: 'se-member-of-supervisory-organ',
  19: 'se-member-of-management-organ'
}
function personTransformer(parsedRecord: ParsedPersonRecord) {
  const v = parsedRecord['Variable Data (Name/ Address/ Occupation Nationality/Usual Residential Country )']
  return {
    personNumber: parsedRecord['Person Number'],
    personNumberPrefix: parsedRecord['Person Number'].toString().padStart(12, '0').slice(0,8),
    companyNumber: parsedRecord['Company Number'],
    appointmentDateOrigin: appointmentDateOrigins[parsedRecord['App Date Origin']],
    appointmentType: appointmentTypes[parsedRecord['Appointment Type']],
    corporateIndicator: parsedRecord['Corporate indicator'] === 'Y',
    appointmentDate: coalesceDates(parsedRecord['Appointment Date']),
    resignationDate: coalesceDates(parsedRecord['Resignation Date']),
    dateOfBirth: coalesceDates(parsedRecord['Full Date of Birth'], parsedRecord['Partial Date of Birth']),
    name: {
      title: v['TITLE']||undefined, forenames: v['FORENAMES']||undefined, surname: v['SURNAME']||undefined, honours: v['HONOURS']||undefined
    },
    address: {
      careOf: v['CARE OF']||undefined,
      poBox: v['PO BOX']||undefined,
      postCode: parsedRecord['Person Postcode']||undefined,
      addressLine1: v['ADDRESS LINE 1']||undefined,
      addressLine2: v['ADDRESS LINE 2']||undefined,
      postTown: v['POST TOWN']||undefined,
      county: v['COUNTY']||undefined,
      country: v['COUNTRY']||undefined
    },
    occupation: v['OCCUPATION']||undefined,
    nationality: v['NATIONALITY']||undefined,
    usualResidentialCountry: v['USUAL RESIDENTIAL COUNTRY']||undefined
  }
}

function headerTransformer(parsedRecord: ParsedHeaderRecord) {
  return parsedRecord

}

function trailerTransformer(parsedRecord: ParsedTrailerRecord) {
  return parsedRecord

}
