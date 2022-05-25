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
          type: 'string'
        }
      },
      required: ['company_number']
    },
    querystring: {
      type: 'object',
      properties: {},
      required: []
    },
    response: {
      '200': {
        type: 'object',
        properties: {
          accounts: {
            type: 'object',
            properties: {
              next_made_up_to: {
                type: 'string'
              },
              last_accounts: {
                type: 'object',
                properties: {
                  period_end_on: {
                    type: 'string'
                  },
                  period_start_on: {
                    type: 'string'
                  },
                  made_up_to: {
                    type: 'string'
                  },
                  type: {
                    type: 'string'
                  }
                }
              },
              overdue: {
                type: 'boolean'
              },
              next_accounts: {
                type: 'object',
                properties: {
                  due_on: {
                    type: 'string'
                  },
                  period_end_on: {
                    type: 'string'
                  },
                  period_start_on: {
                    type: 'string'
                  },
                  overdue: {
                    type: 'boolean'
                  }
                },
                required: ['period_end_on']
              },
              accounting_reference_date: {
                type: 'object',
                properties: {
                  day: {
                    type: 'string'
                  },
                  month: {
                    type: 'string'
                  }
                },
                required: ['day', 'month']
              },
              next_due: {
                type: 'string'
              }
            },
            required: ['last_accounts']
          },
          can_file: {
            type: 'boolean'
          },
          company_name: {
            type: 'string'
          },
          company_number: {
            type: 'string'
          },
          company_status: {
            type: 'string'
          },
          confirmation_statement: {
            type: 'object',
            properties: {
              next_made_up_to: {
                type: 'string'
              },
              last_made_up_to: {
                type: 'string'
              },
              overdue: {
                type: 'boolean'
              },
              next_due: {
                type: 'string'
              }
            },
            required: ['next_made_up_to', 'next_due']
          },
          date_of_creation: {
            type: 'string'
          },
          etag: {
            type: 'string'
          },
          has_been_liquidated: {
            type: 'boolean'
          },
          has_charges: {
            type: 'boolean'
          },
          has_insolvency_history: {
            type: 'boolean'
          },
          has_super_secure_pscs: {
            type: 'boolean'
          },
          jurisdiction: {
            type: 'string'
          },
          last_full_members_list_date: {
            type: 'string'
          },
          links: {
            type: 'object',
            properties: {
              self: {
                type: 'string'
              },
              filing_history: {
                type: 'string'
              },
              officers: {
                type: 'string'
              },
              charges: {
                type: 'string'
              },
              persons_with_significant_control: {
                type: 'string'
              },
              registers: {
                type: 'string'
              },
              persons_with_significant_control_statements: {
                type: 'string'
              },
              insolvency: {
                type: 'string'
              },
              exemptions: {
                type: 'string'
              },
              uk_establishments: {
                type: 'string'
              },
              overseas: {
                type: 'string'
              }
            },
            required: ['self']
          },
          previous_company_names: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string'
                },
                ceased_on: {
                  type: 'string'
                },
                effective_from: {
                  type: 'string'
                }
              },
              required: ['name', 'ceased_on', 'effective_from']
            }
          },
          registered_office_address: {
            type: 'object',
            properties: {
              country: {
                type: 'string'
              },
              locality: {
                type: 'string'
              },
              address_line_1: {
                type: 'string'
              },
              postal_code: {
                type: 'string'
              },
              address_line_2: {
                type: 'string'
              },
              region: {
                type: 'string'
              },
              care_of: {
                type: 'string'
              },
              po_box: {
                type: 'string'
              }
            }
          },
          registered_office_is_in_dispute: {
            type: 'boolean'
          },
          sic_codes: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          status: {
            type: 'string'
          },
          type: {
            type: 'string'
          },
          undeliverable_registered_office_address: {
            type: 'boolean'
          },
          date_of_cessation: {
            type: 'string'
          },
          company_status_detail: {
            type: 'string'
          },
          annual_return: {
            type: 'object',
            properties: {
              last_made_up_to: {
                type: 'string'
              },
              overdue: {
                type: 'boolean'
              },
              next_made_up_to: {
                type: 'string'
              },
              next_due: {
                type: 'string'
              }
            }
          },
          is_community_interest_company: {
            type: 'boolean'
          },
          subtype: {
            type: 'string'
          },
          foreign_company_details: {
            type: 'object',
            properties: {
              registration_number: {
                type: 'string'
              },
              governed_by: {
                type: 'string'
              },
              originating_registry: {
                type: 'object',
                properties: {
                  country: {
                    type: 'string'
                  },
                  name: {
                    type: 'string'
                  }
                },
                required: ['country']
              },
              business_activity: {
                type: 'string'
              },
              accounting_requirement: {
                type: 'object',
                properties: {
                  terms_of_account_publication: {
                    type: 'string'
                  },
                  foreign_account_type: {
                    type: 'string'
                  }
                },
                required: [
                  'terms_of_account_publication',
                  'foreign_account_type'
                ]
              },
              is_a_credit_financial_institution: {
                type: 'boolean'
              },
              legal_form: {
                type: 'string'
              },
              accounts: {
                type: 'object',
                properties: {
                  account_period_from: {
                    type: 'object',
                    properties: {
                      month: {
                        type: 'string'
                      },
                      day: {
                        type: 'string'
                      }
                    },
                    required: ['month', 'day']
                  },
                  account_period_to: {
                    type: 'object',
                    properties: {
                      month: {
                        type: 'string'
                      },
                      day: {
                        type: 'string'
                      }
                    },
                    required: ['month', 'day']
                  },
                  must_file_within: {
                    type: 'object',
                    properties: {
                      months: {
                        type: 'string'
                      }
                    },
                    required: ['months']
                  }
                },
                required: [
                  'account_period_from',
                  'account_period_to',
                  'must_file_within'
                ]
              }
            },
            required: [
              'registration_number',
              'originating_registry',
              'accounting_requirement',
              'is_a_credit_financial_institution'
            ]
          },
          external_registration_number: {
            type: 'string'
          },
          branch_company_details: {
            type: 'object',
            properties: {
              parent_company_name: {
                type: 'string'
              },
              parent_company_number: {
                type: 'string'
              },
              business_activity: {
                type: 'string'
              }
            },
            required: ['parent_company_name', 'parent_company_number']
          },
          partial_data_available: {
            type: 'string'
          }
        },
        required: [
          'can_file',
          'company_name',
          'company_number',
          'company_status',
          'etag',
          'links',
          'registered_office_address',
          'type'
        ],
        additionalProperties: false,
        title: 'getCompanyProfile',
        example: {
          accounts: {
            next_made_up_to: '2022-07-31',
            last_accounts: {
              period_end_on: '2021-07-31',
              period_start_on: '2020-08-01',
              made_up_to: '2021-07-31',
              type: 'full'
            },
            overdue: false,
            next_accounts: {
              due_on: '2023-04-30',
              period_end_on: '2022-07-31',
              period_start_on: '2021-08-01',
              overdue: false
            },
            accounting_reference_date: {
              day: '31',
              month: '07'
            },
            next_due: '2023-04-30'
          },
          can_file: true,
          company_name: 'BLOOMSBURY INSTITUTE LIMITED',
          company_number: '04511191',
          company_status: 'active',
          confirmation_statement: {
            next_made_up_to: '2022-08-14',
            last_made_up_to: '2021-08-14',
            overdue: false,
            next_due: '2022-08-28'
          },
          date_of_creation: '2002-08-14',
          etag: '8fe333b206db92542fcbccea6a55aa173f06c0e7',
          has_been_liquidated: false,
          has_charges: true,
          has_insolvency_history: false,
          has_super_secure_pscs: false,
          jurisdiction: 'england-wales',
          last_full_members_list_date: '2015-08-14',
          links: {
            self: '/company/04511191',
            filing_history: '/company/04511191/filing-history',
            officers: '/company/04511191/officers',
            charges: '/company/04511191/charges',
            persons_with_significant_control:
              '/company/04511191/persons-with-significant-control'
          },
          previous_company_names: [
            {
              name: 'LONDON SCHOOL OF BUSINESS AND MANAGEMENT LIMITED',
              ceased_on: '2018-09-27',
              effective_from: '2002-08-29'
            },
            {
              name: 'SCHOOL OF MANAGEMENT STUDIES LONDON LIMITED',
              effective_from: '2002-08-14',
              ceased_on: '2002-08-29'
            }
          ],
          registered_office_address: {
            country: 'England',
            locality: 'London',
            address_line_1: '7 Bedford Square',
            postal_code: 'WC1B 3RA'
          },
          registered_office_is_in_dispute: false,
          sic_codes: ['85421', '85422'],
          status: 'active',
          type: 'ltd',
          undeliverable_registered_office_address: false
        }
      }
    }
  }
} as const

export type GetCompanyProfileResponse = FromSchema<
  typeof GetCompanyProfileSchema['schema']['response']['200']
>
//export type GetCompanyProfileResponse = any // temporary until schemas can be fixed
