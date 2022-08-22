import type {BulkCompaniesCsvMongo, EurDateString, IntermediateCompany} from "./CompanyProfileTypes";
import type {CompanyStorage} from '../shared/CompanyStorage.js'
import {randomUUID} from "crypto";
import {removeNulls} from '../shared/utils.js'

function convertDateFromChToEur(dateString?: undefined): undefined
function convertDateFromChToEur(dateString: string): EurDateString
function convertDateFromChToEur(dateString: string | undefined): EurDateString | undefined
function convertDateFromChToEur(dateString) {
  if (undefIfEmpty(dateString) === undefined) return undefined
  const [, day, month, year] = dateString.match(/(\d\d)\/(\d\d)\/(\d{4})/) ?? []
  // @ts-ignore not sure why this doesn't work? seems fine to me
  return `${Number(year)}-${Number(month).toString().padStart(2, '0')}-${Number(day).toString().padStart(2, '0')}`
}

function undefIfEmpty(str?: string) {
  return str !== undefined && str.length > 0 ? str : undefined
}

export function transformCompanyFromBulk(company: BulkCompaniesCsvMongo.Company): IntermediateCompany {
  return {
    accounts: !company.Accounts || company.Accounts.AccountCategory === "NO ACCOUNTS FILED" ? undefined : {
      accountCategory: company.Accounts.AccountCategory,
      accountingReference: {day: company.Accounts.AccountRefDay, month: company.Accounts.AccountRefMonth},
      lastMadeUpTo: convertDateFromChToEur(company.Accounts.LastMadeUpDate),
      nextDueDate: convertDateFromChToEur(company.Accounts.NextDueDate)
    },
    address: {
      addressLine1: company.RegAddress.AddressLine1,
      addressLine2: undefIfEmpty(company.RegAddress.AddressLine2),
      careOf: undefIfEmpty(company.RegAddress.CareOf),
      poBox: undefIfEmpty(company.RegAddress.POBox),
      country: undefIfEmpty(company.RegAddress.Country),
      county: undefIfEmpty(company.RegAddress.County),
      postCode: company.RegAddress.PostCode,
      postTown: undefIfEmpty(company.RegAddress.PostTown)
    },
    companyCategory: company.CompanyCategory,
    companyNumber: String(company.CompanyNumber).padStart(8, '0'),
    companyStatus: company.CompanyStatus,
    confirmationStatement: (company.ConfStmtLastMadeUpDate && company.ConfStmtLastMadeUpDate) ? {
      lastMadeUpTo: convertDateFromChToEur(company.ConfStmtLastMadeUpDate),
      nextDueDate: convertDateFromChToEur(company.ConfStmtNextDueDate)
    } : undefined,
    countryOfOrigin: company.CountryOfOrigin,
    dissolutionDate: undefIfEmpty(company.DissolutionDate) && convertDateFromChToEur(company.DissolutionDate),
    incorporationDate: convertDateFromChToEur(company.IncorporationDate),
    limitedPartnerships: company.LimitedPartnerships ? {
      generalPartners: company.LimitedPartnerships.NumGenPartners,
      limitedPartners: company.LimitedPartnerships.NumLimPartners
    } : undefined,
    mortgages: company.Mortgages && (company.Mortgages.NumMortCharges + company.Mortgages.NumMortOutstanding + company.Mortgages.NumMortSatisfied + company.Mortgages.NumMortPartSatisfied) > 0 ? {
      mortgageCharges: company.Mortgages.NumMortCharges,
      mortgagesOutstanding: company.Mortgages.NumMortOutstanding,
      mortgagesPartSatisfied: company.Mortgages.NumMortPartSatisfied,
      mortgagesSatisfied: company.Mortgages.NumMortSatisfied
    } : undefined,
    name: company.CompanyName,
    previousNames: [company.PreviousName_1, company.PreviousName_2, company.PreviousName_3, company.PreviousName_4, company.PreviousName_5, company.PreviousName_6, company.PreviousName_7, company.PreviousName_8, company.PreviousName_9, company.PreviousName_10].filter(PreviousName => PreviousName.CompanyName).map(PreviousName => ({
      name: <string>PreviousName.CompanyName, // assertion because array has been filtered
      conDate: <string>convertDateFromChToEur(PreviousName.CONDATE)
    })),
    returns: (company.Returns.NextDueDate && company.Returns.LastMadeUpDate) ? {
      lastMadeUpTo: convertDateFromChToEur(company.Returns.LastMadeUpDate),
      nextDueDate: convertDateFromChToEur(company.Returns.NextDueDate)
    } : undefined,
    sicCodes: company.SICCode.SicText_1 === "None Supplied" ? [] : [company.SICCode.SicText_1, company.SICCode.SicText_2, company.SICCode.SicText_3, company.SICCode.SicText_4].filter(sic => sic).map(sic => (<string>sic).split('-')[0].trim())
  }
}

// transforms a company into the shape of an API response to store in mongo to be served on an endpoint
export function transformCompany(company: BulkCompaniesCsvMongo.Company): CompanyStorage {
  const {
    accounts,
    address: {addressLine1, addressLine2, careOf, country, county, poBox, postCode, postTown},
    companyCategory,
    companyNumber,
    companyStatus,
    confirmationStatement,
    incorporationDate,
    name,
    sicCodes,
    previousNames,
    dissolutionDate,
    returns,
    mortgages
  } = transformCompanyFromBulk(company)

  const transformedCompany: CompanyStorage = {
    accounts: accounts ? {
      accounting_reference_date: accounts.accountingReference ? {
        month: accounts.accountingReference.month?.toString(), day: accounts.accountingReference.day?.toString()
      } : undefined, last_accounts: {
        made_up_to: accounts.lastMadeUpTo, type: transformAccountsTypeToEnum(accounts.accountCategory)
      }, next_due: accounts.nextDueDate,
    } : undefined,
    company_name: name,
    company_number: companyNumber,
    company_status: transformStatusToEnum(companyStatus),
    status: transformStatusToEnum(companyStatus),
    company_status_detail: transformStatusDetailToEnum(companyStatus),
    confirmation_statement: {
      last_made_up_to: confirmationStatement?.lastMadeUpTo ?? undefined,
      next_due: confirmationStatement?.nextDueDate ?? undefined
    },
    date_of_creation: incorporationDate,
    etag: randomUUID(), // not good! this ought to be changed?
    has_charges: mortgages !== undefined ? mortgages.mortgageCharges > 0 : undefined,
    jurisdiction: '', //todo: get this from the company number format (eg prefix NI = northern-ireland)
    links: {
      self: `/company/${companyNumber}`,
      filing_history: `/company/${companyNumber}/filing-history`,
      persons_with_significant_control: `/company/${companyNumber}/persons-with-significant-control`,
      officers: `/company/${companyNumber}/officers`
    },
    registered_office_address: {
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      country: country,
      care_of: careOf,
      locality: postTown,
      po_box: poBox,
      region: county,
      postal_code: postCode
    },
    sic_codes: sicCodes,
    type: transformCompanyTypeToEnum(companyCategory) ?? 'other', // this is sometimes erroneously undefined
    // previous names. work out effective from and ceased on dates.
    previous_company_names: transformPreviousNames(previousNames, incorporationDate),
    date_of_dissolution: dissolutionDate,
    annual_return: returns ? {
      last_made_up_to: returns.lastMadeUpTo, next_due: returns.nextDueDate,
    } : undefined,
  };
  removeNulls(transformedCompany)
  return transformedCompany
}


function transformPreviousNames(previousNames: { name: string, conDate: string }[], dateOfCreation: string): { [p: string]: unknown, ceased_on: string, name: string, effective_from: string }[] | undefined {
  if (previousNames.length === 0) return undefined
  else {
    const dates = [dateOfCreation, ...previousNames.map(n => n.conDate)]
    const names = previousNames.map(n => n.name)
    return names.map((name, i) => ({name, effective_from: dates[i], ceased_on: dates[i + 1]}))
  }
}

//todo: these should be generated in shared for all enum constants
const statusEnums = {
  'active': "Active",
  'dissolved': "Dissolved",
  'liquidation': "Liquidation",
  'receivership': "Receiver Action",
  'converted-closed': "Converted / Closed",
  'voluntary-arrangement': "Voluntary Arrangement",
  'insolvency-proceedings': "Insolvency Proceedings",
  'administration': "In Administration",
  'open': "Open",
  'closed': "Closed",
  'registered': "Registered",
  'removed': "Removed"
}

const statusDetailEnums = {
  'active': "",
  'dissolved': "",
  'converted-closed': "",
  'transferred-from-uk': "Transfer from UK",
  'active-proposal-to-strike-off': "Active proposal to strike off",
  'petition-to-restore-dissolved': "Petition to restore dissolved",
  'transformed-to-se': "Transformed to SE",
  'converted-to-plc': "Converted to PLC",
  'converted-to-uk-societas': "Converted to UK Societas",
  'converted-to-ukeig': "Converted to UKEIG"
}

/** converts Active to active */
function transformStatusToEnum(status: string): string | undefined {
  return Object.entries(statusEnums).find(([, s]) => status.startsWith(s))?.[0]
}

// removes punctuation and sets to lowercase
function normString(str: string) {
  return str.replaceAll(/[^a-z\d ]/gi, '').toLowerCase()
}

/** converts "Active - Proposal to strike off" to "active-proposal-to-strike-off" */
function transformStatusDetailToEnum(status: string): string | undefined {
  // this doesn't seem to match any for some reason. not sure why.
  return Object.entries(statusDetailEnums).find(([, s]) => normString(s) === normString(status))?.[0]
}

const typeEnums = {
  'private-unlimited': "Private unlimited company",
  'ltd': "Private limited company",
  'plc': "Public limited company",
  'old-public-company': "Old public company",
  'private-limited-guarant-nsc-limited-exemption': "Private Limited Company by guarantee without share capital, use of 'Limited' exemption",
  'limited-partnership': "Limited partnership",
  'private-limited-guarant-nsc': "Private limited by guarantee without share capital",
  'converted-or-closed': "Converted / closed",
  'private-unlimited-nsc': "Private unlimited company without share capital",
  'private-limited-shares-section-30-exemption': "Private Limited Company, use of 'Limited' exemption",
  'protected-cell-company': "Protected cell company",
  'assurance-company': "Assurance company",
  'oversea-company': "Overseas company",
  'eeig-establishment': "European Economic Interest Grouping Establishment (EEIG)",
  'icvc-securities': "Investment company with variable capital",
  'icvc-warrant': "Investment company with variable capital",
  'icvc-umbrella': "Investment company with variable capital",
  'registered-society-non-jurisdictional': "Registered society",
  'industrial-and-provident-society': "Industrial and Provident society",
  'northern-ireland': "Northern Ireland company",
  'northern-ireland-other': "Credit union (Northern Ireland)",
  'llp': "Limited liability partnership",
  'royal-charter': "Royal charter company",
  'investment-company-with-variable-capital': "Investment company with variable capital",
  'unregistered-company': "Unregistered company",
  'other': "Other company type",
  'european-public-limited-liability-company-se': "European public limited liability company (SE)",
  'united-kingdom-societas': "United Kingdom Societas",
  'uk-establishment': "UK establishment company",
  'scottish-partnership': "Scottish qualifying partnership",
  'charitable-incorporated-organisation': "Charitable incorporated organisation",
  'scottish-charitable-incorporated-organisation': "Scottish charitable incorporated organisation",
  'further-education-or-sixth-form-college-corporation': "Further education or sixth form college corporation",
  'eeig': "European Economic Interest Grouping (EEIG)",
  'ukeig': "United Kingdom Economic Interest Grouping",
  'registered-overseas-entity': "Overseas entity"
}

function transformCompanyTypeToEnum(type: string): string | undefined {
  // there are plenty like this which don't match:
  // PRI/LTD BY GUAR/NSC (Private, limited by guarantee, no share capital)
  return Object.entries(typeEnums).find(([, t]) => t.toLowerCase() === type.toLowerCase())?.[0]
}


const accountsTypeEnums = {
  'null': "Null",
  'full': "Full",
  'small': "Small",
  'medium': "Medium",
  'group': "Group",
  'dormant': "Dormant",
  'interim': "Interim",
  'initial': "Initial",
  'total-exemption-full': "Total Exemption Full",
  'total-exemption-small': "Total Exemption Small",
  'partial-exemption': "Partial Exemption",
  'audit-exemption-subsidiary': "Audit Exemption Subsidiary",
  'filing-exemption-subsidiary': "Filing Exemption Subsidiary",
  'micro-entity': "Micro Entity",
  'no-accounts-type-available': "No accounts type available",
  'audited-abridged': "Audited abridged",
  'unaudited-abridged': "Unaudited abridged"
}

function transformAccountsTypeToEnum(type: string): string | undefined {
  return Object.entries(accountsTypeEnums).find(([, t]) => t.toLowerCase() === type.toLowerCase())?.[0] ?? undefined
}
