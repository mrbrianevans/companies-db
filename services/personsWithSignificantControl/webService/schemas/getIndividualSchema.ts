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
              premises: {
                type: 'string'
              },
              region: {
                type: 'string'
              },
              postal_code: {
                type: 'string'
              },
              country: {
                type: 'string'
              },
              locality: {
                type: 'string'
              },
              address_line_1: {
                type: 'string'
              },
              address_line_2: {
                type: 'string'
              },
              po_box: {
                type: 'string'
              },
              care_of: {
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
              },
              day: {
                description: 'The day of the date of birth.',
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
          name_elements: {
            type: 'object',
            properties: {
              middle_name: {
                type: 'string'
              },
              surname: {
                type: 'string'
              },
              title: {
                type: 'string'
              },
              forename: {
                type: 'string'
              },
              other_forenames: {
                description:
                  'Other forenames of the person with significant control.',
                type: 'string'
              }
            },
            required: ['surname']
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
        title: 'getIndividual',
        example: {
          address: {
            premises: '14 Broad Acres',
            region: 'Hertfordshire',
            postal_code: 'AL10 9LD',
            country: 'England',
            locality: 'Hatfield'
          },
          country_of_residence: 'England',
          date_of_birth: {
            month: 3,
            year: 1980
          },
          etag: '585f0033128d445423565ef6119366f38299d73e',
          kind: 'individual-person-with-significant-control',
          links: {
            self: '/company/09454270/persons-with-significant-control/individual/yTVnaEeES8-Ar9U0mLOtefLnuaQ'
          },
          name: 'Mr Laga Leyira Wiwuga',
          name_elements: {
            middle_name: 'Leyira',
            surname: 'Wiwuga',
            title: 'Mr',
            forename: 'Laga'
          },
          nationality: 'British',
          natures_of_control: [
            'ownership-of-shares-75-to-100-percent',
            'voting-rights-75-to-100-percent'
          ],
          notified_on: '2016-04-06'
        }
      }
    }
  }
} as const

export type GetIndividualResponse = FromSchema<
  typeof GetIndividualSchema['schema']['response']['200']
>
//export type GetIndividualResponse = any // temporary until schemas can be fixed
