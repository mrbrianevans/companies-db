type Date = { day?: number | undefined, month?: number | undefined, year?: number | undefined }
/**
 * When scripts wish to access the officers collection, they ought to do it like this.
 * @example
 * mongo.db(mongoDbName).collection<OfficerStorage>(officerCollectionName)
 */
export const officerCollectionName = 'officers'
export interface OfficerStorage {
  // these are not (directly) sent in API responses
  person_number: number,
  person_number_prefix: string,
  company_number: string,
  appointment_date_origin: string,
  resignation_date_origin?: string,
  // these require some modification before they can sent in an API response
  name_elements: {
    title?: string , forenames?: string , surname: string , honours?: string
  },

  // these are in the right format for API responses, no modification needed
  appointed_on: string,
  resigned_on?: string,
  is_corporate_officer: boolean,
  officer_role: string,
  resigned: boolean,
  date_of_birth?: { month: number , year: number  },
  address: {
    care_of?: string , po_box?: string , postal_code?: string , address_line_1?: string ,
    address_line_2?: string , locality?: string , region?: string , country?: string
  },
  occupation?: string ,
  nationality?: string,
  country_of_residence: string | undefined

  // the last time this record was changed
  changed_on?: string,
  // the last time this record was updated
  updated_on?:string
}
