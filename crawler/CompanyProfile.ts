/**
 * CompanyProfileResource is what is returned from the api.
 */
export interface CompanyProfileResource {
  company_name: string;
  company_number: string;
  company_status: string;
  company_status_detail: string;
  date_of_creation: string;
  jurisdiction: string;
  sic_codes: string[];
  has_been_liquidated: boolean;
  has_super_secure_pscs?: boolean;
  type: string;
  has_charges: boolean;
  has_insolvency_history: boolean;
  registered_office_address: RegisteredOfficeAddressResource;
  accounts: AccountsResource;
  confirmation_statement?: ConfirmationStatementResource;
  links: LinksResource;
  annual_return: {last_made_up_to: string}
}

interface RegisteredOfficeAddressResource {
  address_line_1: string;
  address_line_2?: string;
  care_of?: string;
  country?: string;
  locality: string;
  po_box?: string;
  postal_code: string;
  premises?: string;
  region?: string;
}

interface AccountsResource {
  next_accounts?: NextAccountsResource;
  next_due?: string;
  overdue?: boolean;
}

interface NextAccountsResource {
  period_end_on: string;
  period_start_on: string;
}

interface ConfirmationStatementResource {
  last_made_up_to?: string;
  next_due: string;
  next_made_up_to: string;
  overdue: boolean;
}

interface LinksResource {
  filing_history?: string;
  self?: string
  overseas?: string
}


// --- auto generated with JsonToTs ---

export interface CompanyProfile {
  annual_return?: Annualreturn;
  branch_company_details?: Branchcompanydetails;
  can_file: boolean;
  company_name: string;
  company_number: string;
  company_status: string;
  date_of_creation: string;
  etag: string;
  has_super_secure_pscs: boolean;
  links: Links;
  registered_office_address: Registeredofficeaddress;
  type: string;
  accounts?: Accounts;
  external_registration_number?: string;
  foreign_company_details?: Foreigncompanydetails;
  has_been_liquidated?: boolean;
  has_charges?: boolean;
  has_insolvency_history?: boolean;
  jurisdiction?: string;
  last_full_members_list_date?: string;
  registered_office_is_in_dispute?: boolean;
  sic_codes?: string[];
  undeliverable_registered_office_address?: boolean;
}
interface Foreigncompanydetails {
  business_activity: string;
  legal_form: string;
  registration_number: string;
  is_a_credit_financial_institution: boolean;
  accounting_requirement: Accountingrequirement;
  originating_registry: Originatingregistry;
  governed_by: string;
}
interface Originatingregistry {
  country: string;
  name: string;
}
interface Accountingrequirement {
  terms_of_account_publication: string;
  foreign_account_type: string;
}
interface Accounts {
  last_accounts: Lastaccounts;
  next_accounts: Nextaccounts;
  accounting_reference_date: Accountingreferencedate;
  overdue: boolean;
  next_made_up_to: string;
}
interface Accountingreferencedate {
  month: string;
  day: string;
}
interface Nextaccounts {
  period_end_on: string;
  overdue: boolean;
}
interface Lastaccounts {
  made_up_to: string;
  type: string;
  period_end_on: string;
}
interface Registeredofficeaddress {
  locality: string;
  address_line_1: string;
  postal_code: string;
  country?: string;
  address_line_2?: string;
}
interface Links {
  self: string;
  overseas?: string;
  filing_history: string;
  officers?: string;
  uk_establishments?: string;
}
interface Branchcompanydetails {
  business_activity: string;
  parent_company_number: string;
  parent_company_name: string;
}
interface Annualreturn {
  last_made_up_to: string;
}
