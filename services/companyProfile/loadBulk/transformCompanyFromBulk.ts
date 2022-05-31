import type {BulkCompaniesCsvMongo, IntermediateCompany, EurDateString} from "./CompanyProfileTypes";
import {GetCompanyProfileResponse} from "../schemas/getCompanyProfileSchema";
import {randomUUID} from "crypto";

function convertDateFromChToEur(dateString: string): EurDateString {
  const [, day, month, year] = dateString.match(/(\d\d)\/(\d\d)\/(\d{4})/) ?? []
  // @ts-ignore not sure why this doesn't work? seems fine to me
  return `${Number(year)}-${Number(month).toString().padStart(2, '0')}-${Number(day).toString().padStart(2, '0')}`
}

function undefIfEmpty(str: string) {
  return str.length > 0 ? str : undefined
}

export function transformCompanyFromBulk(company: BulkCompaniesCsvMongo.Company): IntermediateCompany {
  return {
      accounts: company.Accounts.AccountCategory === "NO ACCOUNTS FILED" ? undefined : {
        accountCategory: company.Accounts.AccountCategory,
        accountingReference: {day: company.Accounts.AccountRefDay, month: company.Accounts.AccountRefMonth},
        lastMadeUpTo: undefIfEmpty(company.Accounts.LastMadeUpDate) && convertDateFromChToEur(company.Accounts.LastMadeUpDate),
        nextDueDate: undefIfEmpty(company.Accounts.NextDueDate) && convertDateFromChToEur(company.Accounts.NextDueDate)
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
      confirmationStatement: (company.ConfStmtLastMadeUpDate.length + company.ConfStmtLastMadeUpDate.length) === 0 ? undefined : {
        lastMadeUpTo: undefIfEmpty(company.ConfStmtLastMadeUpDate) && convertDateFromChToEur(company.ConfStmtLastMadeUpDate),
        nextDueDate: undefIfEmpty(company.ConfStmtNextDueDate) && convertDateFromChToEur(company.ConfStmtNextDueDate)
      },
      countryOfOrigin: company.CountryOfOrigin,
      dissolutionDate: undefIfEmpty(company.DissolutionDate) && convertDateFromChToEur(company.DissolutionDate),
      incorporationDate: convertDateFromChToEur(company.IncorporationDate),
      limitedPartnerships: {generalPartners: company.LimitedPartnerships.NumGenPartners, limitedPartners: 0},
      mortgages: (company.Mortgages.NumMortCharges + company.Mortgages.NumMortOutstanding + company.Mortgages.NumMortSatisfied + company.Mortgages.NumMortPartSatisfied) > 0 ? {
        mortgageCharges: company.Mortgages.NumMortCharges,
        mortgagesOutstanding: company.Mortgages.NumMortOutstanding,
        mortgagesPartSatisfied: company.Mortgages.NumMortPartSatisfied,
        mortgagesSatisfied: company.Mortgages.NumMortSatisfied
      } : undefined,
      name: company.CompanyName,
      previousNames: [company.PreviousName_1, company.PreviousName_2, company.PreviousName_3, company.PreviousName_4, company.PreviousName_5, company.PreviousName_6, company.PreviousName_7, company.PreviousName_8, company.PreviousName_9, company.PreviousName_10].filter(PreviousName => PreviousName.CompanyName.length > 0).map(PreviousName => ({
        name: PreviousName.CompanyName,
        date: convertDateFromChToEur(PreviousName.CONDATE)
      })),
      returns: (company.Returns.NextDueDate.length + company.Returns.LastMadeUpDate.length) === 0 ? undefined : {
        lastMadeUpTo: undefIfEmpty(company.Returns.LastMadeUpDate) && convertDateFromChToEur(company.Returns.LastMadeUpDate),
        nextDueDate: undefIfEmpty(company.Returns.NextDueDate) && convertDateFromChToEur(company.Returns.NextDueDate)
      },
      sicCodes: company.SICCode.SicText_1 === "None Supplied" ? [] : [company.SICCode.SicText_1, company.SICCode.SicText_2, company.SICCode.SicText_3, company.SICCode.SicText_4].filter(sic => sic.length > 0).map(sic => sic.split('-')[0].trim())
    }
  }

  // transforms a company into the shape of an API response to store in mongo to be served on an endpoint
  export function transformCompany(company: BulkCompaniesCsvMongo.Company): GetCompanyProfileResponse{
  const intermediate = transformCompanyFromBulk(company)
    return {
      can_file: undefined, //todo: work out what this actually means
      company_name: intermediate.name,
      company_number: intermediate.companyNumber,
      etag: randomUUID(),
      date_of_creation: intermediate.incorporationDate,
      registered_office_address: intermediate.address,
      links: {
        self: `/company/${intermediate.companyNumber}`,
        filing_history: `/company/${intermediate.companyNumber}/filing-history`
      },
      type: intermediate.companyCategory,
      sic_codes: intermediate.sicCodes,
      company_status: intermediate.companyStatus,
      confirmation_statement: {
        last_made_up_to: intermediate.confirmationStatement.lastMadeUpTo,
        next_due: intermediate.confirmationStatement.nextDueDate,
        next_made_up_to: undefined //todo: can perhaps calculate this by the accounts reference period and last made up to?
      },
      accounts:{
        accounting_reference_date: {
          month: intermediate.accounts.accountingReference.month.toString(),
          day: intermediate.accounts.accountingReference.day.toString()
        },
        last_accounts: {
          made_up_to: intermediate.accounts.lastMadeUpTo
        },
        next_due: intermediate.accounts.nextDueDate
      }
    }
  }
