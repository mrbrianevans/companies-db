import {FromSchema} from "json-schema-to-ts";

const exemptionsStorageSchema = {
  type: 'object',
  properties: {
    etag: {
      type: 'string'
    },
    exemptions: {
      type: 'object',
      properties: {
        psc_exempt_as_trading_on_uk_regulated_market: {
          type: 'object',
          properties: {
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
                required: ['exempt_from']
              }
            },
            exemption_type: {
              type: 'string'
            }
          },
          required: ['items', 'exemption_type']
        },
        disclosure_transparency_rules_chapter_five_applies: {
          type: 'object',
          properties: {
            exemption_type: {
              type: 'string'
            },
            items: {
              anyOf: [
                {
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
                },
                {
                  type: 'object',
                  properties: {
                    exempt_from: {
                      description: 'Exemption valid from.',
                      type: 'string',
                      format: 'date'
                    },
                    exempt_to: {
                      description: 'Exemption valid to.',
                      type: 'string',
                      format: 'date'
                    }
                  },
                  required: ['exempt_from']
                }
              ]
            }
          },
          required: ['exemption_type', 'items']
        },
        psc_exempt_as_trading_on_regulated_market: {
          type: 'object',
          properties: {
            exemption_type: {
              type: 'string'
            },
            items: {
              anyOf: [
                {
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
                },
                {
                  type: 'object',
                  properties: {
                    exempt_from: {
                      description: 'Exemption valid from.',
                      type: 'string',
                      format: 'date'
                    },
                    exempt_to: {
                      description: 'Exemption valid to.',
                      type: 'string',
                      format: 'date'
                    }
                  },
                  required: ['exempt_from']
                }
              ]
            }
          },
          required: ['exemption_type', 'items']
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
        },
        psc_exempt_as_shares_admitted_on_market: {
          description:
            'If present the company has been or is exempt from keeping a PSC register, as it has voting shares admitted to trading on a market listed in the Register of People with Significant Control Regulations 2016.',
          type: 'object',
          required: ['exemption_type', 'items'],
          properties: {
            items: {
              description: 'List of dates',
              type: 'array',
              items: {
                properties: {
                  exempt_from: {
                    description: 'Exemption valid from.',
                    type: 'string',
                    format: 'date'
                  },
                  exempt_to: {
                    description: 'Exemption valid to.',
                    type: 'string',
                    format: 'date'
                  }
                },
                required: ['exempt_from']
              }
            },
            exemption_type: {
              description: 'The exemption type.',
              enum: ['psc-exempt-as-shares-admitted-on-market'],
              type: 'string'
            }
          }
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
    etag: '8c96ca11d8c34efadb7c0eae5c2bc9a24c87bd46',
    exemptions: {
      psc_exempt_as_trading_on_uk_regulated_market: {
        items: [
          {
            exempt_to: '2020-12-28',
            exempt_from: '2017-12-28'
          }
        ],
        exemption_type: 'psc-exempt-as-trading-on-uk-regulated-market'
      },
      disclosure_transparency_rules_chapter_five_applies: {
        exemption_type:
          'disclosure-transparency-rules-chapter-five-applies',
        items: [
          {
            exempt_to: '2020-12-28',
            exempt_from: '2016-12-28'
          }
        ]
      }
    },
    kind: 'exemptions',
    links: {
      self: '/company/07892904/exemptions'
    }
  }
} as const

export type ExemptionsStorage = FromSchema<typeof exemptionsStorageSchema> & {company_number: string}
