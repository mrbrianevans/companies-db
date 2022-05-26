import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('filing-history-service', function () {
  // tests for each path
  it('listFilingHistory: /company/{company_number}/filing-history', async function () {
    const schema = {
      type: 'object',
      properties: {
        filing_history_status: { type: 'string' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              action_date: { type: ['null', 'string'] },
              category: { type: 'string' },
              date: { type: 'string' },
              description: { type: 'string' },
              description_values: {
                type: 'object',
                properties: {
                  made_up_date: { type: 'string' },
                  notification_date: { type: ['null', 'string'] },
                  psc_name: { type: 'string' },
                  cessation_date: { type: 'string' },
                  withdrawal_date: { type: 'string' },
                  termination_date: { type: 'string' },
                  officer_name: { type: 'string' },
                  appointment_date: { type: 'string' },
                  date: { type: 'string' },
                  capital: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        currency: { type: 'string' },
                        figure: { type: 'string' },
                        date: { type: 'string' }
                      },
                      required: ['currency', 'figure']
                    }
                  },
                  description: { type: 'string' },
                  charge_creation_date: { type: 'string' },
                  charge_number: { type: 'string' },
                  change_date: { type: ['null', 'string'] },
                  new_address: { type: 'string' },
                  old_address: { type: 'string' },
                  new_date: { type: 'string' },
                  form_attached: { type: 'string' },
                  brought_down_date: { type: 'string' },
                  representative_details: { type: 'string' },
                  branch_number: { type: 'string' },
                  default_address: { type: 'string' },
                  form_type: { type: 'string' },
                  original_description: { type: 'string' },
                  company_number: { type: 'string' },
                  close_date: { type: 'string' },
                  change_type: { type: 'string' },
                  change_details: { type: 'string' },
                  change_address: { type: 'string' },
                  officer_address: { type: 'string' },
                  case_end_date: { type: 'string' },
                  alt_capital: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        date: { type: 'string' },
                        figure: { type: 'string' },
                        description: { type: 'string' },
                        currency: { type: 'string' }
                      },
                      required: ['date', 'figure', 'description', 'currency']
                    }
                  },
                  change_name: { type: 'string' }
                }
              },
              links: {
                type: 'object',
                properties: {
                  self: { type: 'string' },
                  document_metadata: { type: 'string' }
                }
              },
              type: { type: 'string' },
              pages: { type: 'integer' },
              barcode: { type: ['null', 'string'] },
              transaction_id: { type: 'string' },
              subcategory: {
                anyOf: [
                  { type: 'string' },
                  { type: 'array', items: { type: 'string' } }
                ]
              },
              paper_filed: { type: 'boolean' },
              resolutions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    category: { type: 'string' },
                    description: { type: 'string' },
                    subcategory: {
                      anyOf: [
                        { type: 'string' },
                        { type: 'array', items: { type: 'string' } }
                      ]
                    },
                    type: { type: 'string' },
                    description_values: {
                      type: 'object',
                      properties: {
                        res_type: { type: 'string' },
                        resolution_date: { type: 'string' },
                        case_start_date: { type: 'string' },
                        description: { type: 'string' }
                      }
                    },
                    original_description: { type: 'string' },
                    date: { type: 'integer' },
                    barcode: { type: 'string' },
                    parent_form_type: { type: 'string' }
                  },
                  required: ['category', 'description', 'type']
                }
              },
              associated_filings: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    action_date: { type: 'integer' },
                    category: { type: 'string' },
                    date: { type: 'string' },
                    description: { type: 'string' },
                    description_values: {
                      type: 'object',
                      properties: {
                        capital: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              currency: { type: 'string' },
                              figure: { type: 'string' }
                            },
                            required: ['currency', 'figure']
                          }
                        },
                        date: { type: 'string' },
                        capital_currency: { type: 'string' },
                        capital_figure: { type: 'string' },
                        description: { type: 'string' },
                        resolution_date: { type: 'string' }
                      }
                    },
                    type: { type: 'string' },
                    data: {
                      type: 'object',
                      properties: {
                        description_values: {
                          type: 'object',
                          properties: { description: { type: 'string' } },
                          required: ['description']
                        },
                        description: { type: 'string' }
                      }
                    },
                    subcategory: { type: 'string' },
                    'matched-default': { type: 'string' }
                  },
                  required: ['date', 'description', 'type']
                }
              },
              annotations: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    description_values: {
                      type: 'object',
                      properties: { description: { type: 'string' } },
                      required: ['description']
                    },
                    annotation: { type: 'string' },
                    type: { type: 'string' },
                    description: { type: 'string' },
                    date: { type: 'string' },
                    category: { type: 'string' }
                  },
                  required: [
                    'description_values',
                    'annotation',
                    'description',
                    'category'
                  ]
                }
              }
            },
            required: ['date', 'type', 'barcode', 'transaction_id']
          }
        },
        items_per_page: { type: 'integer' },
        start_index: { type: 'integer' },
        total_count: { type: 'integer' }
      },
      required: [
        'filing_history_status',
        'items',
        'items_per_page',
        'start_index',
        'total_count'
      ],
      additionalProperties: false,
      title: 'listFilingHistory',
      example: {
        filing_history_status: 'filing-history-available',
        items: [
          {
            action_date: '2021-09-16',
            category: 'confirmation-statement',
            date: '2021-12-23',
            description: 'confirmation-statement-with-no-updates',
            description_values: { made_up_date: '2021-09-16' },
            links: {
              self: '/company/11572607/filing-history/MzMyNDY3MzA1N2FkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/PbNQhghKOeeJ90uft8Qoigc1F84-KBBRIuiBZgtNB1A'
            },
            type: 'CS01',
            pages: 3,
            barcode: 'XAJY8ZY8',
            transaction_id: 'MzMyNDY3MzA1N2FkaXF6a2N4'
          },
          {
            action_date: '2021-09-23',
            category: 'persons-with-significant-control',
            date: '2021-12-23',
            description: 'notification-of-a-person-with-significant-control',
            description_values: {
              notification_date: '2021-09-23',
              psc_name: 'Resources Investments Offshore Limited'
            },
            links: {
              self: '/company/11572607/filing-history/MzMyNDY3MTY4NWFkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/upigbuEI5X5-pVh0NOyq7mBV7OmUdWgoZzte8PRH2rA'
            },
            subcategory: 'notifications',
            type: 'PSC02',
            pages: 2,
            barcode: 'XAJY8V4R',
            transaction_id: 'MzMyNDY3MTY4NWFkaXF6a2N4'
          },
          {
            action_date: '2021-09-23',
            category: 'persons-with-significant-control',
            date: '2021-12-23',
            description: 'cessation-of-a-person-with-significant-control',
            description_values: {
              cessation_date: '2021-09-23',
              psc_name: 'Hsbc Trustee (C.I.) Limited'
            },
            links: {
              self: '/company/11572607/filing-history/MzMyNDY3MTEwMmFkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/E1AMFUGIdMCO44A5VtVhkSljDNw8xTgUqN3d97MR3YQ'
            },
            subcategory: 'termination',
            type: 'PSC07',
            pages: 1,
            barcode: 'XAJY8SQZ',
            transaction_id: 'MzMyNDY3MTEwMmFkaXF6a2N4'
          },
          {
            category: 'gazette',
            date: '2021-12-14',
            description: 'gazette-filings-brought-up-to-date',
            links: {
              self: '/company/11572607/filing-history/MzMyMzQzMzk0MGFkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/C0a1mrDNE7-DTk4r0Az5ywquikjvT95jStPVrtnQVJw'
            },
            paper_filed: true,
            type: 'DISS40',
            pages: 1,
            barcode: null,
            transaction_id: 'MzMyMzQzMzk0MGFkaXF6a2N4'
          },
          {
            category: 'gazette',
            date: '2021-12-07',
            description: 'gazette-notice-compulsory',
            links: {
              self: '/company/11572607/filing-history/MzMyMTQzODE4NmFkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/YTtrX_ZGJIDwrTCPZ1m3aUwy_SgPNGcqccWL--Ugiyc'
            },
            paper_filed: true,
            type: 'GAZ1',
            pages: 1,
            barcode: null,
            transaction_id: 'MzMyMTQzODE4NmFkaXF6a2N4'
          },
          {
            action_date: '2020-09-30',
            category: 'accounts',
            date: '2021-06-29',
            description: 'accounts-with-accounts-type-dormant',
            description_values: { made_up_date: '2020-09-30' },
            links: {
              self: '/company/11572607/filing-history/MzMwNjA2NjU1MmFkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/Ef2H2iB98O5wG8PGqSFtDibm6TEoIIdrx3hoRbWCCcM'
            },
            type: 'AA',
            pages: 2,
            barcode: 'XA7NVRO9',
            transaction_id: 'MzMwNjA2NjU1MmFkaXF6a2N4'
          },
          {
            action_date: '2020-09-16',
            category: 'confirmation-statement',
            date: '2020-10-27',
            description: 'confirmation-statement-with-no-updates',
            description_values: { made_up_date: '2020-09-16' },
            links: {
              self: '/company/11572607/filing-history/MzI4MTcwOTQ2NGFkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/ybicgO59nxdRFLdJTUu_6ia42qjlqmaOyC_PCIB9BbM'
            },
            type: 'CS01',
            pages: 3,
            barcode: 'X9GJNOE8',
            transaction_id: 'MzI4MTcwOTQ2NGFkaXF6a2N4'
          },
          {
            action_date: '2019-09-30',
            category: 'accounts',
            date: '2020-06-15',
            description: 'accounts-with-accounts-type-dormant',
            description_values: { made_up_date: '2019-09-30' },
            links: {
              self: '/company/11572607/filing-history/MzI2NzM2NDUxN2FkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/vYBLlIyMhHQue9Vclkti4YiEdWVPndZqL9PRc1Tt53U'
            },
            type: 'AA',
            pages: 2,
            barcode: 'X979CNPS',
            transaction_id: 'MzI2NzM2NDUxN2FkaXF6a2N4'
          },
          {
            action_date: '2019-09-16',
            category: 'confirmation-statement',
            date: '2019-11-21',
            description: 'confirmation-statement-with-no-updates',
            description_values: { made_up_date: '2019-09-16' },
            links: {
              self: '/company/11572607/filing-history/MzI0OTkxNTc1NmFkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/ziRqIq7-V8ptNaT6cm8U4zPseGezmHDL4GeNRQHJ3bI'
            },
            type: 'CS01',
            pages: 3,
            barcode: 'X8IP3XFN',
            transaction_id: 'MzI0OTkxNTc1NmFkaXF6a2N4'
          },
          {
            action_date: '2019-09-17',
            category: 'persons-with-significant-control',
            date: '2019-11-21',
            description: 'notification-of-a-person-with-significant-control',
            description_values: {
              psc_name: 'Hsbc Trustee (C.I.) Limited',
              notification_date: '2019-09-17'
            },
            links: {
              self: '/company/11572607/filing-history/MzI0OTkxMjcyMmFkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/nuM94mnHWHXmQY4ZywGwAhC-2zGmANekxJL6OzwhgwI'
            },
            subcategory: 'notifications',
            type: 'PSC02',
            pages: 2,
            barcode: 'X8IP3MSH',
            transaction_id: 'MzI0OTkxMjcyMmFkaXF6a2N4'
          },
          {
            action_date: '2019-11-21',
            category: 'persons-with-significant-control',
            date: '2019-11-21',
            description:
              'withdrawal-of-a-person-with-significant-control-statement',
            description_values: { withdrawal_date: '2019-11-21' },
            links: {
              self: '/company/11572607/filing-history/MzI0OTkxMjQ0MmFkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/tcUBLeGy4aThqpTocNDv-IUg36wOuYwxEMPKtAPeVTI'
            },
            subcategory: 'statements',
            type: 'PSC09',
            pages: 2,
            barcode: 'X8IP3LRV',
            transaction_id: 'MzI0OTkxMjQ0MmFkaXF6a2N4'
          },
          {
            type: 'NEWINC',
            category: 'incorporation',
            links: {
              self: '/company/11572607/filing-history/MzIxNDY1OTI0NmFkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/wC3NqwbyvVMpiyEZcgP9BliUQzOK--Fg5d9_LayIwpA'
            },
            description: 'incorporation-company',
            date: '2018-09-17',
            pages: 23,
            barcode: 'X7EN8VH4',
            transaction_id: 'MzIxNDY1OTI0NmFkaXF6a2N4'
          }
        ],
        items_per_page: 25,
        start_index: 0,
        total_count: 12
      }
    }
    await testRequests(
      testUrls.listFilingHistory.map((path) => ({ path })),
      schema
    )
  })

  it('getFilingHistory: /company/{company_number}/filing-history/{transaction_id}', async function () {
    const schema = {
      type: 'object',
      properties: {
        action_date: { type: 'string' },
        barcode: { type: 'string' },
        category: { type: 'string' },
        date: { type: 'string' },
        description: { type: 'string' },
        description_values: {
          type: 'object',
          properties: {
            made_up_date: { type: 'string' },
            appointment_date: { type: 'string' },
            officer_name: { type: 'string' },
            psc_name: { type: 'string' },
            notification_date: { type: 'string' },
            old_address: { type: 'string' },
            new_address: { type: 'string' },
            change_date: { type: 'string' },
            new_date: { type: 'string' },
            termination_date: { type: 'string' },
            description: { type: 'string' },
            cessation_date: { type: 'string' },
            charge_number: { type: 'string' },
            charge_creation_date: { type: 'string' },
            change_address: { type: 'string' },
            date: { type: 'string' },
            capital: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  currency: { type: 'string' },
                  figure: { type: 'string' }
                },
                required: ['currency', 'figure']
              }
            },
            withdrawal_date: { type: 'string' },
            change_details: { type: 'string' },
            branch_number: { type: 'string' },
            change_type: { type: 'string' },
            representative_details: { type: 'string' },
            brought_down_date: { type: 'string' }
          }
        },
        links: {
          type: 'object',
          properties: {
            self: { type: 'string' },
            document_metadata: { type: 'string' }
          },
          required: ['self']
        },
        pages: { type: 'integer' },
        transaction_id: { type: 'string' },
        type: { type: 'string' },
        subcategory: { type: 'string' },
        paper_filed: { type: 'boolean' },
        associated_filings: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              category: { type: 'string' },
              date: { type: 'string' },
              description: { type: 'string' },
              type: { type: 'string' },
              action_date: { type: 'integer' },
              description_values: {
                type: 'object',
                properties: {
                  capital: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        currency: { type: 'string' },
                        figure: { type: 'string' }
                      },
                      required: ['currency', 'figure']
                    }
                  },
                  date: { type: 'string' },
                  capital_currency: { type: 'string' },
                  capital_figure: { type: 'string' },
                  resolution_date: { type: 'string' }
                }
              },
              original_description: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  description: { type: 'string' },
                  description_values: {
                    type: 'object',
                    properties: { description: { type: 'string' } },
                    required: ['description']
                  }
                }
              },
              subcategory: { type: 'string' },
              'matched-default': { type: 'string' }
            },
            required: ['date', 'description', 'type']
          }
        },
        resolutions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              category: { type: 'string' },
              delta_at: { type: 'string' },
              description: { type: 'string' },
              description_values: {
                type: 'object',
                properties: {
                  resolution_date: { type: 'string' },
                  description: { type: 'string' },
                  res_type: { type: 'string' },
                  case_start_date: { type: 'string' }
                }
              },
              subcategory: {
                anyOf: [
                  { type: 'string' },
                  { type: 'array', items: { type: 'string' } }
                ]
              },
              type: { type: 'string' },
              barcode: { type: 'string' },
              original_description: { type: 'string' }
            },
            required: ['category', 'description', 'subcategory', 'type']
          }
        },
        annotations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              annotation: { type: 'string' },
              category: { type: 'string' },
              date: { type: 'string' },
              description: { type: 'string' },
              description_values: {
                type: 'object',
                properties: { description: { type: 'string' } },
                required: ['description']
              },
              type: { type: 'string' }
            },
            required: [
              'annotation',
              'category',
              'date',
              'description',
              'description_values',
              'type'
            ]
          }
        }
      },
      required: [
        'category',
        'date',
        'description',
        'links',
        'transaction_id',
        'type'
      ],
      additionalProperties: false,
      title: 'filingHistoryItem',
      example: {
        action_date: '2021-08-28',
        barcode: 'XB4S9OZF',
        category: 'accounts',
        date: '2022-05-25',
        description: 'accounts-with-accounts-type-total-exemption-full',
        description_values: { made_up_date: '2021-08-28' },
        links: {
          self: '/company/10643866/filing-history/MzM0MDQzNzkxNWFkaXF6a2N4',
          document_metadata:
            'https://frontend-doc-api.company-information.service.gov.uk/document/c35R8ARtP6onZCeLvJwFNBTPZOclMs4c5HK2-I-VZD4'
        },
        pages: 7,
        transaction_id: 'MzM0MDQzNzkxNWFkaXF6a2N4',
        type: 'AA'
      }
    }
    await testRequests(
      testUrls.getFilingHistory.map((path) => ({ path })),
      schema
    )
  })
})
