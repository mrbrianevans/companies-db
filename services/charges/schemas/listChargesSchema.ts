import { FromSchema } from 'json-schema-to-ts'

export interface ListChargesParams {
  /** The company number that the charge list is required for. */
  company_number: string
}

export interface ListChargesQueryString {}

export const ListChargesSchema = {
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
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                classification: {
                  type: 'object',
                  properties: {
                    description: {
                      type: 'string'
                    },
                    type: {
                      type: 'string'
                    }
                  },
                  required: ['description', 'type']
                },
                status: {
                  type: 'string'
                },
                etag: {
                  type: 'string'
                },
                delivered_on: {
                  type: 'string'
                },
                transactions: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      filing_type: {
                        type: 'string'
                      },
                      links: {
                        type: 'object',
                        properties: {
                          filing: {
                            type: 'string'
                          },
                          insolvency_case: {
                            type: 'string'
                          }
                        },
                        required: ['filing']
                      },
                      delivered_on: {
                        type: 'string'
                      },
                      insolvency_case_number: {
                        type: 'string'
                      }
                    },
                    required: ['delivered_on']
                  }
                },
                particulars: {
                  type: 'object',
                  properties: {
                    contains_fixed_charge: {
                      type: 'boolean'
                    },
                    contains_floating_charge: {
                      type: 'boolean'
                    },
                    floating_charge_covers_all: {
                      type: 'boolean'
                    },
                    contains_negative_pledge: {
                      type: 'boolean'
                    },
                    description: {
                      type: 'string'
                    },
                    type: {
                      type: 'string'
                    },
                    chargor_acting_as_bare_trustee: {
                      type: 'boolean'
                    }
                  }
                },
                created_on: {
                  type: 'string'
                },
                charge_number: {
                  type: 'integer'
                },
                charge_code: {
                  type: 'string'
                },
                links: {
                  type: 'object',
                  properties: {
                    self: {
                      type: 'string'
                    }
                  },
                  required: ['self']
                },
                persons_entitled: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string'
                      }
                    },
                    required: ['name']
                  }
                },
                secured_details: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string'
                    },
                    description: {
                      type: 'string'
                    }
                  },
                  required: ['type', 'description']
                },
                satisfied_on: {
                  type: 'string'
                },
                insolvency_cases: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      case_number: {
                        type: 'string'
                      },
                      transaction_id: {
                        type: 'string'
                      },
                      links: {
                        type: 'object',
                        properties: {
                          case: {
                            type: 'string'
                          }
                        },
                        required: ['case']
                      }
                    },
                    required: ['case_number', 'links']
                  }
                },
                assets_ceased_released: {
                  type: 'string'
                },
                acquired_on: {
                  type: 'string'
                },
                scottish_alterations: {
                  type: 'object',
                  properties: {
                    has_restricting_provisions: {
                      type: 'boolean'
                    },
                    has_alterations_to_prohibitions: {
                      type: 'boolean'
                    },
                    has_alterations_to_order: {
                      type: 'boolean'
                    }
                  }
                }
              },
              required: [
                'classification',
                'status',
                'delivered_on',
                'transactions',
                'particulars',
                'created_on',
                'charge_number',
                'links',
                'persons_entitled'
              ]
            }
          },
          part_satisfied_count: {
            type: 'integer'
          },
          satisfied_count: {
            type: 'integer'
          },
          total_count: {
            type: 'integer'
          },
          unfiltered_count: {
            type: 'integer'
          }
        },
        required: [
          'items',
          'part_satisfied_count',
          'satisfied_count',
          'total_count',
          'unfiltered_count'
        ],
        additionalProperties: false,
        title: 'listCharge',
        example: {
          items: [
            {
              classification: {
                description: 'A registered charge',
                type: 'charge-description'
              },
              status: 'outstanding',
              etag: '042be5428363cea67284c5ebc9952e7f55254a9a',
              delivered_on: '2022-01-11',
              transactions: [
                {
                  filing_type: 'create-charge-with-deed',
                  links: {
                    filing:
                      '/company/13402420/filing-history/MzMyNjMxMDk5MGFkaXF6a2N4'
                  },
                  delivered_on: '2022-01-11'
                }
              ],
              particulars: {
                contains_fixed_charge: true,
                contains_floating_charge: true,
                floating_charge_covers_all: true,
                contains_negative_pledge: true
              },
              created_on: '2022-01-06',
              charge_number: 1,
              charge_code: '134024200001',
              links: {
                self: '/company/13402420/charges/hVQSDyC7GrQ004Z70famRjrIw60'
              },
              persons_entitled: [
                {
                  name: 'Sanne Group (UK) Limited'
                }
              ]
            }
          ],
          part_satisfied_count: 0,
          satisfied_count: 0,
          total_count: 1,
          unfiltered_count: 1
        }
      }
    }
  }
} as const

export type ListChargesResponse = FromSchema<
  typeof ListChargesSchema['schema']['response']['200']
>
//export type ListChargesResponse = any // temporary until schemas can be fixed
