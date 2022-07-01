import {BulkFileCorporatePsc} from "./bulkFileSchemas/bulkFileCorporatePsc.js";
import {BulkFileIndividualPsc} from "./bulkFileSchemas/bulkFileIndividualPsc.js";
import {BulkFileLegalPsc} from "./bulkFileSchemas/bulkFileLegalPsc.js";
import {BulkFileSuperSecurePsc} from "./bulkFileSchemas/bulkFileSuperSecurePsc.js";
import {BulkFilePscStatement} from "./bulkFileSchemas/bulkFilePscStatement.js";
import {StatementStorage} from "../shared/storageTypes/statementStorage.js";
import {SuperSecureStorage} from "../shared/storageTypes/superSecureStorage.js";
import {BulkFilePscExemptions} from "./bulkFileSchemas/bulkFilePscExemptions.js";
import {ExemptionsStorage} from "../shared/storageTypes/exemptionsStorage.js";
import {IndividualPscStorage} from "../shared/storageTypes/individualPscStorage.js";
import {LegalPscStorage} from "../shared/storageTypes/legalPscStorage.js";
import {CorporatePscStorage} from "../shared/storageTypes/corporatePscStorage.js";

// guesses the different parts of a name by splitting the string.
function getNamePartsFromName(name?: string){
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

export function transformLegalPsc(bulkLegalPsc: BulkFileLegalPsc): LegalPscStorage{
  const psc_ids = bulkLegalPsc.data.links.self.match(/\/company\/([A-Z\d]{8})\/persons-with-significant-control\/legal-person\/(.+)/)
  if(!psc_ids) throw new Error('Cannot match PSC ID for record from bulk file: '+JSON.stringify(bulkLegalPsc.data.links))
  const [,company_number,psc_id] = psc_ids
  if(company_number !== bulkLegalPsc.company_number) throw new Error('Company number parsed from link does not match: '+JSON.stringify([company_number, bulkLegalPsc.company_number, bulkLegalPsc.data.links, {psc_id}]))
  return {...bulkLegalPsc.data, psc_id,company_number: bulkLegalPsc.company_number}
}

export function transformIndividualPsc(bulkIndividualPsc: BulkFileIndividualPsc): IndividualPscStorage{
  const psc_ids = bulkIndividualPsc.data.links.self.match(/\/company\/([A-Z\d]{8})\/persons-with-significant-control\/individual\/(.+)/)
  if(!psc_ids) throw new Error('Cannot match PSC ID for record from bulk file: '+JSON.stringify(bulkIndividualPsc.data.links))
  const [,company_number,psc_id] = psc_ids
  if(company_number !== bulkIndividualPsc.company_number) throw new Error('Company number parsed from link does not match: '+JSON.stringify([company_number, bulkIndividualPsc.company_number, bulkIndividualPsc.data.links, {psc_id}]))
  return {...bulkIndividualPsc.data, psc_id,company_number: bulkIndividualPsc.company_number}
}

export function transformCorporatePsc(bulkCorporatePsc: BulkFileCorporatePsc): CorporatePscStorage{
  const psc_ids = bulkCorporatePsc.data.links.self.match(/\/company\/([A-Z\d]{8})\/persons-with-significant-control\/corporate-entity\/(.+)/)
  if(!psc_ids) throw new Error('Cannot match PSC ID for record from bulk file: '+JSON.stringify(bulkCorporatePsc.data.links))
  const [,company_number,psc_id] = psc_ids
  if(company_number !== bulkCorporatePsc.company_number) throw new Error('Company number parsed from link does not match: '+JSON.stringify([company_number, bulkCorporatePsc.company_number, bulkCorporatePsc.data.links, {psc_id}]))
  return {...bulkCorporatePsc.data, psc_id,company_number: bulkCorporatePsc.company_number}
}
