import { FromSchema } from 'json-schema-to-ts'

export interface GetLegalPersonsParams {
  /** The company number of the legal person with significant control details being requested. */
  company_number: string
  /** The id of the legal person with significant control details being requested. */
  psc_id: string
}

export interface GetLegalPersonsQueryString {}

export const GetLegalPersonsSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        company_number: {
          type: 'string'
        },
        psc_id: {
          type: 'string'
        }
      },
      required: ['company_number', 'psc_id']
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
          address: {
            type: 'object',
            properties: {
              locality: {
                type: 'string'
              },
              postal_code: {
                type: 'string'
              },
              premises: {
                type: 'string'
              },
              country: {
                type: 'string'
              },
              address_line_1: {
                type: 'string'
              },
              region: {
                type: 'string'
              },
              address_line_2: {
                type: 'string'
              }
            },
            required: ['locality', 'premises']
          },
          etag: {
            type: 'string'
          },
          identification: {
            type: 'object',
            properties: {
              legal_authority: {
                type: 'string'
              },
              legal_form: {
                type: 'string'
              }
            },
            required: ['legal_authority', 'legal_form']
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
          },
          natures_of_control: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          notified_on: {
            type: 'string'
          },
          ceased_on: {
            type: 'string'
          }
        },
        required: [
          'address',
          'etag',
          'identification',
          'kind',
          'links',
          'name',
          'natures_of_control',
          'notified_on'
        ],
        additionalProperties: false,
        title: 'getPersonWithSignificantControlLegal',
        example: {
          address: {
            locality: 'London',
            postal_code: 'NW7 3TD',
            premises: 'Athene House, Suite Q',
            country: 'United Kingdom',
            address_line_1: '86 The Broadway'
          },
          etag: '63f99bcd12bc08cb1600bbda3ea24f07b56c7430',
          identification: {
            legal_authority: 'England & Wales',
            legal_form: 'Limited'
          },
          kind: 'legal-person-person-with-significant-control',
          links: {
            self: '/company/14057310/persons-with-significant-control/legal-person/2kNo5j4tFSkn4WfnKaO5VZXphXw'
          },
          name: 'Qa Directors Limited',
          natures_of_control: [
            'ownership-of-shares-75-to-100-percent',
            'voting-rights-75-to-100-percent',
            'right-to-appoint-and-remove-directors'
          ],
          notified_on: '2022-04-20'
        }
      }
    }
  }
} as const

export type GetLegalPersonsResponse = FromSchema<
  typeof GetLegalPersonsSchema['schema']['response']['200']
>
//export type GetLegalPersonsResponse = any // temporary until schemas can be fixed
