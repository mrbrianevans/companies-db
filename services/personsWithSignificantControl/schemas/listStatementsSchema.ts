import { FromSchema } from 'json-schema-to-ts'

export interface ListStatementsParams {
  /** The company number of the persons with significant control statements list being requested. */
  company_number: string
}

export interface ListStatementsQueryString {
  /** The id of the legal person with significant control details being requested. */
  items_per_page?: number
  /** The offset into the entire result set that this page starts. */
  start_index?: number
  /** Display register specific information. If register is held at
Companies House and register_view is set to true, only statements which
are active or were withdrawn during election period are shown. Accepted
values are: -`true`  \n -`false`  \n Defaults to false.
 */
  register_view?: undefined
}

export const ListStatementsSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        company_number: {
          type: 'string'
        }
      },
      required: ['company_number']
    },
    querystring: {
      type: 'object',
      properties: {
        items_per_page: {
          type: 'integer'
        },
        start_index: {
          type: 'integer'
        },
        register_view: {}
      },
      required: []
    },
    response: {
      '200': {
        type: 'object',
        properties: {
          active_count: {
            type: 'integer'
          },
          ceased_count: {
            type: 'integer'
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                links: {
                  type: 'object',
                  properties: {
                    self: {
                      type: 'string'
                    }
                  },
                  required: ['self']
                },
                statement: {
                  type: 'string'
                },
                notified_on: {
                  type: 'string'
                },
                etag: {
                  type: 'string'
                },
                kind: {
                  type: 'string'
                },
                ceased_on: {
                  type: 'string'
                }
              },
              required: ['links', 'statement', 'notified_on', 'etag', 'kind']
            }
          },
          items_per_page: {
            type: 'integer'
          },
          links: {
            type: 'object',
            properties: {
              persons_with_significant_control: {
                type: 'string'
              },
              self: {
                type: 'string'
              }
            },
            required: ['self']
          },
          start_index: {
            type: 'integer'
          },
          total_results: {
            type: 'integer'
          }
        },
        required: [
          'active_count',
          'ceased_count',
          'items',
          'items_per_page',
          'links',
          'start_index',
          'total_results'
        ],
        additionalProperties: false,
        title: 'listPersonsWithSignificantControlStatements',
        example: {
          active_count: 0,
          ceased_count: 1,
          items: [
            {
              links: {
                self: '/company/OC401231/persons-with-significant-control-statements/J3aA7nNxlxiLA_SN3OC_f46soBA'
              },
              statement: 'psc-details-not-confirmed',
              notified_on: '2016-08-10',
              etag: '1378b459e7084aa462031cc68d93fb6462f212ee',
              kind: 'persons-with-significant-control-statement',
              ceased_on: '2017-08-17'
            }
          ],
          items_per_page: 25,
          links: {
            persons_with_significant_control:
              '/company/OC401231/persons-with-significant-control',
            self: '/company/OC401231/persons-with-significant-control-statements'
          },
          start_index: 0,
          total_results: 1
        }
      }
    }
  }
} as const

export type ListStatementsResponse = FromSchema<
  typeof ListStatementsSchema['schema']['response']['200']
>
//export type ListStatementsResponse = any // temporary until schemas can be fixed
