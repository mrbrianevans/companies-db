import type {PscBulkFile, StoredPsc} from "./PscTypes.js";
import type {PscBulk} from "./bulkFileTypes.js";

export function transformPscFromBulk(bulkPscRecord: PscBulk): StoredPsc{
  const {data} = bulkPscRecord
  const {address} = data;
  const linkRegex = /^\/company\/[A-Z\d]{8}\/persons-with-significant-control(-statements)|(\/[a-z-]+)?\//
  const linkMatch = data.links?.self?.match(linkRegex)
  if(!linkMatch)
    throw new Error('Could not parse ID from PSC in bulk file record ' + (data.links?.self??JSON.stringify(data)))

  const pscId = data.links.self.replace(linkRegex, '')
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
    countryOfResidence: data.country_of_residence,
    dateOfBirth: data.date_of_birth?{month: data.date_of_birth.month, year: data.date_of_birth.year}:undefined,
    etag: data.etag,
    kind: data.kind,
    links: {self: data.links.self},
    name: data.name,
    nameElements: data.name_elements?{forename: data.name_elements.forename, middleName: data.name_elements.middle_name, title: data.name_elements.title, surname: data.name_elements.surname}:getNamePartsFromName(data.name),
    nationality: data.nationality,
    naturesOfControl: data.natures_of_control,
    notifiedOn: data.notified_on,
    pscId,
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
