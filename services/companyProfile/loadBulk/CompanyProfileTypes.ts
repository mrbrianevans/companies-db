// The shape of objects in mongo after being bulk loaded
export declare module BulkCompaniesCsvMongo {

  interface RegAddress {
    CareOf?: string;
    POBox?: string;
    AddressLine1: string;
    AddressLine2?: string;
    PostTown: string;
    County?: string;
    Country?: string;
    PostCode: string;
  }

  interface Accounts {
    AccountRefDay: number;
    AccountRefMonth: number;
    NextDueDate?: string;
    LastMadeUpDate?: string;
    AccountCategory: string;
  }

  interface Returns {
    NextDueDate?: string;
    LastMadeUpDate?: string;
  }

  interface Mortgages {
    NumMortCharges: number;
    NumMortOutstanding: number;
    NumMortPartSatisfied: number;
    NumMortSatisfied: number;
  }

  interface SICCode {
    SicText_1: string;
    SicText_2?: string;
    SicText_3?: string;
    SicText_4?: string;
  }

  interface LimitedPartnerships {
    NumGenPartners: number;
    NumLimPartners: number;
  }

  interface PreviousName {
    CONDATE?: string;
    CompanyName?: string;
  }


  export interface Company {
    _id?: string;
    CompanyName: string;
    CompanyNumber: string;
    RegAddress: RegAddress;
    CompanyCategory: string;
    CompanyStatus: string;
    CountryOfOrigin: string;
    DissolutionDate?: string;
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
    ConfStmtLastMadeUpDate?: string;
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
  previousNames: { name: string, conDate: EurDateString }[];
  confirmationStatement?: {
    lastMadeUpTo?: EurDateString,
    nextDueDate?: EurDateString
  }
}


const sampleBulkCsvCompanies: BulkCompaniesCsvMongo.Company[] = [
  {
    CompanyName: '! LIMITED',
    CompanyNumber: '12778855',
    CompanyCategory: 'Private Limited Company',
    CompanyStatus: 'Active',
    CountryOfOrigin: 'United Kingdom',
    DissolutionDate: undefined,
    IncorporationDate: '29/07/2020',
    URI: 'http://business.data.gov.uk/id/company/12778855',
    ConfStmtNextDueDate: '11/08/2021',
    ConfStmtLastMadeUpDate: undefined,
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: 'UNIT 3 NEWTON BUSINESS CENTRE',
      AddressLine2: 'NEWTON CHAMBERS ROAD',
      PostTown: 'SHEFFIELD',
      County: undefined,
      Country: 'UNITED KINGDOM',
      PostCode: 'S35 2PH'
    },
    Accounts: {
      AccountRefDay: 31,
      AccountRefMonth: 7,
      NextDueDate: '29/04/2022',
      LastMadeUpDate: undefined,
      AccountCategory: 'NO ACCOUNTS FILED'
    },
    Returns: { NextDueDate: '26/08/2021', LastMadeUpDate: undefined },
    Mortgages: {
      NumMortCharges: 0,
      NumMortOutstanding: 0,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: '78300 - Human resources provision and management of human resources functions',
      SicText_2: undefined,
      SicText_3: undefined,
      SicText_4: undefined
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  },
  {
    CompanyName: '! LTD',
    CompanyNumber: '08209948',
    CompanyCategory: 'Private Limited Company',
    CompanyStatus: 'Active',
    CountryOfOrigin: 'United Kingdom',
    DissolutionDate: undefined,
    IncorporationDate: '11/09/2012',
    URI: 'http://business.data.gov.uk/id/company/08209948',
    ConfStmtNextDueDate: '25/09/2021',
    ConfStmtLastMadeUpDate: '11/09/2020',
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: 'METROHOUSE 57 PEPPER ROAD',
      AddressLine2: 'HUNSLET',
      PostTown: 'LEEDS',
      County: 'YORKSHIRE',
      Country: undefined,
      PostCode: 'LS10 2RU'
    },
    Accounts: {
      AccountRefDay: 30,
      AccountRefMonth: 9,
      NextDueDate: '30/06/2022',
      LastMadeUpDate: '30/09/2020',
      AccountCategory: 'DORMANT'
    },
    Returns: { NextDueDate: '09/10/2016', LastMadeUpDate: '11/09/2015' },
    Mortgages: {
      NumMortCharges: 0,
      NumMortOutstanding: 0,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: '99999 - Dormant Company',
      SicText_2: undefined,
      SicText_3: undefined,
      SicText_4: undefined
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  },
  {
    CompanyName: '!? LTD',
    CompanyNumber: '11399177',
    CompanyCategory: 'Private Limited Company',
    CompanyStatus: 'Active',
    CountryOfOrigin: 'United Kingdom',
    DissolutionDate: undefined,
    IncorporationDate: '05/06/2018',
    URI: 'http://business.data.gov.uk/id/company/11399177',
    ConfStmtNextDueDate: '19/06/2022',
    ConfStmtLastMadeUpDate: '05/06/2021',
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: 'THE STUDIO HATHERLOW HOUSE',
      AddressLine2: 'HATHERLOW',
      PostTown: 'ROMILEY',
      County: undefined,
      Country: 'UNITED KINGDOM',
      PostCode: 'SK6 3DY'
    },
    Accounts: {
      AccountRefDay: 30,
      AccountRefMonth: 6,
      NextDueDate: '31/03/2022',
      LastMadeUpDate: '30/06/2020',
      AccountCategory: 'TOTAL EXEMPTION FULL'
    },
    Returns: { NextDueDate: '03/07/2019', LastMadeUpDate: undefined },
    Mortgages: {
      NumMortCharges: 0,
      NumMortOutstanding: 0,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: '47710 - Retail sale of clothing in specialised stores',
      SicText_2: undefined,
      SicText_3: undefined,
      SicText_4: undefined
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  },
  {
    CompanyName: '!BIG IMPACT GRAPHICS LIMITED',
    CompanyNumber: '11743365',
    CompanyCategory: 'Private Limited Company',
    CompanyStatus: 'Active',
    CountryOfOrigin: 'United Kingdom',
    DissolutionDate: undefined,
    IncorporationDate: '28/12/2018',
    URI: 'http://business.data.gov.uk/id/company/11743365',
    ConfStmtNextDueDate: '10/01/2022',
    ConfStmtLastMadeUpDate: '27/12/2020',
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: '372 OLD STREET',
      AddressLine2: '335 ROSDEN HOUSE',
      PostTown: 'LONDON',
      County: undefined,
      Country: 'UNITED KINGDOM',
      PostCode: 'EC1V 9LT'
    },
    Accounts: {
      AccountRefDay: 31,
      AccountRefMonth: 12,
      NextDueDate: '30/09/2021',
      LastMadeUpDate: '31/12/2019',
      AccountCategory: 'DORMANT'
    },
    Returns: { NextDueDate: '25/01/2020', LastMadeUpDate: undefined },
    Mortgages: {
      NumMortCharges: 0,
      NumMortOutstanding: 0,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: '18129 - Printing n.e.c.',
      SicText_2: '59112 - Video production activities',
      SicText_3: '63120 - Web portals',
      SicText_4: '74201 - Portrait photographic activities'
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  },
  {
    CompanyName: '!GOBERUB LTD',
    CompanyNumber: '13404790',
    CompanyCategory: 'Private Limited Company',
    CompanyStatus: 'Active',
    CountryOfOrigin: 'United Kingdom',
    DissolutionDate: undefined,
    IncorporationDate: '17/05/2021',
    URI: 'http://business.data.gov.uk/id/company/13404790',
    ConfStmtNextDueDate: '30/05/2022',
    ConfStmtLastMadeUpDate: undefined,
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: '30 MAZE GREEN ROAD',
      AddressLine2: undefined,
      PostTown: "BISHOP'S STORTFORD",
      County: undefined,
      Country: 'ENGLAND',
      PostCode: 'CM23 2PJ'
    },
    Accounts: {
      AccountRefDay: 31,
      AccountRefMonth: 5,
      NextDueDate: '17/02/2023',
      LastMadeUpDate: undefined,
      AccountCategory: 'NO ACCOUNTS FILED'
    },
    Returns: { NextDueDate: '14/06/2022', LastMadeUpDate: undefined },
    Mortgages: {
      NumMortCharges: 0,
      NumMortOutstanding: 0,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: '62020 - Information technology consultancy activities',
      SicText_2: '70229 - Management consultancy activities other than financial management',
      SicText_3: '79110 - Travel agency activities',
      SicText_4: undefined
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  },
  {
    CompanyName: '!L PRODUCTIONS LIMITED',
    CompanyNumber: '12402527',
    CompanyCategory: 'Private Limited Company',
    CompanyStatus: 'Active - Proposal to Strike off',
    CountryOfOrigin: 'United Kingdom',
    DissolutionDate: undefined,
    IncorporationDate: '14/01/2020',
    URI: 'http://business.data.gov.uk/id/company/12402527',
    ConfStmtNextDueDate: '24/02/2021',
    ConfStmtLastMadeUpDate: undefined,
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: '95 MARMION AVENUE',
      AddressLine2: undefined,
      PostTown: 'CHINGFORD',
      County: undefined,
      Country: 'ENGLAND',
      PostCode: 'E4 8EJ'
    },
    Accounts: {
      AccountRefDay: 31,
      AccountRefMonth: 1,
      NextDueDate: '14/10/2021',
      LastMadeUpDate: undefined,
      AccountCategory: 'NO ACCOUNTS FILED'
    },
    Returns: { NextDueDate: '11/02/2021', LastMadeUpDate: undefined },
    Mortgages: {
      NumMortCharges: 0,
      NumMortOutstanding: 0,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: '90030 - Artistic creation',
      SicText_2: undefined,
      SicText_3: undefined,
      SicText_4: undefined
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  },
  {
    CompanyName: '!NNOV8 LIMITED',
    CompanyNumber: '11006939',
    CompanyCategory: 'Private Limited Company',
    CompanyStatus: 'Active',
    CountryOfOrigin: 'United Kingdom',
    DissolutionDate: undefined,
    IncorporationDate: '11/10/2017',
    URI: 'http://business.data.gov.uk/id/company/11006939',
    ConfStmtNextDueDate: '24/10/2021',
    ConfStmtLastMadeUpDate: '10/10/2020',
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: 'OLD BARN FARM',
      AddressLine2: 'HARTFIELD ROAD',
      PostTown: 'EDENBRIDGE',
      County: undefined,
      Country: 'ENGLAND',
      PostCode: 'TN8 5NF'
    },
    Accounts: {
      AccountRefDay: 31,
      AccountRefMonth: 3,
      NextDueDate: '31/12/2021',
      LastMadeUpDate: '31/03/2020',
      AccountCategory: 'MICRO ENTITY'
    },
    Returns: { NextDueDate: '08/11/2018', LastMadeUpDate: undefined },
    Mortgages: {
      NumMortCharges: 0,
      NumMortOutstanding: 0,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: '62090 - Other information technology service activities',
      SicText_2: '70229 - Management consultancy activities other than financial management',
      SicText_3: undefined,
      SicText_4: undefined
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  },
  {
    CompanyName: '!NSPIRED INVESTMENTS LTD',
    CompanyNumber: 'SC606050',
    CompanyCategory: 'Private Limited Company',
    CompanyStatus: 'Active',
    CountryOfOrigin: 'United Kingdom',
    DissolutionDate: undefined,
    IncorporationDate: '22/08/2018',
    URI: 'http://business.data.gov.uk/id/company/SC606050',
    ConfStmtNextDueDate: '12/02/2022',
    ConfStmtLastMadeUpDate: '29/01/2021',
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: '26 POLMUIR ROAD',
      AddressLine2: undefined,
      PostTown: 'ABERDEEN',
      County: undefined,
      Country: 'SCOTLAND',
      PostCode: 'AB11 7SY'
    },
    Accounts: {
      AccountRefDay: 31,
      AccountRefMonth: 8,
      NextDueDate: '31/05/2022',
      LastMadeUpDate: '31/08/2020',
      AccountCategory: 'TOTAL EXEMPTION FULL'
    },
    Returns: { NextDueDate: '19/09/2019', LastMadeUpDate: undefined },
    Mortgages: {
      NumMortCharges: 4,
      NumMortOutstanding: 4,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: '68209 - Other letting and operating of own or leased real estate',
      SicText_2: undefined,
      SicText_3: undefined,
      SicText_4: undefined
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  },
  {
    CompanyName: '!NSPIRED LTD',
    CompanyNumber: 'SC421617',
    CompanyCategory: 'Private Limited Company',
    CompanyStatus: 'Active',
    CountryOfOrigin: 'United Kingdom',
    DissolutionDate: undefined,
    IncorporationDate: '11/04/2012',
    URI: 'http://business.data.gov.uk/id/company/SC421617',
    ConfStmtNextDueDate: '25/04/2022',
    ConfStmtLastMadeUpDate: '11/04/2021',
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: '26 POLMUIR ROAD',
      AddressLine2: undefined,
      PostTown: 'ABERDEEN',
      County: undefined,
      Country: 'UNITED KINGDOM',
      PostCode: 'AB11 7SY'
    },
    Accounts: {
      AccountRefDay: 31,
      AccountRefMonth: 3,
      NextDueDate: '31/12/2022',
      LastMadeUpDate: '31/03/2021',
      AccountCategory: 'TOTAL EXEMPTION FULL'
    },
    Returns: { NextDueDate: '09/05/2017', LastMadeUpDate: '11/04/2016' },
    Mortgages: {
      NumMortCharges: 0,
      NumMortOutstanding: 0,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: '70229 - Management consultancy activities other than financial management',
      SicText_2: undefined,
      SicText_3: undefined,
      SicText_4: undefined
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  },
  {
    CompanyName: '!NVERTD DESIGNS LIMITED',
    CompanyNumber: '09152972',
    CompanyCategory: 'Private Limited Company',
    CompanyStatus: 'Active',
    CountryOfOrigin: 'United Kingdom',
    DissolutionDate: undefined,
    IncorporationDate: '30/07/2014',
    URI: 'http://business.data.gov.uk/id/company/09152972',
    ConfStmtNextDueDate: '13/08/2021',
    ConfStmtLastMadeUpDate: '30/07/2020',
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: '2 SANDROCKS LODGE',
      AddressLine2: 'ROCKY LANE',
      PostTown: 'HAYWARDS HEATH',
      County: undefined,
      Country: 'ENGLAND',
      PostCode: 'RH16 4RW'
    },
    Accounts: {
      AccountRefDay: 31,
      AccountRefMonth: 7,
      NextDueDate: '30/04/2022',
      LastMadeUpDate: '31/07/2020',
      AccountCategory: 'MICRO ENTITY'
    },
    Returns: { NextDueDate: '27/08/2016', LastMadeUpDate: '30/07/2015' },
    Mortgages: {
      NumMortCharges: 0,
      NumMortOutstanding: 0,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: '58190 - Other publishing activities',
      SicText_2: undefined,
      SicText_3: undefined,
      SicText_4: undefined
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  },
  {
    CompanyName: '!OBAC LIMITED',
    CompanyNumber: 'FC031362',
    CompanyCategory: 'Other company type',
    CompanyStatus: 'Active',
    CountryOfOrigin: 'CHANNEL ISLANDS',
    DissolutionDate: undefined,
    IncorporationDate: '30/11/2012',
    URI: 'http://business.data.gov.uk/id/company/FC031362',
    ConfStmtNextDueDate: '14/12/2016',
    ConfStmtLastMadeUpDate: undefined,
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: '1ST AND 2ND FLOORS ELIZABETH HOUSE',
      AddressLine2: 'LES RUETIES BRAYES',
      PostTown: 'ST PETER PORT',
      County: 'GUERNSEY',
      Country: 'GUERNSEY',
      PostCode: 'GY1 1EW'
    },
    Accounts: {
      AccountRefDay: 31,
      AccountRefMonth: 12,
      NextDueDate: undefined,
      LastMadeUpDate: '31/12/2019',
      AccountCategory: 'FULL'
    },
    Returns: { NextDueDate: undefined, LastMadeUpDate: undefined },
    Mortgages: {
      NumMortCharges: 0,
      NumMortOutstanding: 0,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: 'None Supplied',
      SicText_2: undefined,
      SicText_3: undefined,
      SicText_4: undefined
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  },
  {
    CompanyName: '!OBAC UK LIMITED',
    CompanyNumber: '07687209',
    CompanyCategory: 'Private Limited Company',
    CompanyStatus: 'Active',
    CountryOfOrigin: 'United Kingdom',
    DissolutionDate: undefined,
    IncorporationDate: '29/06/2011',
    URI: 'http://business.data.gov.uk/id/company/07687209',
    ConfStmtNextDueDate: '13/07/2021',
    ConfStmtLastMadeUpDate: '29/06/2020',
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: 'UNIT 9   BERRY COURT FARM BRAMLEY ROAD',
      AddressLine2: 'LITTLE LONDON',
      PostTown: 'TADLEY',
      County: 'HAMPSHIRE',
      Country: undefined,
      PostCode: 'RG26 5AT'
    },
    Accounts: {
      AccountRefDay: 29,
      AccountRefMonth: 12,
      NextDueDate: '29/09/2021',
      LastMadeUpDate: '31/12/2019',
      AccountCategory: 'TOTAL EXEMPTION FULL'
    },
    Returns: { NextDueDate: '27/07/2017', LastMadeUpDate: '29/06/2016' },
    Mortgages: {
      NumMortCharges: 1,
      NumMortOutstanding: 1,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: '70229 - Management consultancy activities other than financial management',
      SicText_2: undefined,
      SicText_3: undefined,
      SicText_4: undefined
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: '15/07/2011', CompanyName: '!OBAC FITTINGS LIMITED' },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  },
  {
    CompanyName: '!YOZO FASS LIMITED',
    CompanyNumber: '02714021',
    CompanyCategory: 'Private Limited Company',
    CompanyStatus: 'Active',
    CountryOfOrigin: 'United Kingdom',
    DissolutionDate: undefined,
    IncorporationDate: '12/05/1992',
    URI: 'http://business.data.gov.uk/id/company/02714021',
    ConfStmtNextDueDate: '26/05/2022',
    ConfStmtLastMadeUpDate: '12/05/2021',
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: '1 VERONICA HOUSE',
      AddressLine2: 'WICKHAM ROAD',
      PostTown: 'BROCKLEY',
      County: undefined,
      Country: undefined,
      PostCode: 'SE4 1NQ'
    },
    Accounts: {
      AccountRefDay: 31,
      AccountRefMonth: 3,
      NextDueDate: '31/12/2021',
      LastMadeUpDate: '31/03/2020',
      AccountCategory: 'DORMANT'
    },
    Returns: { NextDueDate: '09/06/2017', LastMadeUpDate: '12/05/2016' },
    Mortgages: {
      NumMortCharges: 0,
      NumMortOutstanding: 0,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: '90010 - Performing arts',
      SicText_2: undefined,
      SicText_3: undefined,
      SicText_4: undefined
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  },
  {
    CompanyName: '" BORA " 2 LTD',
    CompanyNumber: '13220580',
    CompanyCategory: 'PRI/LTD BY GUAR/NSC (Private, limited by guarantee, no share capital)',
    CompanyStatus: 'Active',
    CountryOfOrigin: 'United Kingdom',
    DissolutionDate: undefined,
    IncorporationDate: '23/02/2021',
    URI: 'http://business.data.gov.uk/id/company/13220580',
    ConfStmtNextDueDate: '08/03/2022',
    ConfStmtLastMadeUpDate: undefined,
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: '26 CARMICHAEL CLOSE',
      AddressLine2: 'WINSTANLEY ESTATE',
      PostTown: 'LONDON',
      County: 'BATTERSEA',
      Country: 'ENGLAND',
      PostCode: 'SW11 2HS'
    },
    Accounts: {
      AccountRefDay: 28,
      AccountRefMonth: 2,
      NextDueDate: '23/11/2022',
      LastMadeUpDate: undefined,
      AccountCategory: 'NO ACCOUNTS FILED'
    },
    Returns: { NextDueDate: '23/03/2022', LastMadeUpDate: undefined },
    Mortgages: {
      NumMortCharges: 0,
      NumMortOutstanding: 0,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: '47820 - Retail sale via stalls and markets of textiles, clothing and footwear',
      SicText_2: '56103 - Take-away food shops and mobile food stands',
      SicText_3: undefined,
      SicText_4: undefined
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  },
  {
    CompanyName: '" TRIPLE D" PROPERTIES LIMITED',
    CompanyNumber: '13310195',
    CompanyCategory: 'Private Limited Company',
    CompanyStatus: 'Active',
    CountryOfOrigin: 'United Kingdom',
    DissolutionDate: undefined,
    IncorporationDate: '01/04/2021',
    URI: 'http://business.data.gov.uk/id/company/13310195',
    ConfStmtNextDueDate: '14/05/2022',
    ConfStmtLastMadeUpDate: '30/04/2021',
    RegAddress: {
      CareOf: undefined,
      POBox: undefined,
      AddressLine1: '66 MORRIS STREET',
      AddressLine2: undefined,
      PostTown: 'WEST BROMWICH',
      County: undefined,
      Country: 'ENGLAND',
      PostCode: 'B70 7SP'
    },
    Accounts: {
      AccountRefDay: 30,
      AccountRefMonth: 4,
      NextDueDate: '01/01/2023',
      LastMadeUpDate: undefined,
      AccountCategory: 'NO ACCOUNTS FILED'
    },
    Returns: { NextDueDate: '29/04/2022', LastMadeUpDate: undefined },
    Mortgages: {
      NumMortCharges: 0,
      NumMortOutstanding: 0,
      NumMortPartSatisfied: 0,
      NumMortSatisfied: 0
    },
    SICCode: {
      SicText_1: '68209 - Other letting and operating of own or leased real estate',
      SicText_2: '68320 - Management of real estate on a fee or contract basis',
      SicText_3: undefined,
      SicText_4: undefined
    },
    LimitedPartnerships: { NumGenPartners: 0, NumLimPartners: 0 },
    PreviousName_1: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_2: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_3: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_4: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_5: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_6: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_7: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_8: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_9: { CONDATE: undefined, CompanyName: undefined },
    PreviousName_10: { CONDATE: undefined, CompanyName: undefined }
  }
]
