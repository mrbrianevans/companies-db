// The shape of objects in mongo after being bulk loaded
export declare module BulkCompaniesCsvMongo {

  interface RegAddress {
    CareOf: string;
    POBox: string;
    AddressLine1: string;
    AddressLine2: string;
    PostTown: string;
    County: string;
    Country: string;
    PostCode: string;
  }

  interface Accounts {
    AccountRefDay: number;
    AccountRefMonth: number;
    NextDueDate: string;
    LastMadeUpDate: string;
    AccountCategory: string;
  }

  interface Returns {
    NextDueDate: string;
    LastMadeUpDate: string;
  }

  interface Mortgages {
    NumMortCharges: number;
    NumMortOutstanding: number;
    NumMortPartSatisfied: number;
    NumMortSatisfied: number;
  }

  interface SICCode {
    SicText_1: string;
    SicText_2: string;
    SicText_3: string;
    SicText_4: string;
  }

  interface LimitedPartnerships {
    NumGenPartners: number;
    NumLimPartners: number;
  }

  interface PreviousName {
    CONDATE: string;
    CompanyName: string;
  }


  export interface Company {
    _id: string;
    CompanyName: string;
    CompanyNumber: string;
    RegAddress: RegAddress;
    CompanyCategory: string;
    CompanyStatus: string;
    CountryOfOrigin: string;
    DissolutionDate: string;
    IncorporationDate: string;
    Accounts: Accounts;
    Returns: Returns;
    Mortgages: Mortgages;
    SICCode: SICCode;
    LimitedPartnerships: LimitedPartnerships;
    URI: string;
    PreviousName_1: PreviousName;
    PreviousName_2: PreviousName;
    PreviousName_3: PreviousName;
    PreviousName_4: PreviousName;
    PreviousName_5: PreviousName;
    PreviousName_6: PreviousName;
    PreviousName_7: PreviousName;
    PreviousName_8: PreviousName;
    PreviousName_9: PreviousName;
    PreviousName_10: PreviousName;
    ConfStmtNextDueDate: string;
    ConfStmtLastMadeUpDate: string;
  }

}
// yyyy-mm-dd
// export type EurDateString = `${number}-${number}-${number}`
export type EurDateString = string

export interface IntermediateCompany {
  name: string;
  companyNumber: string;
  address: {
    careOf?: string;
    poBox?: string;
    addressLine1: string;
    addressLine2?: string;
    postTown?: string;
    county?: string;
    country?: string;
    postCode: string;
  };
  companyCategory: string;
  companyStatus: string;
  countryOfOrigin: string;
  dissolutionDate?: EurDateString;
  incorporationDate: EurDateString;
  accounts?: {
    lastMadeUpTo?: EurDateString,
    nextDueDate?: EurDateString,
    accountingReference: {
      day: number,
      month: number
    },
    accountCategory: string
  };
  returns?: {
    lastMadeUpTo?: EurDateString,
    nextDueDate?: EurDateString
  };
  mortgages?: {
    mortgageCharges: number;
    mortgagesOutstanding: number;
    mortgagesPartSatisfied: number;
    mortgagesSatisfied: number;
  };
  sicCodes: string[];
  limitedPartnerships?: { generalPartners: number, limitedPartners: number };
  previousNames: { name: string, date: EurDateString }[];
  confirmationStatement?: {
    lastMadeUpTo?: EurDateString,
    nextDueDate?: EurDateString
  }
}
