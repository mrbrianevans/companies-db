import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('filing-history-service', function () {
  this.timeout(50000)
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
              category: { type: 'string' },
              date: { type: 'string' },
              description: { type: 'string' },
              links: {
                type: 'object',
                properties: {
                  self: { type: 'string' },
                  document_metadata: { type: 'string' }
                }
              },
              paper_filed: { type: 'boolean' },
              type: { type: 'string' },
              pages: { type: 'integer' },
              barcode: { type: ['null', 'string'] },
              transaction_id: { type: 'string' },
              description_values: {
                type: 'object',
                properties: {
                  description: { type: 'string' },
                  made_up_date: { type: 'string' },
                  termination_date: { type: 'string' },
                  officer_name: { type: 'string' },
                  charge_number: { type: 'string' },
                  appointment_date: { type: 'string' },
                  change_date: { type: ['null', 'string'] },
                  old_address: { type: 'string' },
                  new_address: { type: 'string' },
                  charge_creation_date: { type: 'string' },
                  cessation_date: { type: ['null', 'string'] },
                  psc_name: { type: 'string' },
                  notification_date: { type: ['null', 'string'] },
                  new_date: { type: 'string' },
                  capital: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        figure: { type: 'string' },
                        currency: { type: 'string' },
                        date: { type: 'string' }
                      },
                      required: ['figure', 'currency']
                    }
                  },
                  date: { type: 'string' },
                  withdrawal_date: { type: 'string' },
                  brought_down_date: { type: 'string' },
                  form_attached: { type: 'string' },
                  original_description: { type: 'string' },
                  company_number: { type: 'string' },
                  close_date: { type: 'string' },
                  branch_number: { type: 'string' },
                  change_details: { type: 'string' },
                  change_address: { type: 'string' },
                  representative_details: { type: 'string' },
                  form_type: { type: 'string' },
                  case_end_date: { type: 'string' },
                  capital_currency: { type: 'string' },
                  capital_figure: { type: 'string' },
                  default_address: { type: 'string' },
                  change_type: { type: 'string' },
                  alt_capital: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        figure: { type: 'string' },
                        description: { type: 'string' },
                        date: { type: 'string' },
                        currency: { type: 'string' }
                      },
                      required: ['figure', 'description', 'date', 'currency']
                    }
                  },
                  change_name: { type: 'string' },
                  officer_address: { type: 'string' },
                  old_jurisdiction: { type: 'string' },
                  new_jurisdiction: { type: 'string' }
                }
              },
              action_date: { type: ['null', 'string'] },
              subcategory: {
                anyOf: [
                  { type: 'string' },
                  { type: 'array', items: { type: 'string' } }
                ]
              },
              associated_filings: {
                anyOf: [
                  {
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
                            resolution_date: { type: 'string' },
                            capital_figure: { type: 'string' },
                            capital_currency: { type: 'string' },
                            description: { type: 'string' }
                          }
                        },
                        type: { type: 'string' },
                        data: {
                          type: 'object',
                          properties: {
                            description: { type: 'string' },
                            description_values: {
                              type: 'object',
                              properties: {
                                description: { type: ['null', 'string'] }
                              },
                              required: ['description']
                            }
                          }
                        },
                        subcategory: { type: 'string' },
                        'matched-default': { type: 'string' },
                        matched_default: { type: 'integer' }
                      },
                      required: ['date', 'description', 'type']
                    }
                  },
                  {
                    type: 'object',
                    properties: {
                      date: {
                        description:
                          'The date the associated filing was processed.',
                        type: 'string',
                        format: 'date'
                      },
                      description: {
                        type: 'string',
                        description:
                          'A description of the associated filing.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/filing_history_descriptions.yml) file.'
                      },
                      type: {
                        description: 'The type of the associated filing.',
                        type: 'string'
                      }
                    },
                    required: ['date', 'description', 'type']
                  }
                ]
              },
              resolutions: {
                anyOf: [
                  {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        category: { type: 'string' },
                        description: { type: 'string' },
                        description_values: {
                          type: 'object',
                          properties: {
                            description: { type: 'string' },
                            res_type: { type: 'string' },
                            resolution_date: { type: 'string' },
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
                        original_description: { type: 'string' },
                        date: { type: 'integer' },
                        parent_form_type: { type: 'string' },
                        barcode: { type: 'string' }
                      },
                      required: ['category', 'description', 'type']
                    }
                  },
                  {
                    type: 'object',
                    properties: {
                      category: {
                        description: 'The category of the resolution filed.',
                        enum: ['miscellaneous'],
                        type: 'string'
                      },
                      description: {
                        description:
                          'A description of the associated filing.\n For enumeration descriptions see `description` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/filing_history_descriptions.yml) file.',
                        type: 'string'
                      },
                      document_id: {
                        description: 'The document id of the resolution.',
                        type: 'string'
                      },
                      receive_date: {
                        description: 'The date the resolution was processed.',
                        type: 'string',
                        format: 'date'
                      },
                      subcategory: {
                        description: 'The sub-category of the document filed.',
                        enum: ['resolution'],
                        type: 'string'
                      },
                      type: {
                        description: 'The type of the associated filing.',
                        type: 'string'
                      }
                    },
                    required: [
                      'category',
                      'description',
                      'receive_date',
                      'subcategory',
                      'type'
                    ]
                  }
                ]
              },
              annotations: {
                anyOf: [
                  {
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
                        'description',
                        'description_values'
                      ]
                    }
                  },
                  {
                    type: 'object',
                    properties: {
                      annotation: {
                        description: 'The annotation text.',
                        type: 'string'
                      },
                      date: {
                        type: 'string',
                        format: 'date',
                        description: 'The date the annotation was added.'
                      },
                      description: {
                        type: 'string',
                        description:
                          'A description of the annotation.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/filing_history_descriptions.yml) file.'
                      }
                    },
                    required: ['date', 'description']
                  }
                ]
              }
            },
            required: ['date', 'type', 'transaction_id']
          }
        },
        items_per_page: { type: 'integer' },
        start_index: { type: 'integer' },
        total_count: { type: 'integer' },
        etag: { description: 'The ETag of the resource.', type: 'string' },
        kind: {
          description: 'Indicates this resource is a filing history.',
          enum: ['filing-history'],
          type: 'string'
        }
      },
      required: ['items', 'items_per_page', 'start_index', 'total_count'],
      additionalProperties: false,
      title: 'listFilingHistory',
      example: {
        filing_history_status: 'filing-history-available',
        items: [
          {
            category: 'gazette',
            date: '2010-02-09',
            description: 'gazette-dissolved-compulsory',
            links: {
              self: '/company/05381710/filing-history/MzAwODQzOTIzM2FkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/xTqyy5RYfIb7NlTikTojrI3PtA8y2Nt5JHi4pIVSjmM'
            },
            paper_filed: true,
            type: 'GAZ2',
            pages: 1,
            barcode: null,
            transaction_id: 'MzAwODQzOTIzM2FkaXF6a2N4'
          },
          {
            category: 'gazette',
            date: '2009-10-27',
            description: 'gazette-notice-compulsory',
            links: {
              self: '/company/05381710/filing-history/MzAwMDc4OTY1MGFkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/aKSkCU2X-JLbX6ZW0hcKbjNA_BBBSeg3La377agwb-A'
            },
            paper_filed: true,
            type: 'GAZ1',
            pages: 1,
            barcode: null,
            transaction_id: 'MzAwMDc4OTY1MGFkaXF6a2N4'
          },
          {
            category: 'annual-return',
            date: '2008-07-03',
            description: 'legacy',
            description_values: {
              description: 'Return made up to 29/06/08; full list of members'
            },
            links: {
              self: '/company/05381710/filing-history/MjAwODM3OTM1OWFkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/8XRUtG5jn-A8gBdPR39q2h-CSyOa4SQ6sEpwQm9xnQI'
            },
            type: '363a',
            pages: 3,
            barcode: 'XBF0613X',
            transaction_id: 'MjAwODM3OTM1OWFkaXF6a2N4'
          },
          {
            action_date: '2008-03-31',
            category: 'accounts',
            date: '2008-07-03',
            description: 'accounts-with-made-up-date',
            description_values: { made_up_date: '2008-03-31' },
            links: {
              self: '/company/05381710/filing-history/MjAwODM3OTEwM2FkaXF6a2N4',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/Mob0mmjHTJJQdC2EetIDkfslHluEBssQZjgXzg4rXeA'
            },
            type: 'AA',
            pages: 2,
            barcode: 'XBF1I13A',
            transaction_id: 'MjAwODM3OTEwM2FkaXF6a2N4'
          },
          {
            action_date: '2007-03-31',
            category: 'accounts',
            date: '2007-07-12',
            description: 'accounts-with-made-up-date',
            description_values: { made_up_date: '2007-03-31' },
            links: {
              self: '/company/05381710/filing-history/MTgzMjU3NjMyYWRpcXprY3g',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/Wo1pU2knJCpCe55kY1ovdBL5ZE0-kkF-aMrXNsBvVoQ'
            },
            paper_filed: true,
            type: 'AA',
            pages: 1,
            barcode: null,
            transaction_id: 'MTgzMjU3NjMyYWRpcXprY3g'
          },
          {
            category: 'annual-return',
            date: '2007-06-29',
            description: 'legacy',
            description_values: {
              description: 'Return made up to 29/06/07; full list of members'
            },
            links: {
              self: '/company/05381710/filing-history/MTgxNDMxMjk0YWRpcXprY3g',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/Lklufo0bVHxRCdkPf77LXAOYZrG3KZFMPVWZVtKdxBU'
            },
            paper_filed: true,
            type: '363a',
            pages: 2,
            barcode: null,
            transaction_id: 'MTgxNDMxMjk0YWRpcXprY3g'
          },
          {
            category: 'address',
            date: '2006-07-05',
            description: 'legacy',
            description_values: {
              description:
                'Registered office changed on 05/07/06 from:  room 2A 2ND floor china supermarket 32-34 tudor street riverside cardiff CF11 6AH'
            },
            links: {
              self: '/company/05381710/filing-history/MTYzNDcyNzYxYWRpcXprY3g',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/jsS5vkWFS1YbQXeVc_FhvOTGYJ5YawE4xStVn6WHaH0'
            },
            paper_filed: true,
            type: '287',
            pages: 1,
            barcode: null,
            transaction_id: 'MTYzNDcyNzYxYWRpcXprY3g'
          },
          {
            action_date: '2006-03-31',
            category: 'accounts',
            date: '2006-06-12',
            description: 'accounts-with-made-up-date',
            description_values: { made_up_date: '2006-03-31' },
            links: {
              self: '/company/05381710/filing-history/MTYyMDUxODk1YWRpcXprY3g',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/uwznUBjxD2XbfPsjSnTMknR88j3L50Y8Fnd4jgWF22Q'
            },
            paper_filed: true,
            type: 'AA',
            pages: 1,
            barcode: null,
            transaction_id: 'MTYyMDUxODk1YWRpcXprY3g'
          },
          {
            category: 'annual-return',
            date: '2006-06-02',
            description: 'legacy',
            description_values: {
              description: 'Return made up to 02/06/06; full list of members'
            },
            links: {
              self: '/company/05381710/filing-history/MTYxMTM0NTYyYWRpcXprY3g',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/4ek4RHNaMyN8LTA_DfUJ2Iij3tiQGxPc1eyuiOVM9Z8'
            },
            paper_filed: true,
            type: '363a',
            pages: 2,
            barcode: null,
            transaction_id: 'MTYxMTM0NTYyYWRpcXprY3g'
          },
          {
            category: 'incorporation',
            date: '2005-03-03',
            description: 'incorporation-company',
            links: {
              self: '/company/05381710/filing-history/MTUyNzkwNjQyYWRpcXprY3g',
              document_metadata:
                'https://frontend-doc-api.company-information.service.gov.uk/document/R0diF-k7pWyVGFhAKqjFgNp6gyPsDg5q-YlPyjELvxg'
            },
            paper_filed: true,
            type: 'NEWINC',
            pages: 21,
            barcode: null,
            transaction_id: 'MTUyNzkwNjQyYWRpcXprY3g'
          }
        ],
        items_per_page: 25,
        start_index: 0,
        total_count: 10
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
        associated_filings: {
          anyOf: [
            {
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
                      description: { type: 'string' },
                      capital_figure: { type: 'string' },
                      capital_currency: { type: 'string' }
                    }
                  },
                  original_description: { type: 'string' },
                  data: { type: 'object' },
                  subcategory: { type: 'string' }
                },
                required: ['category', 'date', 'description', 'type']
              }
            },
            {
              type: 'object',
              properties: {
                date: {
                  description: 'The date the associated filing was processed.',
                  type: 'string',
                  format: 'date'
                },
                description: {
                  type: 'string',
                  description:
                    'A description of the associated filing.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/filing_history_descriptions.yml) file.'
                },
                type: {
                  description: 'The type of the associated filing.',
                  type: 'string'
                }
              },
              required: ['date', 'description', 'type']
            }
          ]
        },
        barcode: { type: 'string' },
        category: { type: 'string' },
        date: { type: 'string' },
        description: { type: 'string' },
        links: {
          type: 'object',
          properties: {
            self: { type: 'string' },
            document_metadata: { type: 'string' }
          }
        },
        pages: { type: 'integer' },
        transaction_id: { type: 'string' },
        type: { type: 'string' },
        action_date: { type: ['null', 'string'] },
        description_values: {
          type: 'object',
          properties: {
            officer_name: { type: 'string' },
            appointment_date: { type: 'string' },
            made_up_date: { type: 'string' },
            capital: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  figure: { type: 'string' },
                  currency: { type: 'string' },
                  date: { type: 'string' }
                },
                required: ['figure', 'currency']
              }
            },
            date: { type: 'string' },
            cessation_date: { type: 'string' },
            psc_name: { type: 'string' },
            change_date: { type: 'string' },
            new_date: { type: 'string' },
            termination_date: { type: 'string' },
            description: { type: 'string' },
            representative_details: { type: 'string' },
            branch_number: { type: 'string' },
            old_address: { type: 'string' },
            new_address: { type: 'string' },
            notification_date: { type: ['null', 'string'] },
            charge_number: { type: 'string' },
            charge_creation_date: { type: 'string' },
            withdrawal_date: { type: 'string' },
            change_name: { type: 'string' },
            original_description: { type: 'string' },
            brought_down_date: { type: 'string' },
            change_details: { type: 'string' },
            change_type: { type: 'string' },
            old_jurisdiction: { type: 'string' },
            new_jurisdiction: { type: 'string' },
            form_attached: { type: 'string' },
            default_address: { type: 'string' },
            change_address: { type: 'string' }
          }
        },
        subcategory: {
          anyOf: [
            { type: 'string' },
            { type: 'array', items: { type: 'string' } }
          ]
        },
        annotations: {
          anyOf: [
            {
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
            },
            {
              type: 'object',
              properties: {
                annotation: {
                  description: 'The annotation text.',
                  type: 'string'
                },
                date: {
                  type: 'string',
                  format: 'date',
                  description: 'The date the annotation was added.'
                },
                description: {
                  type: 'string',
                  description:
                    'A description of the annotation.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/filing_history_descriptions.yml) file.'
                }
              },
              required: ['date', 'description']
            }
          ]
        },
        paper_filed: { type: 'boolean' },
        resolutions: {
          anyOf: [
            {
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
                      res_type: { type: 'string' },
                      description: { type: 'string' },
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
                  original_description: { type: 'string' }
                },
                required: ['category', 'description', 'subcategory', 'type']
              }
            },
            {
              type: 'object',
              properties: {
                category: {
                  description: 'The category of the resolution filed.',
                  enum: ['miscellaneous'],
                  type: 'string'
                },
                description: {
                  description:
                    'A description of the associated filing.\n For enumeration descriptions see `description` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/filing_history_descriptions.yml) file.',
                  type: 'string'
                },
                document_id: {
                  description: 'The document id of the resolution.',
                  type: 'string'
                },
                receive_date: {
                  description: 'The date the resolution was processed.',
                  type: 'string',
                  format: 'date'
                },
                subcategory: {
                  description: 'The sub-category of the document filed.',
                  enum: ['resolution'],
                  type: 'string'
                },
                type: {
                  description: 'The type of the associated filing.',
                  type: 'string'
                }
              },
              required: [
                'category',
                'description',
                'receive_date',
                'subcategory',
                'type'
              ]
            }
          ]
        }
      },
      required: ['date', 'transaction_id', 'type'],
      additionalProperties: false,
      title: 'getFilingHistory',
      example: {
        associated_filings: [
          {
            category: 'incorporation',
            date: '2022-05-26',
            description: 'model-articles-adopted',
            type: 'MODEL ARTICLES'
          },
          {
            action_date: 1653523200000,
            category: 'capital',
            date: '2022-05-26',
            description: 'statement-of-capital',
            description_values: {
              capital: [{ currency: 'GBP', figure: '100' }],
              date: '2022-05-26'
            },
            original_description: '26/05/22 Statement of Capital;GBP 100',
            type: 'SH01'
          }
        ],
        barcode: 'XB4V0BDZ',
        category: 'incorporation',
        date: '2022-05-26',
        description: 'incorporation-company',
        links: {
          self: '/company/14134819/filing-history/MzM0MDU5Njc5OWFkaXF6a2N4',
          document_metadata:
            'https://frontend-doc-api.company-information.service.gov.uk/document/z53Jqi6iBVpRHxcXd40-y2FD5w4Sql4yUNDutsa1BYs'
        },
        pages: 13,
        transaction_id: 'MzM0MDU5Njc5OWFkaXF6a2N4',
        type: 'NEWINC'
      }
    }
    await testRequests(
      testUrls.getFilingHistory.map((path) => ({ path })),
      schema
    )
  })
})
