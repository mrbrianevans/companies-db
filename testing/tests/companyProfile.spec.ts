import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('company-profile-service', function () {
  this.timeout(50000)
  // tests for each path
  it('getCompanyProfile: /company/{company_number}', async function () {
    const schema = {
      type: 'object',
      properties: {
        accounts: {
          type: 'object',
          properties: {
            accounting_reference_date: {
              type: 'object',
              properties: {
                month: { type: 'string' },
                day: { type: 'string' }
              },
              required: ['month', 'day']
            },
            overdue: { type: 'boolean' },
            last_accounts: {
              type: 'object',
              properties: {
                period_start_on: { type: 'string' },
                type: { type: 'string' },
                period_end_on: { type: 'string' },
                made_up_to: { type: 'string' }
              }
            },
            next_due: { type: 'string' },
            next_made_up_to: { type: 'string' },
            next_accounts: {
              type: 'object',
              properties: {
                overdue: { type: 'boolean' },
                period_start_on: { type: 'string' },
                due_on: { type: 'string' },
                period_end_on: { type: 'string' }
              },
              required: ['period_end_on']
            }
          },
          required: ['last_accounts']
        },
        can_file: { type: 'boolean' },
        company_name: { type: 'string' },
        company_number: { type: 'string' },
        company_status: { type: 'string' },
        confirmation_statement: {
          type: 'object',
          properties: {
            overdue: { type: 'boolean' },
            last_made_up_to: { type: 'string' },
            next_due: { type: 'string' },
            next_made_up_to: { type: 'string' }
          },
          required: ['next_due', 'next_made_up_to']
        },
        date_of_creation: { type: 'string' },
        etag: { type: 'string' },
        has_charges: { type: 'boolean' },
        has_insolvency_history: { type: 'boolean' },
        has_super_secure_pscs: { type: 'boolean' },
        jurisdiction: { type: 'string' },
        links: {
          type: 'object',
          properties: {
            filing_history: { type: 'string' },
            persons_with_significant_control: { type: 'string' },
            self: { type: 'string' },
            officers: { type: 'string' },
            charges: { type: 'string' },
            persons_with_significant_control_statements: { type: 'string' },
            insolvency: { type: 'string' },
            registers: { type: 'string' },
            exemptions: { type: 'string' },
            uk_establishments: { type: 'string' },
            overseas: { type: 'string' }
          },
          required: ['self']
        },
        registered_office_address: {
          type: 'object',
          properties: {
            locality: { type: 'string' },
            country: { type: 'string' },
            address_line_1: { type: 'string' },
            postal_code: { type: 'string' },
            address_line_2: { type: 'string' },
            region: { type: 'string' },
            care_of: { type: 'string' },
            po_box: { type: 'string' }
          }
        },
        registered_office_is_in_dispute: { type: 'boolean' },
        sic_codes: { type: 'array', items: { type: 'string' } },
        type: { type: 'string' },
        undeliverable_registered_office_address: { type: 'boolean' },
        last_full_members_list_date: { type: 'string' },
        has_been_liquidated: { type: 'boolean' },
        previous_company_names: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              ceased_on: { type: 'string' },
              name: { type: 'string' },
              effective_from: { type: 'string' }
            },
            required: ['ceased_on', 'name', 'effective_from']
          }
        },
        status: { type: 'string' },
        date_of_cessation: { type: 'string' },
        company_status_detail: { type: 'string' },
        annual_return: {
          type: 'object',
          properties: {
            last_made_up_to: { type: 'string' },
            overdue: { type: 'boolean' },
            next_due: { type: 'string' },
            next_made_up_to: { type: 'string' }
          }
        },
        is_community_interest_company: { type: 'boolean' },
        subtype: { type: 'string' },
        external_registration_number: { type: 'string' },
        foreign_company_details: {
          type: 'object',
          properties: {
            originating_registry: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                country: { type: 'string' }
              },
              required: ['country']
            },
            registration_number: { type: 'string' },
            is_a_credit_financial_institution: { type: 'boolean' },
            accounting_requirement: {
              type: 'object',
              properties: {
                terms_of_account_publication: { type: 'string' },
                foreign_account_type: { type: 'string' }
              },
              required: ['terms_of_account_publication', 'foreign_account_type']
            },
            governed_by: { type: 'string' },
            business_activity: { type: 'string' },
            legal_form: { type: 'string' },
            accounts: {
              type: 'object',
              properties: {
                account_period_from: {
                  type: 'object',
                  properties: {
                    month: { type: 'string' },
                    day: { type: 'string' }
                  },
                  required: ['month', 'day']
                },
                account_period_to: {
                  type: 'object',
                  properties: {
                    day: { type: 'string' },
                    month: { type: 'string' }
                  },
                  required: ['day', 'month']
                },
                must_file_within: {
                  type: 'object',
                  properties: { months: { type: 'string' } },
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
            'originating_registry',
            'registration_number',
            'is_a_credit_financial_institution',
            'accounting_requirement'
          ]
        },
        date_of_dissolution: { type: 'string' },
        partial_data_available: { type: 'string' },
        branch_company_details: {
          type: 'object',
          properties: {
            parent_company_name: { type: 'string' },
            parent_company_number: { type: 'string' },
            business_activity: { type: 'string' }
          },
          required: [
            'parent_company_name',
            'parent_company_number',
            'business_activity'
          ]
        }
      },
      required: [
        'can_file',
        'company_name',
        'company_number',
        'date_of_creation',
        'etag',
        'links',
        'registered_office_address',
        'type'
      ],
      additionalProperties: false,
      title: 'getCompanyProfile',
      example: {
        accounts: {
          accounting_reference_date: { month: '03', day: '31' },
          overdue: false,
          last_accounts: {
            period_start_on: '2021-03-16',
            type: 'micro-entity',
            period_end_on: '2022-03-31',
            made_up_to: '2022-03-31'
          },
          next_due: '2023-12-31',
          next_made_up_to: '2023-03-31',
          next_accounts: {
            overdue: false,
            period_start_on: '2022-04-01',
            due_on: '2023-12-31',
            period_end_on: '2023-03-31'
          }
        },
        can_file: true,
        company_name: 'MAN CAVE BARBERS BOLTON LIMITED',
        company_number: '13271177',
        company_status: 'active',
        confirmation_statement: {
          overdue: false,
          last_made_up_to: '2022-03-15',
          next_due: '2023-03-29',
          next_made_up_to: '2023-03-15'
        },
        date_of_creation: '2021-03-16',
        etag: '24b40f295e851167ebeab418a7bb6522b364fbe9',
        has_charges: false,
        has_insolvency_history: false,
        has_super_secure_pscs: false,
        jurisdiction: 'england-wales',
        links: {
          filing_history: '/company/13271177/filing-history',
          persons_with_significant_control:
            '/company/13271177/persons-with-significant-control',
          self: '/company/13271177',
          officers: '/company/13271177/officers'
        },
        registered_office_address: {
          locality: 'Bolton',
          country: 'England',
          address_line_1: '430 Chorley Old Road',
          postal_code: 'BL1 6AG'
        },
        registered_office_is_in_dispute: false,
        sic_codes: ['96020'],
        type: 'ltd',
        undeliverable_registered_office_address: false
      }
    }
    await testRequests(
      testUrls.getCompanyProfile.map((path) => ({ path })),
      schema
    )
  })

  it('getRegisteredOfficeAddress: /company/{company_number}/registered-office-address', async function () {
    const schema = {
      type: 'object',
      properties: {
        address_line_1: { type: 'string' },
        address_line_2: { type: 'string' },
        country: { type: 'string' },
        etag: { type: 'string' },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        },
        locality: { type: 'string' },
        postal_code: { type: 'string' },
        region: { type: 'string' },
        po_box: { type: 'string' },
        premises: {
          type: 'string',
          description: 'The property name or number.'
        }
      },
      additionalProperties: false,
      title: 'getRegisteredOfficeAddress',
      example: {
        address_line_1: '8th Floor (West Wing)',
        address_line_2: '54 Hagley Road',
        country: 'United Kingdom',
        etag: 'a914a2ce96e25f11b96d05632be6426e1578ec64',
        kind: 'registered-office-address',
        links: { self: '/company/13612247/registered-office-address' },
        locality: 'Edgbaston',
        postal_code: 'B16 8PE',
        region: 'Birmingham'
      }
    }
    await testRequests(
      testUrls.getRegisteredOfficeAddress.map((path) => ({ path })),
      schema
    )
  })
})
