export interface PscBulkFile {
  company_number: string;
  data: Data;
}

interface Data {
  address: Address;
  ceased_on?: string;
  country_of_residence: string;
  date_of_birth: Dateofbirth;
  etag: string;
  kind: string;
  links: Links;
  name: string;
  name_elements: Nameelements;
  nationality: string;
  natures_of_control: string[];
  notified_on: string;
}

interface Nameelements {
  forename: string;
  middle_name?: string;
  surname: string;
  title?: string;
}

interface Links {
  self: string;
}

interface Dateofbirth {
  month: number;
  year: number;
}

interface Address {
  address_line_1: string;
  country?: string;
  locality: string;
  postal_code: string;
  premises?: string;
  address_line_2?: string;
  region?: string;
  po_box?: string;
}


export interface StoredPsc{
  pscId: string,
  pscKind: 'legal'|'individual'|'corporate'|'super-secure'|'statement'|'exemptions'|'summary'

  address?: {
    addressLine1?: string;
    country?: string;
    locality?: string;
    postalCode?: string;
    premises?: string;
    addressLine2?: string;
    region?: string;
    poBox?: string;
  };
  ceasedOn?: string;
  countryOfResidence?: string;
  dateOfBirth?: {
    month: number;
    year: number;
  };
  etag: string;
  kind: string;
  links: {
    self: string;
  };
  name?: string;
  nameElements?: {
    forename: string;
    middleName?: string;
    surname: string;
    title?: string;
  };
  nationality?: string;
  naturesOfControl?: string[];
  notifiedOn: string;
}
