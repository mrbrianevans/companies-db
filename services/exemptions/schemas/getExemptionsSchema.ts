import { FromSchema } from 'json-schema-to-ts'

export interface GetExemptionsParams {
  /** The company number that the exemptions list is quired for. */
  company_number: string
}

export interface GetExemptionsQueryString {}

export const GetExemptionsSchema = {
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
          etag: {
            type: 'string'
          },
          exemptions: {
            type: 'object',
            properties: {
              psc_exempt_as_trading_on_regulated_market: {
                type: 'object',
                properties: {
                  exemption_type: {
                    type: 'string'
                  },
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        exempt_to: {
                          type: 'string'
                        },
                        exempt_from: {
                          type: 'string'
                        }
                      },
                      required: ['exempt_to', 'exempt_from']
                    }
                  }
                },
                required: ['exemption_type', 'items']
              },
              disclosure_transparency_rules_chapter_five_applies: {
                type: 'object',
                properties: {
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        exempt_from: {
                          type: 'string'
                        },
                        exempt_to: {
                          type: 'string'
                        }
                      },
                      required: ['exempt_from', 'exempt_to']
                    }
                  },
                  exemption_type: {
                    type: 'string'
                  }
                },
                required: ['items', 'exemption_type']
              },
              psc_exempt_as_trading_on_uk_regulated_market: {
                type: 'object',
                properties: {
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        exempt_from: {
                          type: 'string'
                        },
                        exempt_to: {
                          type: 'string'
                        }
                      },
                      required: ['exempt_from']
                    }
                  },
                  exemption_type: {
                    type: 'string'
                  }
                },
                required: ['items', 'exemption_type']
              },
              psc_exempt_as_trading_on_eu_regulated_market: {
                type: 'object',
                properties: {
                  exemption_type: {
                    type: 'string'
                  },
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        exempt_from: {
                          type: 'string'
                        },
                        exempt_to: {
                          type: 'string'
                        }
                      },
                      required: ['exempt_from', 'exempt_to']
                    }
                  }
                },
                required: ['exemption_type', 'items']
              }
            }
          },
          kind: {
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
          }
        },
        required: ['etag', 'exemptions', 'kind', 'links'],
        additionalProperties: false,
        title: 'getExemptions',
        example: {
          etag: 'd427c6d903475de1b7d15e352ece0b1e0ac99554',
          exemptions: {
            psc_exempt_as_trading_on_regulated_market: {
              exemption_type: 'psc-exempt-as-trading-on-regulated-market',
              items: [
                {
                  exempt_to: '2021-08-13',
                  exempt_from: '2017-08-13'
                }
              ]
            },
            disclosure_transparency_rules_chapter_five_applies: {
              items: [
                {
                  exempt_from: '2016-08-13',
                  exempt_to: '2021-08-24'
                }
              ],
              exemption_type:
                'disclosure-transparency-rules-chapter-five-applies'
            },
            psc_exempt_as_trading_on_uk_regulated_market: {
              items: [
                {
                  exempt_from: '2021-08-13'
                }
              ],
              exemption_type: 'psc-exempt-as-trading-on-uk-regulated-market'
            }
          },
          kind: 'exemptions',
          links: {
            self: '/company/00084492/exemptions'
          }
        }
      }
    }
  }
} as const

export type GetExemptionsResponse = FromSchema<
  typeof GetExemptionsSchema['schema']['response']['200']
>
//export type GetExemptionsResponse = any // temporary until schemas can be fixed
