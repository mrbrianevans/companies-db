type Date = { day?: number | undefined, month?: number | undefined, year?: number | undefined }

export interface OfficerStorage {
  // these are not (directly) sent in API responses
  personNumber: number,
  personNumberPrefix: string,
  company_number: string,
  appointmentDateOrigin: string,
  // these require some modification before they can sent in an API response
  name_elements: {
    title?: string , forenames?: string , surname: string , honours?: string
  },

  // these are in the right format for API responses, no modification needed
  appointed_on: string,
  resigned_on?: string,
  is_corporate_officer: boolean,
  officer_role: string,
  date_of_birth?: { month: number , year: number  },
  address: {
    care_of?: string , po_box?: string , postal_code?: string , address_line_1?: string ,
    address_line_2?: string , locality?: string , region?: string , country?: string
  },
  occupation?: string ,
  nationality?: string,
  country_of_residence: string | undefined
}
