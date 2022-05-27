import { FromSchema } from 'json-schema-to-ts'

export interface GetCorporateEntitiesParams {
  /** The company number of the corporate entity with significant control details being requested. */
  company_number: string
  /** The id of the corporate entity with significant control details being requested. */
  psc_id: string
}

export interface GetCorporateEntitiesQueryString {}

export const GetCorporateEntitiesSchema = {
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
              postal_code: {
                type: 'string'
              },
              locality: {
                type: 'string'
              },
              premises: {
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
              },
              po_box: {
                type: 'string'
              },
              care_of: {
                description: 'Care of name.',
                type: 'string'
              }
            }
          },
          ceased_on: {
            type: 'string'
          },
          etag: {
            type: 'string'
          },
          identification: {
            type: 'object',
            properties: {
              legal_form: {
                type: 'string'
              },
              place_registered: {
                type: 'string'
              },
              legal_authority: {
                type: 'string'
              },
              country_registered: {
                type: 'string'
              },
              registration_number: {
                type: 'string'
              }
            },
            required: ['legal_form', 'legal_authority']
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
        title: 'getCorporateEntities',
        example: {
          address: {
            country: 'United Kingdom',
            postal_code: 'N12 0DR',
            locality: 'London',
            premises: 'Winnington House',
            address_line_1: '2 Woodberry Grove'
          },
          ceased_on: '2020-07-06',
          etag: '67b51cedbaa227a7ebbc7dbfd7edb16934342091',
          identification: {
            legal_form: 'Limited By Shares',
            place_registered: 'Companies House',
            legal_authority: 'England',
            country_registered: 'England',
            registration_number: '07168188'
          },
          kind: 'corporate-entity-person-with-significant-control',
          links: {
            self: '/company/08888819/persons-with-significant-control/corporate-entity/c7EGmbxSnWjD-jN-Mhr1cUDNGYA'
          },
          name: 'Woodberry Secretarial Limited',
          natures_of_control: [
            'ownership-of-shares-75-to-100-percent',
            'voting-rights-75-to-100-percent',
            'right-to-appoint-and-remove-directors'
          ],
          notified_on: '2016-04-06'
        }
      }
    }
  }
} as const

export type GetCorporateEntitiesResponse = FromSchema<
  typeof GetCorporateEntitiesSchema['schema']['response']['200']
>
//export type GetCorporateEntitiesResponse = any // temporary until schemas can be fixed
