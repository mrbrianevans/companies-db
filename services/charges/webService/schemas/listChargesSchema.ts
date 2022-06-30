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
                satisfied_on: {
                  type: 'string'
                },
                secured_details: {
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
                created_on: {
                  type: 'string'
                },
                etag: {
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
                particulars: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string'
                    },
                    description: {
                      type: 'string'
                    },
                    contains_floating_charge: {
                      type: 'boolean'
                    },
                    contains_fixed_charge: {
                      type: 'boolean'
                    },
                    contains_negative_pledge: {
                      type: 'boolean'
                    },
                    floating_charge_covers_all: {
                      type: 'boolean'
                    },
                    chargor_acting_as_bare_trustee: {
                      type: 'boolean'
                    }
                  }
                },
                status: {
                  type: 'string'
                },
                charge_number: {
                  type: 'integer'
                },
                transactions: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      delivered_on: {
                        type: 'string'
                      },
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
                        }
                      },
                      insolvency_case_number: {
                        anyOf: [
                          {
                            type: 'string'
                          },
                          {
                            type: 'integer',
                            description:
                              'The insolvency case related to this filing'
                          }
                        ]
                      },
                      transaction_id: {
                        type: 'integer',
                        description: 'The id of the filing'
                      }
                    }
                  }
                },
                delivered_on: {
                  type: 'string'
                },
                charge_code: {
                  type: 'string'
                },
                scottish_alterations: {
                  type: 'object',
                  properties: {
                    has_alterations_to_order: {
                      type: 'boolean'
                    },
                    has_restricting_provisions: {
                      type: 'boolean'
                    },
                    has_alterations_to_prohibitions: {
                      type: 'boolean'
                    },
                    type: {
                      type: 'string'
                    },
                    description: {
                      type: 'string'
                    },
                    has_alterations_to_provisions: {
                      type: 'boolean',
                      description:
                        'The charge has provisions restricting the creation of further charges'
                    }
                  }
                },
                assets_ceased_released: {
                  type: 'string'
                },
                insolvency_cases: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      case_number: {
                        anyOf: [
                          {
                            type: 'string'
                          },
                          {
                            type: 'integer',
                            description: 'The number of this insolvency case'
                          }
                        ]
                      },
                      links: {
                        type: 'object',
                        properties: {
                          case: {
                            type: 'string'
                          }
                        }
                      },
                      transaction_id: {
                        anyOf: [
                          {
                            type: 'string'
                          },
                          {
                            type: 'integer',
                            description: 'The id of the insolvency filing'
                          }
                        ]
                      }
                    }
                  }
                },
                acquired_on: {
                  type: 'string'
                },
                id: {
                  type: 'string',
                  description: 'The id of the charge'
                },
                assests_ceased_released: {
                  enum: [
                    'property-ceased-to-belong',
                    'part-property-release-and-ceased-to-belong',
                    'part-property-released',
                    'part-property-ceased-to-belong',
                    'whole-property-released',
                    'multiple-filings',
                    'whole-property-released-and-ceased-to-belong'
                  ],
                  type: 'string',
                  description:
                    'Cease/release information about the charge.\n For enumeration descriptions see `assets-ceased-released` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/mortgage_descriptions.yml)'
                },
                resolved_on: {
                  type: 'string',
                  format: 'date',
                  description: 'The date the issue was resolved on'
                },
                covering_instrument_date: {
                  type: 'string',
                  format: 'date',
                  description:
                    'The date by which the series of debentures were created'
                },
                more_than_four_persons_entitled: {
                  type: 'boolean',
                  description: 'Charge has more than four person entitled'
                }
              },
              required: ['classification', 'status', 'charge_number']
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
          },
          etag: {
            description: 'The ETag of the resource.',
            type: 'string'
          },
          unfiletered_count: {
            type: 'integer',
            description: 'Number of satisfied charges'
          }
        },
        required: ['items'],
        additionalProperties: false,
        title: 'listCharges',
        example: {
          items: [
            {
              classification: {
                description: 'Legal charge',
                type: 'charge-description'
              },
              persons_entitled: [
                {
                  name: 'Peninsula Finance PLC'
                }
              ],
              satisfied_on: '2006-07-21',
              secured_details: {
                description:
                  'All monies due or to become due from the company to the chargee',
                type: 'amount-secured'
              },
              created_on: '2005-07-17',
              etag: '40ebd950858c2454d9d2f5d576d99dfd4e94baca',
              links: {
                self: '/company/05343375/charges/UzsQvPoNZDG383SZSfwiwb8O_rQ'
              },
              particulars: {
                type: 'short-particulars',
                description: '80 kenwyn streetn truro cornwall.'
              },
              status: 'fully-satisfied',
              charge_number: 1,
              transactions: [
                {
                  delivered_on: '2005-07-28',
                  filing_type: 'create-charge-pre-2006-companies-act',
                  links: {
                    filing:
                      '/company/05343375/filing-history/MDE0MjE3NTAxM2FkaXF6a2N4'
                  }
                },
                {
                  filing_type: 'charge-satisfaction-pre-2006-companies-act',
                  links: {
                    filing:
                      '/company/05343375/filing-history/MDE2MzAzMDI1NGFkaXF6a2N4'
                  },
                  delivered_on: '2006-07-21'
                }
              ],
              delivered_on: '2005-07-28'
            }
          ],
          part_satisfied_count: 0,
          satisfied_count: 1,
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
