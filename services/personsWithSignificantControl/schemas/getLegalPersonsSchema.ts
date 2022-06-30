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
              postal_code: {
                type: 'string'
              },
              locality: {
                type: 'string'
              },
              address_line_1: {
                type: 'string'
              },
              premises: {
                type: 'string'
              },
              country: {
                type: 'string'
              },
              region: {
                type: 'string'
              },
              address_line_2: {
                type: 'string'
              },
              care_of: {
                description: 'Care of name.',
                type: 'string'
              },
              po_box: {
                description: 'The post-officer box number.',
                type: 'string'
              }
            },
            required: ['premises']
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
              },
              statement: {
                description:
                  'The URL of the statement linked to this person with significant control.',
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
        title: 'getLegalPersons',
        example: {
          address: {
            postal_code: 'NW7 3TD',
            locality: 'London',
            address_line_1: '86 The Broadway',
            premises: 'Athene House, Suite Q',
            country: 'United Kingdom'
          },
          etag: '60b7226f0b145e0f2b3800bfe5e76a2da64dc15b',
          identification: {
            legal_authority: 'England & Wales',
            legal_form: 'Limited'
          },
          kind: 'legal-person-person-with-significant-control',
          links: {
            self: '/company/13698056/persons-with-significant-control/legal-person/jYbWLJ4XfiUzSp4_lbgGz9mIWvE'
          },
          name: 'Qa Directors Limited',
          natures_of_control: [
            'ownership-of-shares-75-to-100-percent',
            'voting-rights-75-to-100-percent',
            'right-to-appoint-and-remove-directors'
          ],
          notified_on: '2021-10-22'
        }
      }
    }
  }
} as const

export type GetLegalPersonsResponse = FromSchema<
  typeof GetLegalPersonsSchema['schema']['response']['200']
>
//export type GetLegalPersonsResponse = any // temporary until schemas can be fixed
