import { FromSchema } from 'json-schema-to-ts'

export interface ListStatementsParams {
  /** The company number of the persons with significant control statements list being requested. */
  company_number: string
}

export interface ListStatementsQueryString {
  /** The id of the legal person with significant control details being requested. */
  items_per_page: number
  /** The offset into the entire result set that this page starts. */
  start_index: number
  /** Display register specific information. If register is held at
Companies House and register_view is set to true, only statements which
are active or were withdrawn during election period are shown. Accepted
values are: -`true`  \n -`false`  \n Defaults to false.
 */
  register_view: undefined
}

export const ListStatementsSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        company_number: {
          type: 'string',
        },
      },
      required: ['company_number'],
    },
    querystring: {
      type: 'object',
      properties: {
        items_per_page: {
          type: 'integer',
        },
        start_index: {
          type: 'integer',
        },
        register_view: {},
      },
      required: ['items_per_page', 'start_index', 'register_view'],
    },
    response: {
      '200': {
        title: 'statementList',
        properties: {
          items_per_page: {
            description:
              'The number of persons with significant control statements to return per page.',
            type: 'integer',
          },
          items: {
            description:
              'The list of persons with significant control statements.',
            items: {
              title: 'statement',
              required: ['etag', 'kind', 'notified_on', 'statement', 'links'],
              properties: {
                etag: {
                  description: 'The ETag of the resource.',
                  type: 'string',
                },
                kind: {
                  enum: ['persons-with-significant-control-statement'],
                  type: 'string',
                },
                notified_on: {
                  description:
                    'The date that the person with significant control statement was processed by Companies House.',
                  type: 'string',
                  format: 'date',
                },
                ceased_on: {
                  description:
                    'The date that Companies House was notified about the cessation of this person with significant control.',
                  type: 'string',
                  format: 'date',
                },
                restrictions_notice_withdrawal_reason: {
                  description:
                    'The reason for the company withdrawing a <code>restrictions-notice-issued-to-psc</code> statement',
                  enum: [
                    'restrictions-notice-withdrawn-by-court-order',
                    'restrictions-notice-withdrawn-by-company',
                  ],
                  type: 'string',
                },
                statement: {
                  description:
                    'Indicates the type of statement filed.\n For enumeration descriptions see `statement_description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/psc_descriptions.yml) file. \n',
                  enum: [
                    'no-individual-or-entity-with-signficant-control',
                    'steps-to-find-psc-not-yet-completed',
                    'psc-exists-but-not-identified',
                    'psc-details-not-confirmed',
                    'psc-contacted-but-no-response',
                    'restrictions-notice-issued-to-psc',
                    'psc-has-failed-to-confirm-changed-details',
                  ],
                  type: 'string',
                },
                linked_psc_name: {
                  description: 'The name of the psc linked to this statement.',
                  type: 'string',
                },
                links: {
                  description:
                    'A set of URLs related to the resource, including self.',
                  items: {
                    title: 'statementLinksType',
                    required: ['self'],
                    properties: {
                      self: {
                        description: 'The URL of the resource.',
                        type: 'string',
                      },
                      person_with_significant_control: {
                        description:
                          'The URL of the person with significant control linked to this statement.',
                        type: 'string',
                      },
                    },
                  },
                  type: 'object',
                },
              },
            },
            type: 'object',
          },
          start_index: {
            description:
              'The offset into the entire result set that this page starts.',
            type: 'integer',
          },
          total_results: {
            description:
              'The total number of persons with significant control statements in this result set.',
            type: 'integer',
          },
          active_count: {
            description:
              'The number of active persons with significant control statements in this result set.',
            type: 'integer',
          },
          ceased_count: {
            description:
              'The number of ceased persons with significant control statements in this result set.',
            type: 'integer',
          },
          links: {
            description:
              'A set of URLs related to the resource, including self.',
            items: {
              title: 'statementListLinksType',
              required: ['self'],
              properties: {
                self: {
                  description: 'The URL of the resource.',
                  type: 'string',
                },
                persons_with_significant_control_statements_list: {
                  description:
                    'The URL of the persons with significant control statements list resource.',
                  type: 'string',
                },
              },
            },
            type: 'object',
          },
        },
        required: [
          'items_per_page',
          'items',
          'start_index',
          'total_results',
          'active_count',
          'ceased_count',
          'links',
        ],
      },
    },
  },
} as const

export type ListStatementsResponse = FromSchema<
  typeof ListStatementsSchema['schema']['response']['200']
>
//export type ListStatementsResponse = any // temporary until schemas can be fixed
