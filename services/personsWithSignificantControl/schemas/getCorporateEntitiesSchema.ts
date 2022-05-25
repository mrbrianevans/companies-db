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
              locality: {
                type: 'string'
              },
              premises: {
                type: 'string'
              },
              country: {
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
              region: {
                type: 'string'
              },
              po_box: {
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
              legal_form: {
                type: 'string'
              },
              legal_authority: {
                type: 'string'
              },
              place_registered: {
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
        title: 'getPersonWithSignificantControlCorporate',
        example: {
          address: {
            locality: 'London',
            premises: '2',
            country: 'United Kingdom',
            postal_code: 'EC3R 7PD',
            address_line_1: 'Minster Court',
            address_line_2: 'Mincing Lane'
          },
          etag: '5f4f9cc06849e26ca46628f85f3db8a5db6af386',
          identification: {
            legal_form: 'Private Limited Company',
            legal_authority: 'Companies Act 2006'
          },
          kind: 'corporate-entity-person-with-significant-control',
          links: {
            self: '/company/10735116/persons-with-significant-control/corporate-entity/mnfMD38W4O5vKK9tjos-uyd5bXc'
          },
          name: 'Ardonagh Midco 2 Plc',
          natures_of_control: [
            'ownership-of-shares-75-to-100-percent',
            'voting-rights-75-to-100-percent',
            'right-to-appoint-and-remove-directors'
          ],
          notified_on: '2017-04-21'
        }
      }
    }
  }
} as const

export type GetCorporateEntitiesResponse = FromSchema<
  typeof GetCorporateEntitiesSchema['schema']['response']['200']
>
//export type GetCorporateEntitiesResponse = any // temporary until schemas can be fixed
