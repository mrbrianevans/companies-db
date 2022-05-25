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
          action_date: {
            type: 'string'
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
          description_values: {
            type: 'object',
            properties: {
              made_up_date: {
                type: 'string'
              },
              appointment_date: {
                type: 'string'
              },
              officer_name: {
                type: 'string'
              },
              psc_name: {
                type: 'string'
              },
              notification_date: {
                type: 'string'
              },
              old_address: {
                type: 'string'
              },
              new_address: {
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
              cessation_date: {
                type: 'string'
              },
              charge_number: {
                type: 'string'
              },
              charge_creation_date: {
                type: 'string'
              },
              change_address: {
                type: 'string'
              },
              date: {
                type: 'string'
              },
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
              withdrawal_date: {
                type: 'string'
              },
              change_details: {
                type: 'string'
              },
              branch_number: {
                type: 'string'
              },
              change_type: {
                type: 'string'
              },
              representative_details: {
                type: 'string'
              },
              brought_down_date: {
                type: 'string'
              }
            }
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
            },
            required: ['self']
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
          subcategory: {
            type: 'string'
          },
          paper_filed: {
            type: 'boolean'
          },
          associated_filings: {
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
                    capital_currency: {
                      type: 'string'
                    },
                    capital_figure: {
                      type: 'string'
                    },
                    resolution_date: {
                      type: 'string'
                    }
                  }
                },
                original_description: {
                  type: 'string'
                },
                data: {
                  type: 'object',
                  properties: {
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
                    }
                  }
                },
                subcategory: {
                  type: 'string'
                },
                'matched-default': {
                  type: 'string'
                }
              },
              required: ['date', 'description', 'type']
            }
          },
          resolutions: {
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
                    description: {
                      type: 'string'
                    },
                    res_type: {
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
                barcode: {
                  type: 'string'
                },
                original_description: {
                  type: 'string'
                }
              },
              required: ['category', 'description', 'subcategory', 'type']
            }
          },
          annotations: {
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
          description_values: {
            made_up_date: '2021-08-28'
          },
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
    }
  }
} as const

export type GetFilingHistoryResponse = FromSchema<
  typeof GetFilingHistorySchema['schema']['response']['200']
>
//export type GetFilingHistoryResponse = any // temporary until schemas can be fixed
