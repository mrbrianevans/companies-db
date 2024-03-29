import type {ParsedCompanyRecord, ParsedHeaderRecord, ParsedPersonRecord, ParsedTrailerRecord} from "./RecordTypes.js";
import {ParsedPersonUpdateRecord, RecordType} from "./RecordTypes.js";
import {removeNulls} from '../utils.js'
import type {OfficerStorage} from '../storageTypes/Officer.js'
import type {CompanyStorage} from '../storageTypes/Company.js'
import { AppointmentType } from "./AppointmentType.js";

export function getTransformer(recordType: RecordType) {
  switch (recordType) {
    case RecordType.Header:
      return headerTransformer
    case RecordType.Company:
      return companyTransformer
    case RecordType.Person:
      return personTransformer
    case RecordType.Trailer:
      return trailerTransformer
    case RecordType.PersonUpdate:
      return personUpdateTransformer
  }
}

const companyStatuses = {
  '': 'active', 'C': 'converted-closed', 'D': 'dissolved', 'L': 'liquidation', 'R': 'receivership'
}

function companyTransformer(parsedRecord: ParsedCompanyRecord): CompanyStorage {
  return {
    company_number: parsedRecord['Company Number'],
    company_status: companyStatuses[parsedRecord['Company Status']],
    number_of_officers: parsedRecord['Number of Officers'],
    company_name: parsedRecord['Company Name (Delimited by "<")']['COMPANY NAME']
  }
}

/** Returns first non-empty string */
function coalesceEmptyStrings(strings: string[]): string | undefined {
  for (const str of strings) {
    if (str) return str
  }
  return undefined
}

function coalesceDates(...dates: { day: string, month: string, year: string }[]): { day?: number, month?: number, year?: number } | undefined {
  const day = coalesceEmptyStrings(dates.map(d => d.day))
  const month = coalesceEmptyStrings(dates.map(d => d.month))
  const year = coalesceEmptyStrings(dates.map(d => d.year))
  const date: { day?: number, month?: number, year?: number } = {}
  if (day) date.day = parseInt(day)
  if (month) date.month = parseInt(month)
  if (year) date.year = parseInt(year)
  if (Object.keys(date).length > 0) return date
  else return undefined
}

const appointmentDateOrigins = {
  '': undefined,
  '1': 'appointment-document',
  '2': 'annual-return',
  '3': 'incorporation-document',
  '4': 'llp-appointment-document',
  '5': 'llp-incorporation-document',
  '6': 'overseas-appointment-document'
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

function stringifyDate(date: { day: number|string, month: number|string, year: number|string } | undefined){
  return date && date.year.toString().trim() ? [date.year, date.month, date.day].map(v => v?.toString().padStart(2, '0')).join('-') : undefined
}

function personTransformer(parsedRecord: ParsedPersonRecord): OfficerStorage {
  const v = parsedRecord['Variable Data (Name/ Address/ Occupation Nationality/Usual Residential Country )']
  const appointmentType = new AppointmentType(parsedRecord['Appointment Type'])
  const transformedRecord: OfficerStorage = {
    person_number: parsedRecord['Person Number'],
    person_number_prefix: parsedRecord['Person Number'].toString().padStart(12, '0').slice(0, 8),
    company_number: parsedRecord['Company Number'],
    appointment_date_origin: appointmentDateOrigins[parsedRecord['App Date Origin']],
    officer_role: appointmentType.officer_role,
    resigned: appointmentType.resigned,
    is_corporate_officer: parsedRecord['Corporate indicator'] === 'Y',
    appointed_on: <string>stringifyDate(parsedRecord['Appointment Date']),
    resigned_on: stringifyDate(parsedRecord['Resignation Date']),
    date_of_birth: <{ month: number, year: number }>coalesceDates(parsedRecord['Full Date of Birth'], parsedRecord['Partial Date of Birth']),
    name_elements: {
      title: v['TITLE'].replaceAll('.', '').trim() || undefined,
      forenames: v['FORENAMES'].trim() || undefined,
      surname: v['SURNAME'].trim(),
      honours: v['HONOURS'].trim() || undefined
    },
    address: {
      care_of: v['CARE OF'] || undefined,
      po_box: v['PO BOX'] || undefined,
      postal_code: parsedRecord['Person Postcode'] || undefined,
      address_line_1: v['ADDRESS LINE 1'] || undefined,
      address_line_2: v['ADDRESS LINE 2'] || undefined,
      locality: v['POST TOWN'] || undefined,
      region: v['COUNTY'] || undefined,
      country: v['COUNTRY'] || undefined
    },
    occupation: v['OCCUPATION'] || undefined,
    nationality: v['NATIONALITY'] || undefined,
    country_of_residence: v['USUAL RESIDENTIAL COUNTRY'] || undefined
  }
  removeNulls(transformedRecord)
  return transformedRecord
}

function headerTransformer(parsedRecord: ParsedHeaderRecord) {
  return parsedRecord
}
export type HeaderRecord = ReturnType<typeof headerTransformer>
function trailerTransformer(parsedRecord: ParsedTrailerRecord) {
  return parsedRecord
}
export type TrailerRecord = ReturnType<typeof trailerTransformer>
export function personUpdateTransformer(parsedRecord: ParsedPersonUpdateRecord){
  const v = parsedRecord['Variable Data (variable length field)']
  const transformedRecord = {
    company_number: parsedRecord['Company Number'],
    appointment_date_origin: appointmentDateOrigins[parsedRecord['App Date Origin']],
    resignation_date_origin:  appointmentDateOrigins[parsedRecord['Res Date Origin']],
    correction: parsedRecord['Correction indicator'],
    is_corporate_officer: parsedRecord['Corporate indicator'],
    appointment_type: {
      old: new AppointmentType(parsedRecord['Old Appointment Type']),
      new: new AppointmentType(parsedRecord['New Appointment Type'])
    },
    person_number:{
      old: parsedRecord['Old Person Number'],
      new: parsedRecord['New Person Number']
    },
    person_number_prefix:{
      old: parsedRecord['Old Person Number'].toString().padStart(12, '0').slice(0, 8),
      new: parsedRecord['New Person Number'].toString().padStart(12, '0').slice(0, 8)
    },
    date_of_birth:  <{ month: number, year: number } | undefined>coalesceDates(parsedRecord['Full Date of Birth'], parsedRecord['Partial Date of Birth']),
    address: {
      old: {
        postal_code: parsedRecord['Old Person Postcode'] || undefined
      },
      new: {
        postal_code: parsedRecord['New Person Postcode'] || undefined,
        care_of: v['Care Of'] || undefined,
        po_box: v['PO Box'] || undefined,
        address_line_1: v['New Address Line 1'] || undefined,
        address_line_2: v['New Address Line 2'] || undefined,
        locality: v['New Post Town'] || undefined,
        region: v['New County'] || undefined,
        country: v['New Country'] || undefined
      }
    },
    appointed_on: <string>stringifyDate(parsedRecord['Appointment Date']),
    resigned_on: stringifyDate(parsedRecord['Resignation Date']),
    changed_on: stringifyDate(parsedRecord['Change Date']),
    updated_on: stringifyDate(parsedRecord['Update Date']),
    name_elements: {
      title: v['New Title'].replaceAll('.', '').trim() || undefined,
      forenames: v['New Forenames'].trim() || undefined,
      surname: v['New Surname'].trim(),
      honours: v['New Honours'].trim() || undefined
    },
    occupation: v["Occupation"] || undefined,
    nationality: v['New Nationality'] || undefined,
    country_of_residence: v['New Residential Country'] || undefined
  }
  removeNulls(transformedRecord)
  return transformedRecord
}
export type PersonUpdate = ReturnType<typeof personUpdateTransformer>
