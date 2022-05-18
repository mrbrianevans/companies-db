import { FromSchema } from 'json-schema-to-ts'

export interface GetCompanyProfileParams {
  /** The company number of the basic information to return. */
  company_number: string
}

export interface GetCompanyProfileQueryString {}

export const GetCompanyProfileSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        company_number: {
          type: 'string',
        },
      },
      required: ['company_number'],
    },
    querystring: {
      type: 'object',
      properties: {},
      required: [],
    },
    response: {
      '200': {
        title: 'companyProfile',
        required: [
          'company_name',
          'jurisdiction',
          'company_number',
          'company_status',
          'type',
          'date_of_creation',
          'can_file',
          'links',
        ],
        properties: {
          accounts: {
            description: 'Company accounts information.',
            items: {
              title: 'accountsInformation',
              type: 'object',
              required: [
                'overdue',
                'next_made_up_to',
                'accounting_reference_date',
              ],
              properties: {
                accounting_reference_date: {
                  description:
                    'The Accounting Reference Date (ARD) of the company.',
                  type: 'array',
                  items: {
                    title: 'accountingReferenceDate',
                    type: 'object',
                    required: ['day', 'month'],
                    properties: {
                      day: {
                        type: 'integer',
                        description: 'The Accounting Reference Date (ARD) day.',
                      },
                      month: {
                        type: 'integer',
                        description:
                          'The Accounting Reference Date (ARD) month.',
                      },
                    },
                  },
                },
                last_accounts: {
                  description: 'The last company accounts filed.',
                  type: 'array',
                  items: {
                    title: 'lastAccounts',
                    properties: {
                      made_up_to: {
                        type: 'string',
                        format: 'date',
                        description:
                          'The date the last company accounts were made up to.',
                      },
                      type: {
                        description:
                          'The type of the last company accounts filed.  \n For enumeration descriptions see `account_type` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/constants.yml).    ',
                        enum: [
                          'null',
                          'full',
                          'small',
                          'medium',
                          'group',
                          'dormant',
                          'interim',
                          'initial',
                          'total-exemption-full',
                          'total-exemption-small',
                          'partial-exemption',
                          'audit-exemption-subsidiary',
                          'filing-exemption-subsidiary',
                          'micro-entity',
                          'no-accounts-type-available',
                          'audited-abridged',
                          'unaudited-abridged',
                        ],
                      },
                    },
                    type: 'object',
                    required: ['type', 'made_up_to'],
                  },
                },
                next_due: {
                  description: 'The date the next company accounts are due.',
                  type: 'string',
                  format: 'date',
                },
                next_made_up_to: {
                  description:
                    'The date the next company accounts should be made up to.',
                  type: 'string',
                  format: 'date',
                },
                overdue: {
                  type: 'boolean',
                  description:
                    'Flag indicating if the company accounts are overdue.',
                },
              },
            },
            type: 'array',
          },
          annual_return: {
            description:
              'Annual return information. This member is only returned if a confirmation statement has not be filed.',
            items: {
              title: 'annualReturnInformation',
              type: 'object',
              properties: {
                last_made_up_to: {
                  description:
                    'The date the last annual return was made up to.',
                  type: 'string',
                  format: 'date',
                },
                next_due: {
                  description:
                    'The date the next annual return is due. This member will only be returned if a confirmation statement has not been filed and the date is before 28th July 2016, otherwise refer to `confirmation_statement.next_due`',
                  type: 'string',
                  format: 'date',
                },
                next_made_up_to: {
                  description:
                    'The date the next annual return should be made up to. This member will only be returned if a confirmation statement has not been filed and the date is before 30th July 2016, otherwise refer to `confirmation_statement.next_made_up_to`',
                  type: 'string',
                  format: 'date',
                },
                overdue: {
                  description:
                    'Flag indicating if the annual return is overdue.',
                  type: 'boolean',
                },
              },
            },
            type: 'array',
          },
          can_file: {
            description: 'Flag indicating whether this company can file.',
            type: 'boolean',
          },
          confirmation_statement: {
            description:
              'Confirmation statement information (N.B. refers to the Annual Update where type is registered-overseas-entity)',
            items: {
              title: 'confirmationOfStatementInformation',
              required: ['next_made_up_to', 'next_due'],
              properties: {
                last_made_up_to: {
                  description:
                    'The date to which the company last made a confirmation statement.',
                  type: 'string',
                  format: 'date',
                },
                next_due: {
                  description:
                    'The date by which the next confimation statement must be received.',
                  type: 'string',
                  format: 'date',
                },
                next_made_up_to: {
                  description:
                    'The date to which the company must next make a confirmation statement.',
                  type: 'string',
                  format: 'date',
                },
                overdue: {
                  description:
                    'Flag indicating if the confirmation statement is overdue',
                  type: 'boolean',
                },
              },
              type: 'object',
            },
            type: 'array',
          },
          company_name: {
            description: 'The name of the company.',
            type: 'string',
          },
          jurisdiction: {
            description:
              'The jurisdiction specifies the political body responsible for the company.',
            type: 'string',
            enum: [
              'england-wales',
              'wales',
              'scotland',
              'northern-ireland',
              'european-union',
              'united-kingdom',
              'england',
              'noneu',
            ],
          },
          company_number: {
            description: 'The number of the company.',
            type: 'string',
          },
          date_of_creation: {
            description: 'The date when the company was created.',
            type: 'string',
            format: 'date',
          },
          date_of_cessation: {
            description:
              'The date which the company was converted/closed, dissolved or removed. Please refer to company status to determine which.',
            type: 'string',
            format: 'date',
          },
          etag: {
            description: 'The ETag of the resource.',
            type: 'string',
          },
          has_been_liquidated: {
            description:
              'The flag indicating if the company has been liquidated in the past.',
            type: 'boolean',
          },
          has_charges: {
            description: 'The flag indicating if the company has any charges.',
            type: 'boolean',
          },
          is_community_interest_company: {
            description:
              'The flag indicating if the company is a Community Interest Company.',
            type: 'boolean',
          },
          foreign_company_details: {
            description: 'Foreign company details.',
            items: {
              title: 'foreignCompanyDetails',
              properties: {
                originating_registry: {
                  description: 'Company origin informations',
                  type: 'array',
                  items: {
                    title: 'originatingRegistry',
                    properties: {
                      country: {
                        description:
                          'Country in which company was incorporated.',
                        type: 'string',
                      },
                      name: {
                        description:
                          'Identity of register in country of incorporation.',
                        type: 'string',
                      },
                    },
                    type: 'object',
                  },
                },
                registration_number: {
                  description:
                    'Registration number in company of incorporation.',
                  type: 'string',
                },
                governed_by: {
                  description:
                    'Law governing the company in country of incorporation.',
                  type: 'string',
                },
                company_type: {
                  description:
                    'Legal form of the company in the country of incorporation.',
                  type: 'string',
                },
                is_a_credit_finance_institution: {
                  description: 'Is it a financial or credit institution.',
                  type: 'boolean',
                },
                accounts: {
                  description: 'Foreign company account information.',
                  items: {
                    title: 'accountInformation',
                    properties: {
                      'account_period_from:': {
                        description:
                          'Date account period starts under parent law.',
                        items: {
                          title: 'accountPeriodFrom',
                          properties: {
                            day: {
                              description:
                                'Day on which accounting period starts under parent law.',
                              type: 'integer',
                            },
                            month: {
                              description:
                                'Month in which accounting period starts under parent law.',
                              type: 'integer',
                            },
                          },
                          type: 'object',
                        },
                        type: 'array',
                      },
                      account_period_to: {
                        description:
                          'Date account period ends under parent law.',
                        items: {
                          title: 'accountPeriodTo',
                          properties: {
                            day: {
                              description:
                                'Day on which accounting period ends under parent law.',
                              type: 'integer',
                            },
                            month: {
                              description:
                                'Month in which accounting period ends under parent law.',
                              type: 'integer',
                            },
                          },
                          type: 'object',
                        },
                        type: 'array',
                      },
                      must_file_within: {
                        description:
                          'Time allowed from period end for disclosure of accounts under parent law.',
                        items: {
                          title: 'fileWithin',
                          properties: {
                            months: {
                              description:
                                'Number of months within which to file.',
                              type: 'integer',
                            },
                          },
                          type: 'object',
                        },
                        type: 'array',
                      },
                    },
                    type: 'object',
                  },
                  type: 'array',
                },
                business_activity: {
                  description: 'Type of business undertaken by the company.',
                  type: 'string',
                },
                accounting_requirement: {
                  description: 'Accounts requirement.',
                  items: {
                    title: 'accountsRequired',
                    properties: {
                      foreign_account_type: {
                        description:
                          'Type of accounting requirement that applies.  \n For enumeration descriptions see `foreign_account_type` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/constants.yml).  ',
                        enum: [
                          'accounting-requirements-of-originating-country-apply',
                          'accounting-requirements-of-originating-country-do-not-apply',
                        ],
                        type: 'string',
                      },
                      terms_of_account_publication: {
                        description:
                          'Describes how the publication date is derived.  \n For enumeration descriptions see `terms_of_account_publication` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/constants.yml).  ',
                        enum: [
                          'accounts-publication-date-supplied-by-company',
                          'accounting-publication-date-does-not-need-to-be-supplied-by-company',
                          'accounting-reference-date-allocated-by-companies-house',
                        ],
                        type: 'string',
                      },
                    },
                    type: 'object',
                  },
                  type: 'array',
                },
              },
              type: 'object',
            },
            type: 'array',
          },
          last_full_members_list_date: {
            description: 'The date of last full members list update.',
            type: 'string',
            format: 'date',
          },
          registered_office_address: {
            description: "The address of the company's registered office.",
            items: {
              title: 'registeredOfficeAddress',
              properties: {
                care_of: {
                  description: 'The care of name.',
                  type: 'string',
                },
                address_line_1: {
                  description: 'The first line of the address.',
                  type: 'string',
                },
                address_line_2: {
                  description: 'The second line of the address.',
                  type: 'string',
                },
                country: {
                  description: 'The country.',
                  enum: [
                    'Wales',
                    'England',
                    'Scotland',
                    'Great Britain',
                    'Not specified',
                    'United Kingdom',
                    'Northern Ireland',
                  ],
                  type: 'string',
                },
                locality: {
                  description: 'The locality e.g London.',
                  type: 'string',
                },
                po_box: {
                  description: 'The post-office box number.',
                  type: 'string',
                },
                postal_code: {
                  description: 'The postal code e.g CF14 3UZ.',
                  type: 'string',
                },
                premises: {
                  description: 'The property name or number.',
                  type: 'string',
                },
                region: {
                  description: 'The region e.g Surrey.',
                  type: 'string',
                },
              },
              type: 'object',
            },
            type: 'array',
          },
          service_address: {
            description:
              'The correspondence address of a Registered overseas entity',
            items: {
              title: 'serviceAddress',
              properties: {
                care_of: {
                  description: 'The care of name.',
                  type: 'string',
                },
                address_line_1: {
                  description: 'The first line of the address.',
                  type: 'string',
                },
                address_line_2: {
                  description: 'The second line of the address.',
                  type: 'string',
                },
                country: {
                  description: 'The country e.g. United Kingdom.',
                  type: 'string',
                },
                locality: {
                  description: 'The locality e.g London.',
                  type: 'string',
                },
                po_box: {
                  description: 'The post-office box number.',
                  type: 'string',
                },
                postal_code: {
                  description: 'The postal code e.g CF14 3UZ.',
                  type: 'string',
                },
                region: {
                  description: 'The region e.g Surrey.',
                  type: 'string',
                },
              },
              type: 'object',
            },
            type: 'array',
          },
          sic_codes: {
            description: 'SIC codes for this company.',
            type: 'array',
            items: {
              type: 'string',
            },
          },
          previous_company_names: {
            description: 'The previous names of this company.',
            items: {
              title: 'previousCompanyNames',
              properties: {
                name: {
                  description: 'The previous company name',
                  type: 'string',
                },
                effective_from: {
                  description:
                    'The date from which the company name was effective.',
                  type: 'string',
                  format: 'date',
                },
                ceased_on: {
                  description: 'The date on which the company name ceased.',
                  type: 'string',
                  format: 'date',
                },
              },
              required: ['name', 'effective_from', 'ceased_on'],
              type: 'object',
            },
            type: 'array',
          },
          company_status: {
            description:
              'The status of the company.  \n For enumeration descriptions see `company_status` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)  ',
            type: 'string',
            enum: [
              'active',
              'dissolved',
              'liquidation',
              'receivership',
              'administration',
              'voluntary-arrangement',
              'converted-closed',
              'insolvency-proceedings',
              'registered',
              'removed',
              'closed',
              'open',
            ],
          },
          company_status_detail: {
            description:
              'Extra details about the status of the company.  \n For enumeration descriptions see `company_status_detail` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/constants.yml).  ',
            enum: [
              'transferred-from-uk',
              'active-proposal-to-strike-off',
              'petition-to-restore-dissolved',
              'transformed-to-se',
              'converted-to-plc',
            ],
            type: 'string',
          },
          type: {
            description:
              'The type of the company.  \n For enumeration descriptions see `company_type` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)    ',
            enum: [
              'private-unlimited',
              'ltd',
              'plc',
              'old-public-company',
              'private-limited-guarant-nsc-limited-exemption',
              'limited-partnership',
              'private-limited-guarant-nsc',
              'converted-or-closed',
              'private-unlimited-nsc',
              'private-limited-shares-section-30-exemption',
              'protected-cell-company',
              'assurance-company',
              'oversea-company',
              'eeig',
              'icvc-securities',
              'icvc-warrant',
              'icvc-umbrella',
              'registered-society-non-jurisdictional',
              'industrial-and-provident-society',
              'northern-ireland',
              'northern-ireland-other',
              'royal-charter',
              'investment-company-with-variable-capital',
              'unregistered-company',
              'llp',
              'other',
              'european-public-limited-liability-company-se',
              'uk-establishment',
              'scottish-partnership',
              'charitable-incorporated-organisation',
              'scottish-charitable-incorporated-organisation',
              'further-education-or-sixth-form-college-corporation',
              'registered-overseas-entity',
            ],
            type: 'string',
          },
          has_insolvency_history: {
            description:
              'The flag indicating if the company has insolvency history.',
            type: 'boolean',
          },
          undeliverable_registered_office_address: {
            description:
              'Flag indicating whether post can be delivered to the registered office.',
            type: 'boolean',
          },
          registered_office_is_in_dispute: {
            description:
              'Flag indicating registered office address as been replaced.',
            type: 'boolean',
          },
          branch_company_details: {
            description: 'UK branch of a foreign company.',
            items: {
              title: 'branchCompanyDetails',
              properties: {
                business_activity: {
                  description:
                    'Type of business undertaken by the UK establishment.',
                  type: 'string',
                },
                parent_company_number: {
                  description: 'Parent company number.',
                  type: 'string',
                },
                parent_company_name: {
                  description: 'Parent company name.',
                  type: 'string',
                },
              },
              type: 'object',
            },
            type: 'array',
          },
          links: {
            description:
              'A set of URLs related to the resource, including self.',
            items: {
              title: 'linksType',
              required: ['self'],
              properties: {
                self: {
                  description: 'The URL of the resource.',
                  type: 'string',
                },
                persons_with_significant_control: {
                  description:
                    'The URL of the persons with significant control list resource.',
                  type: 'string',
                },
                persons_with_significant_control_statements: {
                  description:
                    'The URL of the persons with significant control statements list resource.',
                  type: 'string',
                },
                registers: {
                  description:
                    'The URL of the registers resource for this company',
                  type: 'string',
                },
              },
              type: 'object',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
    },
  },
} as const

// export type GetCompanyProfileResponse = FromSchema<typeof GetCompanyProfileSchema['schema']['response']['200']>
export type GetCompanyProfileResponse = any // temporary until schemas can be fixed
