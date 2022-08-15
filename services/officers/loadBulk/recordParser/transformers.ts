import {
  ParsedCompanyRecord, ParsedHeaderRecord, ParsedPersonRecord, ParsedTrailerRecord, RecordType
} from "./RecordTypes.js";
import {removeNulls} from '../../shared/utils.js'


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
  '': 'active',
  'C': 'converted-closed', 'D': 'dissolved', 'L': 'liquidation', 'R': 'receivership'
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

function coalesceDates(...dates: {day:string, month: string, year: string}[]): {day?:number, month?: number, year?: number}|undefined{
  const day = coalesceEmptyStrings(dates.map(d=>d.day))
  const month = coalesceEmptyStrings(dates.map(d=>d.month))
  const year = coalesceEmptyStrings(dates.map(d=>d.year))
  const date: {day?:number, month?: number, year?: number} = {}
  if(day) date.day = parseInt(day)
  if(month) date.month = parseInt(month)
  if(year) date.year = parseInt(year)
  if(Object.keys(date).length > 0)
    return date
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
// these enum values have been chosen from the official companies house enum constants on github https://github.com/companieshouse/api-enumerations/blob/master/constants.yml
const appointmentTypes = {
  0: 'secretary',
  1: 'director',
  4: 'llp-member',
  5: 'llp-designated-member',
  11: 'judicial-factor',
  12: 'charities-act-receiver-or-manager', // only 9 officers in dataset are this appointment type
  13: 'caice-act-manager', // only 1 officer in dataset is this appointment type
  17: 'member-of-an-administrative-organ',
  18: 'member-of-a-supervisory-organ',
  19: 'member-of-a-management-organ'
}

function personTransformer(parsedRecord: ParsedPersonRecord) {
  const v = parsedRecord['Variable Data (Name/ Address/ Occupation Nationality/Usual Residential Country )']
  const transformedRecord = {
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
      title: v['TITLE'].replaceAll('.', '').trim()||undefined,
      forenames: v['FORENAMES'].trim()||undefined,
      surname: v['SURNAME'].trim()||undefined,
      honours: v['HONOURS'].trim()||undefined
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
  removeNulls(transformedRecord)
  return transformedRecord
}

function headerTransformer(parsedRecord: ParsedHeaderRecord) {
  return parsedRecord
}

function trailerTransformer(parsedRecord: ParsedTrailerRecord) {
  return parsedRecord
}
