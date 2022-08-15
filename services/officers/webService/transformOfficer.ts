import {OfficerStorage} from '../shared/storageTypes/Officer.js'
import {CompanyStorage} from '../shared/storageTypes/Company.js'
import {removeNulls} from '../shared/utils.js'
import {GetOfficerAppointmentResponse} from "./schemas/getOfficerAppointmentSchema.js";
import {ListOfficerAppointmentsResponse} from "./schemas/listOfficerAppointmentsSchema.js";
import {ListCompanyOfficersResponse} from "./schemas/listCompanyOfficersSchema.js";


function formatDate(date: OfficerStorage['resignation_date']): string | undefined {
  return date ? [date.year, date.month, date.day].map(v => v?.toString().padStart(2, '0')).join('-') : undefined
}


function transformCompany(company: CompanyStorage) {
  return {
    company_status: company.status,
    company_number: company.companyNumber,
    company_name: company.name
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
    appointment_date,
    country_of_residence,
    date_of_birth,
    name_elements: {forenames, surname, title},
    nationality,
    occupation,
    officer_role,
    resignation_date
  } = officer
  const premises = addressLine1WithPremises ? addressLine1WithPremises.split(' ')[0] : undefined
  const address_line_1 = addressLine1WithPremises ? addressLine1WithPremises.split(' ').slice(1).join(' ') : undefined
  const retval = {
    officer_role,
    name_elements: {
      other_forenames: forenames?.split(' ')?.slice(1).join(' '),
      forename: forenames?.split(' ')?.[0],
      title,
      surname
    },
    date_of_birth: date_of_birth && typeof date_of_birth.month === "number" && typeof date_of_birth.year === "number" ? {
      month: date_of_birth.month,
      year: date_of_birth.year
    } : undefined,
    resigned_on: formatDate(resignation_date),
    appointed_on: formatDate(appointment_date),
    address: {
      locality,
      region,
      premises,
      address_line_1,
      address_line_2,
      postal_code,
      care_of,
      po_box,
      country
    },
    nationality,
    country_of_residence,
    occupation,
  }
  removeNulls(retval)
  return retval
}

function formatNameListCompanyOfficers(nameParts: OfficerStorage['name_elements']): string {
  return [nameParts.surname, nameParts.forenames, nameParts.title].join(', ')
}

function formatNameListOfficerAppointments(nameParts: OfficerStorage['name_elements']): string {
  // name is joined with spaces on this one rather than commas, and in a different order
  return [nameParts.forenames, nameParts.surname].join(' ')
}

export function transformGetOfficerAppointment(officer: OfficerStorage): GetOfficerAppointmentResponse {
  const transformedOfficer = transformOfficer(officer)
  const links = {
    self: `/company/${officer.companyNumber}/appointments/${officer.personNumber}`,
    officer: {appointments: `/officers/${officer.personNumber}/appointments`}
  }
  const name = formatNameListOfficerAppointments(officer.name_elements)
  return {links, name, ...transformedOfficer}
}

export function transformListOfficerAppointments(officer: OfficerStorage, company: CompanyStorage): ListOfficerAppointmentsResponse['items'][number] {
  const transformedOfficer = transformOfficer(officer)
  const appointed_to = transformCompany(company)
  const links = {company: `/company/${company.companyNumber}`}
  const name = formatNameListOfficerAppointments(officer.name_elements)
  return {links, name, appointed_to, ...transformedOfficer}
}

export function transformListCompanyOfficers(officer: OfficerStorage): ListCompanyOfficersResponse['items'][number] {
  const {name_elements, ...transformedOfficer} = transformOfficer(officer)

  const links = {
    self: `/company/${officer.companyNumber}/appointments/${officer.personNumber}`,
    officer: {appointments: `/officers/${officer.personNumber}/appointments`}
  }
  const name = formatNameListCompanyOfficers(officer.name_elements)
  return {links, name, ...transformedOfficer}

}
