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
          type: 'string',
        },
      },
      required: ['company_number'],
    },
    querystring: {
      type: 'object',
      properties: {},
      required: [],
    },
    response: {
      '200': {
        title: 'companyExemptions',
        required: ['links', 'kind', 'etag', 'exemptions'],
        properties: {
          links: {
            description:
              'A set of URLs related to the resource, including self.',
            type: 'object',
            properties: {
              self: {
                description: 'The URL of this resource.',
                type: 'string',
              },
            },
            required: ['self'],
          },
          kind: {
            type: 'string',
            enum: ['exemptions'],
          },
          etag: {
            type: 'string',
            description: 'The ETag of the resource.',
          },
          exemptions: {
            description: 'Exemptions information.',
            type: 'object',
            properties: {
              psc_exempt_as_trading_on_regulated_market: {
                description:
                  'If present the company has been or is exempt from keeping a PSC register, as it has voting shares admitted to trading on a regulated market other than the UK.',
                items: {
                  properties: {
                    items: {
                      type: 'array',
                      description: 'List of dates',
                      items: {
                        properties: {
                          exempt_from: {
                            description: 'Exemption valid from.',
                            type: 'string',
                            format: 'date',
                          },
                          exempt_to: {
                            description: 'Exemption valid to.',
                            type: 'string',
                            format: 'date',
                          },
                        },
                        required: ['exempt_from'],
                      },
                    },
                    exemption_type: {
                      description: 'The exemption type.',
                      type: 'string',
                      enum: ['psc-exempt-as-trading-on-regulated-market'],
                    },
                  },
                  required: ['exemption_type', 'items'],
                },
              },
              psc_exempt_as_shares_admitted_on_market: {
                description:
                  'If present the company has been or is exempt from keeping a PSC register, as it has voting shares admitted to trading on a market listed in the Register of People with Significant Control Regulations 2016.',
                items: {
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
                            format: 'date',
                          },
                          exempt_to: {
                            description: 'Exemption valid to.',
                            type: 'string',
                            format: 'date',
                          },
                        },
                        required: ['exempt_from'],
                      },
                    },
                    exemption_type: {
                      description: 'The exemption type.',
                      enum: ['psc-exempt-as-shares-admitted-on-market'],
                      type: 'string',
                    },
                  },
                },
              },
              disclosure_transparency_rules_chapter_five_applies: {
                description:
                  'If present the company has been or is exempt from keeping a PSC register, because it is a DTR issuer and the shares are admitted to trading on a regulated market.',
                items: {
                  properties: {
                    items: {
                      description: 'List of exemption periods.',
                      items: {
                        properties: {
                          exempt_from: {
                            description: 'Exemption valid from.',
                            type: 'string',
                            format: 'date',
                          },
                          exempt_to: {
                            description: 'Exemption valid to.',
                            type: 'string',
                            format: 'date',
                          },
                        },
                        required: ['exempt_from'],
                      },
                      type: 'array',
                    },
                    exemption_type: {
                      description: 'The exemption type.',
                      enum: [
                        'disclosure-transparency-rules-chapter-five-applies',
                      ],
                      type: 'string',
                    },
                  },
                  required: ['exemption_type', 'items'],
                },
              },
            },
          },
        },
        type: 'object',
      },
    },
  },
} as const

export type GetExemptionsResponse = FromSchema<
  typeof GetExemptionsSchema['schema']['response']['200']
>
//export type GetExemptionsResponse = any // temporary until schemas can be fixed
