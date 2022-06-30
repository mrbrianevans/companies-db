import type {PscBulkFile, StoredPsc} from "./PscTypes.js";
import {BulkFileRecord} from "./bulkFileTypes.js";
import {BulkFileCorporatePsc} from "./bulkFileSchemas/bulkFileCorporatePsc.js";
import {BulkFileIndividualPsc} from "./bulkFileSchemas/bulkFileIndividualPsc.js";
import {BulkFileLegalPsc} from "./bulkFileSchemas/bulkFileLegalPsc.js";
import {BulkFileSuperSecurePsc} from "./bulkFileSchemas/bulkFileSuperSecurePsc.js";
import {BulkFilePscStatement} from "./bulkFileSchemas/bulkFilePscStatement.js";
import {StatementStorage} from "./storageTypes/statementStorage.js";
import {SuperSecureStorage} from "./storageTypes/superSecureStorage.js";
import {BulkFilePscExemptions} from "./bulkFileSchemas/bulkFilePscExemptions.js";
import {ExemptionsStorage} from "./storageTypes/exemptionsStorage.js";

export function transformPscFromBulk(bulkPscRecord: BulkFileCorporatePsc
  | BulkFileIndividualPsc
  | BulkFileLegalPsc): StoredPsc{
  const {data} = bulkPscRecord
  const {address} = data;
  const linkRegex = /^\/company\/([A-Z\d]{8})\/persons-with-significant-control\/[a-z-]+\/(.+)/
  const linkMatch = data.links?.self?.match(linkRegex)
  if(!linkMatch)
    throw new Error('Could not parse ID from PSC in bulk file record ' + (data.links?.self??JSON.stringify(data)))

  const [,company_number, psc_id] = linkMatch
  if(!(data.kind in PscKindsConverter)) throw new Error('Could not match PSC kind: '+data.kind)
  return {
    address: address ? {
      addressLine1: address.address_line_1,
      addressLine2: address.address_line_2,
      postalCode: address.postal_code,
      poBox: address.po_box,
      region: address.region,
      country: address.country,
      locality: address.locality,
      premises: address.premises
    }: undefined,
    ceasedOn: data.ceased_on,
    // @ts-ignore
    countryOfResidence: data.country_of_residence,
    // @ts-ignore
    dateOfBirth: data.date_of_birth?{month: data.date_of_birth.month, year: data.date_of_birth.year}:undefined,
    etag: data.etag,
    kind: data.kind,
    links: {self: data.links.self},
    name: data.name,
    // @ts-ignore
    nameElements: data.name_elements?{forename: data.name_elements.forename, middleName: data.name_elements.middle_name, title: data.name_elements.title, surname: data.name_elements.surname}:getNamePartsFromName(data.name),
    // @ts-ignore
    nationality: data.nationality,
    naturesOfControl: data.natures_of_control,
    notifiedOn: data.notified_on,
    psc_id,company_number,
    pscKind: PscKindsConverter[data.kind]
  }
}

function getNamePartsFromName(name?: string): StoredPsc['nameElements']{
  if(name === undefined) return undefined
  const parts = name.split(' ')
  if(parts.length < 2){
    return undefined
  }
  else if(parts.length == 2){
    return {
      forename: parts[0],
      surname: parts[1]
    }
  }else if(parts.length === 3){
    return {
      title: parts[0],
      forename: parts[1],
      surname: parts[2]
    }
  }else if(parts.length > 3){
    return {
      title: parts.at(0),
      forename: <string>parts.at(1),
      middleName: parts.slice(2, -1).join(' '),
      surname: <string>parts.at(-1)
    }
  }
}

const PscKindsConverter = {
  'individual-person-with-significant-control': 'individual',
  'legal-person-person-with-significant-control':'legal',
  'corporate-entity-person-with-significant-control': 'corporate',
  'super-secure-person-with-significant-control': 'super-secure',
  'persons-with-significant-control-statement':'statement',
  exemptions: 'exemptions',
  "totals#persons-of-significant-control-snapshot": "summary"
} as const


export function transformPscStatement(bulkPscStatement: BulkFilePscStatement): StatementStorage{
  const statement_ids = bulkPscStatement.data.links.self.match(/\/company\/[A-Z\d]{8}\/persons-with-significant-control-statements\/(.+)/)
  if(!statement_ids) throw new Error('Cannot match PSC ID for record from bulk file: '+JSON.stringify(bulkPscStatement.data.links))
  const [,statement_id] = statement_ids
  return {...bulkPscStatement.data, company_number: bulkPscStatement.company_number, statement_id}
}

export function transformSuperSecurePsc(bulkSuperSecurePsc: BulkFileSuperSecurePsc): SuperSecureStorage{
  const psc_ids = bulkSuperSecurePsc.data.links.self.match(/\/company\/[A-Z\d]{8}\/persons-with-significant-control\/super-secure\/(.+)/)
  if(!psc_ids) throw new Error('Cannot match PSC ID for record from bulk file: '+JSON.stringify(bulkSuperSecurePsc.data.links))
  const [,super_secure_id] = psc_ids
  return {...bulkSuperSecurePsc.data,
    ceased: bulkSuperSecurePsc.data.ceased !== undefined ? Boolean(bulkSuperSecurePsc.data.ceased) : undefined,
    company_number: bulkSuperSecurePsc.company_number,
    super_secure_id}
}

export function transformPscExemptions(bulkPscExemptions: BulkFilePscExemptions): ExemptionsStorage{
  const company_numbers = bulkPscExemptions.data.links.self.match(/\/company\/([A-Z\d]{8})\/exemptions/)
  if(!company_numbers) throw new Error('Cannot match PSC ID for record from bulk file: '+JSON.stringify(bulkPscExemptions.data.links))
  const [,company_number] = company_numbers
  return {...bulkPscExemptions.data, company_number}
}
