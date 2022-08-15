import {OfficerStorage} from '../shared/storageTypes/Officer.js'
import {CompanyStorage} from '../shared/storageTypes/Company.js'
import {removeNulls} from '../shared/utils.js'
import {GetOfficerAppointmentResponse} from "./schemas/getOfficerAppointmentSchema.js";
import {ListOfficerAppointmentsResponse} from "./schemas/listOfficerAppointmentsSchema.js";
import {ListCompanyOfficersResponse} from "./schemas/listCompanyOfficersSchema.js";


function formatDate(date: OfficerStorage['appointmentDate']): string|undefined{
  return date ? [date.year, date.month, date.day].map(v=>v?.toString().padStart(2,'0')).join('-') : undefined
}


function transformCompany(company: CompanyStorage){
  return {
    company_status: company.status,
    company_number: company.companyNumber,
    company_name: company.name
  }
}

function transformOfficer(officer: OfficerStorage){
  const retval = {
    officer_role: officer.appointmentType,
    name_elements: {
      other_forenames: officer.name.forenames?.split(' ')?.slice(1).join(' '),
      forename: officer.name.forenames?.split(' ')?.[0],
      title: officer.name.title,
      surname: officer.name.surname
    },
    address: {
      locality: officer.address.postTown,
      region: officer.address.county,
      address_line_1: officer.address.addressLine1,
      address_line_2: officer.address.addressLine2,
      postal_code: officer.address.postCode,
      care_of: officer.address.careOf,
      po_box: officer.address.poBox,
      country: officer.address.country
    },
    date_of_birth: officer.dateOfBirth && typeof officer.dateOfBirth.month === "number" && typeof officer.dateOfBirth.year === "number" ? {month: officer.dateOfBirth.month, year:officer.dateOfBirth.year} : undefined,
    nationality: officer.nationality,
    country_of_residence: officer.usualResidentialCountry,
    resigned_on: formatDate(officer.resignationDate),
    appointed_on: formatDate(officer.appointmentDate),
    occupation: officer.occupation,
  }
  removeNulls(retval)
  return retval
}

function formatNameListCompanyOfficers(nameParts: OfficerStorage['name']): string{
  return [nameParts.surname, nameParts.forenames, nameParts.title].join(', ')
}
function formatNameListOfficerAppointments(nameParts: OfficerStorage['name']): string{
  // name is joined with spaces on this one rather than commas, and in a different order
  return [nameParts.forenames, nameParts.surname].join(' ')
}

export function transformGetOfficerAppointment(officer: OfficerStorage): GetOfficerAppointmentResponse{
  const transformedOfficer = transformOfficer(officer)
  const links = {self:`/company/${officer.companyNumber}/appointments/${officer.personNumber}`, officer: {appointments:`/officers/${officer.personNumber}/appointments`}}
  const name = formatNameListOfficerAppointments(officer.name)
  return {links, name, ...transformedOfficer}
}

export function transformListOfficerAppointments(officer: OfficerStorage, company: CompanyStorage): ListOfficerAppointmentsResponse['items'][number]{
  const transformedOfficer = transformOfficer(officer)
  const appointed_to = transformCompany(company)
  const links = {company:`/company/${company.companyNumber}`}
  const name = formatNameListOfficerAppointments(officer.name)
  return {links, name, appointed_to, ...transformedOfficer}
}

export function transformListCompanyOfficers(officer: OfficerStorage): ListCompanyOfficersResponse['items'][number]{
  const transformedOfficer = transformOfficer(officer)

  const links = {self:`/company/${officer.companyNumber}/appointments/${officer.personNumber}`, officer: {appointments:`/officers/${officer.personNumber}/appointments`}}
  const name = formatNameListCompanyOfficers(officer.name)
  return {links, name, ...transformedOfficer}

}
