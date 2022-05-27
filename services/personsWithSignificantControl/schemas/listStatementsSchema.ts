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
                kind: {
                  type: 'string'
                },
                etag: {
                  type: 'string'
                },
                notified_on: {
                  type: 'string'
                },
                statement: {
                  type: 'string'
                },
                links: {
                  type: 'object',
                  properties: {
                    self: {
                      type: 'string'
                    },
                    person_with_significant_control: {
                      description:
                        'The URL of the person with significant control linked to this statement.',
                      type: 'string'
                    }
                  },
                  required: ['self']
                },
                ceased_on: {
                  type: 'string'
                },
                restrictions_notice_withdrawal_reason: {
                  description:
                    'The reason for the company withdrawing a <code>restrictions-notice-issued-to-psc</code> statement',
                  enum: [
                    'restrictions-notice-withdrawn-by-court-order',
                    'restrictions-notice-withdrawn-by-company'
                  ],
                  type: 'string'
                },
                linked_psc_name: {
                  description: 'The name of the psc linked to this statement.',
                  type: 'string'
                }
              },
              required: ['kind', 'etag', 'notified_on', 'statement', 'links']
            }
          },
          items_per_page: {
            type: 'integer'
          },
          links: {
            type: 'object',
            properties: {
              self: {
                type: 'string'
              },
              persons_with_significant_control: {
                type: 'string'
              },
              persons_with_significant_control_statements_list: {
                description:
                  'The URL of the persons with significant control statements list resource.',
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
        title: 'listStatements',
        example: {
          active_count: 1,
          ceased_count: 0,
          items: [
            {
              kind: 'persons-with-significant-control-statement',
              etag: '5493058979a9265cd855efb03706833c439b6542',
              notified_on: '2017-06-30',
              statement: 'no-individual-or-entity-with-signficant-control',
              links: {
                self: '/company/10843053/persons-with-significant-control-statements/JwBAymT3-nexdr9HQdEaVXlTEUY'
              }
            }
          ],
          items_per_page: 25,
          links: {
            self: '/company/10843053/persons-with-significant-control-statements'
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
