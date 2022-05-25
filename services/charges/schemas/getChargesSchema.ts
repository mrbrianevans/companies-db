import { FromSchema } from 'json-schema-to-ts'

export interface GetChargesParams {
  /** The company number of the company with the charge. */
  company_number: string
  /** The charge id of the charge being requested. */
  charge_id: string
}

export interface GetChargesQueryString {}

export const GetChargesSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        company_number: {
          type: 'string'
        },
        charge_id: {
          type: 'string'
        }
      },
      required: ['company_number', 'charge_id']
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
          charge_code: {
            type: 'string'
          },
          charge_number: {
            type: 'integer'
          },
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
          created_on: {
            type: 'string'
          },
          delivered_on: {
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
              description: {
                type: 'string'
              },
              contains_negative_pledge: {
                type: 'boolean'
              },
              type: {
                type: 'string'
              },
              floating_charge_covers_all: {
                type: 'boolean'
              },
              contains_fixed_charge: {
                type: 'boolean'
              },
              contains_floating_charge: {
                type: 'boolean'
              },
              chargor_acting_as_bare_trustee: {
                type: 'boolean'
              }
            }
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
          status: {
            type: 'string'
          },
          transactions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                links: {
                  type: 'object',
                  properties: {
                    filing: {
                      type: 'string'
                    }
                  },
                  required: ['filing']
                },
                delivered_on: {
                  type: 'string'
                },
                filing_type: {
                  type: 'string'
                }
              },
              required: ['delivered_on', 'filing_type']
            }
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
          satisfied_on: {
            type: 'string'
          },
          scottish_alterations: {
            type: 'object',
            properties: {
              has_restricting_provisions: {
                type: 'boolean'
              }
            },
            required: ['has_restricting_provisions']
          },
          assets_ceased_released: {
            type: 'string'
          },
          more_than_four_persons_entitled: {
            type: 'boolean'
          }
        },
        required: [
          'charge_number',
          'classification',
          'created_on',
          'delivered_on',
          'etag',
          'links',
          'particulars',
          'persons_entitled',
          'status',
          'transactions'
        ],
        additionalProperties: false,
        title: 'getCharge',
        example: {
          charge_code: '092848280568',
          charge_number: 568,
          classification: {
            description: 'A registered charge',
            type: 'charge-description'
          },
          created_on: '2022-05-13',
          delivered_on: '2022-05-24',
          etag: 'f0449b37b7460b5d58a65849e756a4f64720d291',
          links: {
            self: '/company/09284828/charges/EMGXI7FXv34NdzmPVRyhd6HIFCs'
          },
          particulars: {
            description:
              '43 wootton drive, hemel hempstead, HP2 6LA. HD605623.',
            contains_negative_pledge: true,
            type: 'brief-description'
          },
          persons_entitled: [
            {
              name: 'Bank of London and the Middle East PLC'
            }
          ],
          status: 'outstanding',
          transactions: [
            {
              links: {
                filing:
                  '/company/09284828/filing-history/MzM0MDMwMjcwMWFkaXF6a2N4'
              },
              delivered_on: '2022-05-24',
              filing_type: 'create-charge-with-deed'
            }
          ]
        }
      }
    }
  }
} as const

export type GetChargesResponse = FromSchema<
  typeof GetChargesSchema['schema']['response']['200']
>
//export type GetChargesResponse = any // temporary until schemas can be fixed
