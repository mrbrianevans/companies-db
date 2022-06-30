import { FromSchema } from 'json-schema-to-ts'

export interface GetFilingHistoryParams {
  /** The company number that the single filing is required for. */
  company_number: string
  /** The transaction id that the filing history is required for. */
  transaction_id: string
}

export interface GetFilingHistoryQueryString {}

export const GetFilingHistorySchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        company_number: {
          type: 'string'
        },
        transaction_id: {
          type: 'string'
        }
      },
      required: ['company_number', 'transaction_id']
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
          associated_filings: {
            anyOf: [
              {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    category: {
                      type: 'string'
                    },
                    date: {
                      type: 'string'
                    },
                    description: {
                      type: 'string'
                    },
                    type: {
                      type: 'string'
                    },
                    action_date: {
                      type: 'integer'
                    },
                    description_values: {
                      type: 'object',
                      properties: {
                        capital: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              currency: {
                                type: 'string'
                              },
                              figure: {
                                type: 'string'
                              }
                            },
                            required: ['currency', 'figure']
                          }
                        },
                        date: {
                          type: 'string'
                        },
                        description: {
                          type: 'string'
                        },
                        capital_figure: {
                          type: 'string'
                        },
                        capital_currency: {
                          type: 'string'
                        }
                      }
                    },
                    original_description: {
                      type: 'string'
                    },
                    data: {
                      type: 'object'
                    },
                    subcategory: {
                      type: 'string'
                    }
                  },
                  required: ['category', 'date', 'description', 'type']
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
          barcode: {
            type: 'string'
          },
          category: {
            type: 'string'
          },
          date: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          links: {
            type: 'object',
            properties: {
              self: {
                type: 'string'
              },
              document_metadata: {
                type: 'string'
              }
            }
          },
          pages: {
            type: 'integer'
          },
          transaction_id: {
            type: 'string'
          },
          type: {
            type: 'string'
          },
          action_date: {
            type: ['null', 'string']
          },
          description_values: {
            type: 'object',
            properties: {
              officer_name: {
                type: 'string'
              },
              appointment_date: {
                type: 'string'
              },
              made_up_date: {
                type: 'string'
              },
              capital: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    figure: {
                      type: 'string'
                    },
                    currency: {
                      type: 'string'
                    },
                    date: {
                      type: 'string'
                    }
                  },
                  required: ['figure', 'currency']
                }
              },
              date: {
                type: 'string'
              },
              cessation_date: {
                type: 'string'
              },
              psc_name: {
                type: 'string'
              },
              change_date: {
                type: 'string'
              },
              new_date: {
                type: 'string'
              },
              termination_date: {
                type: 'string'
              },
              description: {
                type: 'string'
              },
              representative_details: {
                type: 'string'
              },
              branch_number: {
                type: 'string'
              },
              old_address: {
                type: 'string'
              },
              new_address: {
                type: 'string'
              },
              notification_date: {
                type: ['null', 'string']
              },
              charge_number: {
                type: 'string'
              },
              charge_creation_date: {
                type: 'string'
              },
              withdrawal_date: {
                type: 'string'
              },
              change_name: {
                type: 'string'
              },
              original_description: {
                type: 'string'
              },
              brought_down_date: {
                type: 'string'
              },
              change_details: {
                type: 'string'
              },
              change_type: {
                type: 'string'
              },
              old_jurisdiction: {
                type: 'string'
              },
              new_jurisdiction: {
                type: 'string'
              },
              form_attached: {
                type: 'string'
              },
              default_address: {
                type: 'string'
              },
              change_address: {
                type: 'string'
              }
            }
          },
          subcategory: {
            anyOf: [
              {
                type: 'string'
              },
              {
                type: 'array',
                items: {
                  type: 'string'
                }
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
                    annotation: {
                      type: 'string'
                    },
                    category: {
                      type: 'string'
                    },
                    date: {
                      type: 'string'
                    },
                    description: {
                      type: 'string'
                    },
                    description_values: {
                      type: 'object',
                      properties: {
                        description: {
                          type: 'string'
                        }
                      },
                      required: ['description']
                    },
                    type: {
                      type: 'string'
                    }
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
          paper_filed: {
            type: 'boolean'
          },
          resolutions: {
            anyOf: [
              {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    category: {
                      type: 'string'
                    },
                    delta_at: {
                      type: 'string'
                    },
                    description: {
                      type: 'string'
                    },
                    description_values: {
                      type: 'object',
                      properties: {
                        resolution_date: {
                          type: 'string'
                        },
                        res_type: {
                          type: 'string'
                        },
                        description: {
                          type: 'string'
                        },
                        case_start_date: {
                          type: 'string'
                        }
                      }
                    },
                    subcategory: {
                      anyOf: [
                        {
                          type: 'string'
                        },
                        {
                          type: 'array',
                          items: {
                            type: 'string'
                          }
                        }
                      ]
                    },
                    type: {
                      type: 'string'
                    },
                    original_description: {
                      type: 'string'
                    }
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
                capital: [
                  {
                    currency: 'GBP',
                    figure: '100'
                  }
                ],
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
    }
  }
} as const

export type GetFilingHistoryResponse = FromSchema<
  typeof GetFilingHistorySchema['schema']['response']['200']
>
//export type GetFilingHistoryResponse = any // temporary until schemas can be fixed
