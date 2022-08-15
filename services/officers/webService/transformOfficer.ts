import {OfficerStorage} from '../shared/storageTypes/Officer.js'
import {CompanyStorage} from '../shared/storageTypes/Company.js'
import {capsCase, removeNulls} from '../shared/utils.js'
import {GetOfficerAppointmentResponse} from "./schemas/getOfficerAppointmentSchema.js";
import {ListOfficerAppointmentsResponse} from "./schemas/listOfficerAppointmentsSchema.js";
import {ListCompanyOfficersResponse} from "./schemas/listCompanyOfficersSchema.js";


function formatDate(date: { day: number|string, month: number|string, year: number|string } | undefined): string | undefined {
  return date ? [date.year, date.month, date.day].map(v => v?.toString().padStart(2, '0')).join('-') : undefined
}


function transformCompany(company: CompanyStorage) {
  let {company_name, company_number, company_status} = company
  return {
    company_status,
    company_number,
    company_name
  }
}

function transformOfficer(officer: OfficerStorage) {
  const {
    address: {
      address_line_1: addressLine1WithPremises,
      address_line_2,
      care_of,
      country,
      locality,
      po_box,
      postal_code,
      region
    },
    appointed_on,
    country_of_residence,
    date_of_birth,
    name_elements: {forenames, surname, title},
    nationality,
    occupation,
    officer_role,
    resigned_on
  } = officer
  const premises = addressLine1WithPremises ? addressLine1WithPremises.split(' ')[0] : undefined
  const address_line_1 = addressLine1WithPremises ? addressLine1WithPremises.split(' ').slice(1).join(' ') : undefined
  const retval = {
    officer_role,
    name_elements: {
      other_forenames: capsCase(forenames?.split(' ')?.slice(1).join(' ')) || undefined,
      forename: capsCase(forenames?.split(' ')?.[0]),
      title: capsCase(title),
      surname
    },
    date_of_birth: date_of_birth && typeof date_of_birth.month === "number" && typeof date_of_birth.year === "number" ? {
      month: date_of_birth.month,
      year: date_of_birth.year
    } : undefined,
    resigned_on: resigned_on,
    appointed_on:appointed_on,
    address: {
      locality: capsCase(locality),
      region: capsCase(region),
      premises: capsCase(premises),
      address_line_1: capsCase(address_line_1),
      address_line_2: capsCase(address_line_2),
      postal_code: postal_code,
      care_of: capsCase(care_of),
      po_box: po_box,
      country: capsCase(country)
    },
    nationality: capsCase(nationality),
    country_of_residence: capsCase(country_of_residence),
    occupation: capsCase(occupation),
  }
  removeNulls(retval)
  return retval
}

function formatNameListCompanyOfficers(nameParts: OfficerStorage['name_elements']): string {
  return [nameParts.surname, capsCase(nameParts.forenames)].join(', ')
}

function formatNameListOfficerAppointments(nameParts: OfficerStorage['name_elements']): string {
  // name is joined with spaces on this one rather than commas, and in a different order
  return [capsCase(nameParts.forenames), nameParts.surname].join(' ')
}

export function transformGetOfficerAppointment(officer: OfficerStorage): GetOfficerAppointmentResponse {
  const transformedOfficer = transformOfficer(officer)
  const links = {
    self: `/company/${officer.company_number}/appointments/${officer.personNumber}`,
    officer: {appointments: `/officers/${officer.personNumber}/appointments`}
  }
  const name = formatNameListCompanyOfficers(officer.name_elements)
  return {links, name, ...transformedOfficer}
}

export function transformListOfficerAppointments(officer: OfficerStorage, company: CompanyStorage): ListOfficerAppointmentsResponse['items'][number] {
  const transformedOfficer = transformOfficer(officer)
  const appointed_to = transformCompany(company)
  const links = {company: `/company/${company.company_number}`}
  const name = formatNameListOfficerAppointments(officer.name_elements)
  return {links, name, appointed_to, ...transformedOfficer}
}

export function transformListCompanyOfficers(officer: OfficerStorage): ListCompanyOfficersResponse['items'][number] {
  const {name_elements, ...transformedOfficer} = transformOfficer(officer)

  const links = {
    self: `/company/${officer.company_number}/appointments/${officer.personNumber}`,
    officer: {appointments: `/officers/${officer.personNumber}/appointments`}
  }
  const name = formatNameListCompanyOfficers(officer.name_elements)
  return {links, name, ...transformedOfficer}

}
