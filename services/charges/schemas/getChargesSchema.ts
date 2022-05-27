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
              contains_fixed_charge: {
                type: 'boolean'
              },
              contains_floating_charge: {
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
                    },
                    insolvency_case: {
                      type: 'string',
                      description:
                        'Link to the insolvency case related to this filing'
                    }
                  }
                },
                delivered_on: {
                  type: 'string'
                },
                filing_type: {
                  type: 'string'
                },
                transaction_id: {
                  type: 'integer',
                  description: 'The id of the filing'
                },
                insolvency_case_number: {
                  type: 'integer',
                  description: 'The insolvency case related to this filing'
                }
              }
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
          assets_ceased_released: {
            type: 'string'
          },
          scottish_alterations: {
            type: 'object',
            properties: {
              has_restricting_provisions: {
                type: 'boolean'
              },
              type: {
                type: 'string'
              },
              description: {
                type: 'string'
              },
              has_alterations_to_order: {
                type: 'boolean',
                description: 'The charge has alterations to order'
              },
              has_alterations_to_prohibitions: {
                type: 'boolean',
                description: 'The charge has alterations to prohibitions'
              },
              has_alterations_to_provisions: {
                type: 'boolean',
                description:
                  'The charge has provisions restricting the creation of further charges'
              }
            }
          },
          more_than_four_persons_entitled: {
            type: 'boolean'
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
          acquired_on: {
            type: 'string',
            format: 'date',
            description: 'The date the property or undertaking was acquired on'
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
          insolvency_cases: {
            type: 'array',
            description: 'Transactions that have been filed for the charge.',
            items: {
              title: 'insolvency_cases',
              properties: {
                case_number: {
                  type: 'integer',
                  description: 'The number of this insolvency case'
                },
                transaction_id: {
                  type: 'integer',
                  description: 'The id of the insolvency filing'
                },
                links: {
                  type: 'object',
                  description: 'The resources related to this insolvency case',
                  title: 'insolvency_case_links',
                  properties: {
                    case: {
                      type: 'string',
                      description: 'Link to the insolvency case data'
                    }
                  }
                }
              },
              type: 'object'
            }
          }
        },
        required: ['charge_number', 'classification', 'etag', 'status'],
        additionalProperties: false,
        title: 'getCharges',
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
