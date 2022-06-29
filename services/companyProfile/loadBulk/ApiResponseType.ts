export interface GetCompanyProfile {
  accounts: Accounts;
  can_file: boolean;
  company_name: string;
  company_number: string;
  company_status: string;
  confirmation_statement?: Confirmationstatement;
  date_of_creation: string;
  etag: string;
  has_been_liquidated?: boolean;
  has_charges?: boolean;
  has_insolvency_history?: boolean;
  has_super_secure_pscs?: boolean;
  jurisdiction: string;
  last_full_members_list_date?: string;
  links: Links;
  previous_company_names?: Previouscompanyname[];
  registered_office_address: Registeredofficeaddress;
  registered_office_is_in_dispute?: boolean;
  sic_codes?: string[];
  status?: string;
  type: string;
  undeliverable_registered_office_address: boolean;
  date_of_cessation?: string;
  company_status_detail?: string;
  annual_return?: Annualreturn;
  is_community_interest_company?: boolean;
  subtype?: string;
}

interface Annualreturn {
  last_made_up_to: string;
  overdue?: boolean;
}

interface Registeredofficeaddress {
  region?: string;
  postal_code: string;
  locality?: string;
  address_line_1: string;
  country?: string;
  address_line_2?: string;
  po_box?: string;
  care_of?: string;
}

interface Previouscompanyname {
  ceased_on: string;
  effective_from: string;
  name: string;
}

interface Links {
  self: string;
  filing_history: string;
  officers?: string;
  persons_with_significant_control?: string;
  persons_with_significant_control_statements?: string;
  charges?: string;
  registers?: string;
  insolvency?: string;
}

interface Confirmationstatement {
  last_made_up_to?: string;
  next_due: string;
  next_made_up_to: string;
  overdue: boolean;
}

interface Accounts {
  overdue?: boolean;
  accounting_reference_date?: Accountingreferencedate;
  next_accounts?: Nextaccounts;
  next_made_up_to?: string;
  next_due?: string;
  last_accounts: Lastaccounts;
}

interface Lastaccounts {
  period_start_on?: string;
  type?: string;
  period_end_on?: string;
  made_up_to?: string;
}

interface Nextaccounts {
  period_start_on: string;
  overdue?: boolean;
  period_end_on: string;
  due_on: string;
}

interface Accountingreferencedate {
  day: string;
  month: string;
}
