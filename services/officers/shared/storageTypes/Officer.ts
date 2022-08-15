type Date = { day?: number | undefined, month?: number | undefined, year?: number | undefined } | undefined

export interface OfficerStorage {
  personNumber: number,
  personNumberPrefix: string,
  companyNumber: string,
  appointmentDateOrigin: string,
  appointmentType: string,
  corporateIndicator: boolean,
  appointmentDate: Date,
  resignationDate: Date,
  dateOfBirth: Date,
  name: {
    title: string | undefined, forenames: string | undefined, surname: string , honours: string | undefined
  },
  address: {
    careOf: string | undefined, poBox: string | undefined, postCode: string | undefined, addressLine1: string | undefined, addressLine2: string | undefined, postTown: string | undefined, county: string | undefined, country: string | undefined
  },
  occupation: string | undefined,
  nationality: string | undefined,
  usualResidentialCountry: string | undefined
}
