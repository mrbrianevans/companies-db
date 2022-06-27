export interface PscBulk {
  company_number: string;
  data: Data;
}

interface Data {
  address?: Address;
  ceased_on?: string;
  country_of_residence?: string;
  date_of_birth?: Dateofbirth;
  etag: string;
  kind: string;
  links: Links;
  name?: string;
  name_elements?: Nameelements;
  nationality?: string;
  natures_of_control?: string[];
  notified_on: string;
  identification?: Identification;
  statement?: string;
  restrictions_notice_withdrawal_reason?: string;
}

interface Identification {
  legal_authority: string;
  legal_form: string;
  country_registered?: string;
  place_registered?: string;
  registration_number?: string;
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
  address_line_1?: string;
  country?: string;
  locality?: string;
  postal_code?: string;
  premises?: string;
  address_line_2?: string;
  region?: string;
  po_box?: string;
  care_of?: string;
}
