import { FromSchema } from 'json-schema-to-ts'

export interface GetCorporateOfficerParams {
  /** The disqualified officer id. */
  officer_id: string
}

export interface GetCorporateOfficerQueryString {}

export const GetCorporateOfficerSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        officer_id: {
          type: 'string'
        }
      },
      required: ['officer_id']
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
          disqualifications: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                reason: {
                  type: 'object',
                  properties: {
                    section: {
                      type: 'string'
                    },
                    description_identifier: {
                      type: 'string'
                    },
                    act: {
                      type: 'string'
                    }
                  },
                  required: ['section', 'description_identifier', 'act']
                },
                disqualification_type: {
                  type: 'string'
                },
                disqualified_from: {
                  type: 'string'
                },
                case_identifier: {
                  type: 'string'
                },
                disqualified_until: {
                  type: 'string'
                },
                company_names: {
                  type: 'array',
                  items: {
                    type: 'string'
                  }
                },
                address: {
                  type: 'object',
                  properties: {
                    locality: {
                      type: 'string'
                    },
                    address_line_1: {
                      type: 'string'
                    },
                    postal_code: {
                      type: 'string'
                    },
                    region: {
                      type: 'string'
                    },
                    premises: {
                      type: 'string'
                    }
                  },
                  required: [
                    'locality',
                    'address_line_1',
                    'postal_code',
                    'region',
                    'premises'
                  ]
                }
              },
              required: [
                'reason',
                'disqualification_type',
                'disqualified_from',
                'case_identifier',
                'disqualified_until',
                'company_names',
                'address'
              ]
            }
          },
          etag: {
            type: 'string'
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
          },
          name: {
            type: 'string'
          }
        },
        required: ['disqualifications', 'etag', 'kind', 'links', 'name'],
        additionalProperties: false,
        title: 'getDisqualifiedOfficersCorporate',
        example: {
          disqualifications: [
            {
              reason: {
                section: '7',
                description_identifier:
                  'order-or-undertaking-and-reporting-provisions',
                act: 'company-directors-disqualification-act-1986'
              },
              disqualification_type: 'undertaking',
              disqualified_from: '2013-10-29',
              case_identifier: 'SIGOURNEY LIMITED',
              disqualified_until: '2022-10-28',
              company_names: ['SIGOURNEY LIMITED'],
              address: {
                locality: 'Doncaster',
                address_line_1: 'Wood Street',
                postal_code: 'DN1 3LW',
                region: 'South Yorkshire',
                premises: 'Cussins House'
              }
            }
          ],
          etag: '1b84389451c9cb428a65a22e2fbf018235deb107',
          kind: 'corporate-disqualification',
          links: {
            self: '/disqualified-officers/corporate/Rm2f9Cmvp8WkJzQxZA6RY_P7oeE'
          },
          name: 'ANDREW RUSSELL & CO LIMITED'
        }
      }
    }
  }
} as const

export type GetCorporateOfficerResponse = FromSchema<
  typeof GetCorporateOfficerSchema['schema']['response']['200']
>
//export type GetCorporateOfficerResponse = any // temporary until schemas can be fixed
