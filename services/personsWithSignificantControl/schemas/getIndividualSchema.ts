import { FromSchema } from 'json-schema-to-ts'

export interface GetIndividualParams {
  /** The company number of the person with significant control details being requested. */
  company_number: string
  /** The id of the person with significant control details being requested. */
  psc_id: string
}

export interface GetIndividualQueryString {}

export const GetIndividualSchema = {
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
              country: {
                type: 'string'
              },
              premises: {
                type: 'string'
              },
              region: {
                type: 'string'
              },
              locality: {
                type: 'string'
              },
              postal_code: {
                type: 'string'
              },
              address_line_1: {
                type: 'string'
              },
              address_line_2: {
                type: 'string'
              },
              care_of: {
                type: 'string'
              },
              po_box: {
                type: 'string'
              }
            }
          },
          country_of_residence: {
            type: 'string'
          },
          date_of_birth: {
            type: 'object',
            properties: {
              month: {
                type: 'integer'
              },
              year: {
                type: 'integer'
              }
            },
            required: ['month', 'year']
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
          },
          name_elements: {
            type: 'object',
            properties: {
              title: {
                type: 'string'
              },
              middle_name: {
                type: 'string'
              },
              surname: {
                type: 'string'
              },
              forename: {
                type: 'string'
              }
            },
            required: ['surname', 'forename']
          },
          nationality: {
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
          'country_of_residence',
          'date_of_birth',
          'etag',
          'kind',
          'links',
          'name',
          'name_elements',
          'nationality',
          'natures_of_control',
          'notified_on'
        ],
        additionalProperties: false,
        title: 'getPersonWithSignificantControlIndividual',
        example: {
          address: {
            country: 'United Kingdom',
            premises: '42 Glebe Street',
            region: 'Leicestershire',
            locality: 'Loughborough',
            postal_code: 'LE11 1JR'
          },
          country_of_residence: 'United Kingdom',
          date_of_birth: {
            month: 3,
            year: 1967
          },
          etag: '814acb77d25049624b14c0fa88af7d09fcbf7e39',
          kind: 'individual-person-with-significant-control',
          links: {
            self: '/company/11370252/persons-with-significant-control/individual/tw_J6Owb0RS9lglUle6hoxVwAqI'
          },
          name: 'Mr Richard Anthony Smith',
          name_elements: {
            title: 'Mr',
            middle_name: 'Anthony',
            surname: 'Smith',
            forename: 'Richard'
          },
          nationality: 'British',
          natures_of_control: ['ownership-of-shares-75-to-100-percent'],
          notified_on: '2018-05-18'
        }
      }
    }
  }
} as const

export type GetIndividualResponse = FromSchema<
  typeof GetIndividualSchema['schema']['response']['200']
>
//export type GetIndividualResponse = any // temporary until schemas can be fixed
