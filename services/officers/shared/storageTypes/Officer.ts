type Date = { day?: number | undefined, month?: number | undefined, year?: number | undefined }

export interface OfficerStorage {
  // these are not (directly) sent in API responses
  personNumber: number,
  personNumberPrefix: string,
  companyNumber: string,
  appointmentDateOrigin: string,
  corporateIndicator: boolean,

  // these require some modification before they can sent in an API response
  appointment_date: Date,
  resignation_date?: Date,
  name_elements: {
    title?: string , forenames?: string , surname: string , honours?: string
  },

  // these are in the right format for API responses, no modification needed
  officer_role: string,
  date_of_birth?: Date,
  address: {
    care_of?: string , po_box?: string , postal_code?: string , address_line_1?: string ,
    address_line_2?: string , locality?: string , region?: string , country?: string
  },
  occupation?: string ,
  nationality?: string,
  country_of_residence: string | undefined
}
