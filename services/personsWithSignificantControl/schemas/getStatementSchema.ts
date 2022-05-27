import { FromSchema } from 'json-schema-to-ts'

export interface GetStatementParams {
  /** The company number of the persons with significant control statements list being requested. */
  company_number: string
  /** The id of the person with significant control statement details being requested. */
  statement_id: string
}

export interface GetStatementQueryString {}

export const GetStatementSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        company_number: {
          type: 'string'
        },
        statement_id: {
          type: 'string'
        }
      },
      required: ['company_number', 'statement_id']
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
          ceased_on: {
            type: 'string'
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
              person_with_significant_control: {
                description:
                  'The URL of the person with significant control linked to this statement.',
                type: 'string'
              }
            },
            required: ['self']
          },
          notified_on: {
            type: 'string'
          },
          statement: {
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
        required: ['etag', 'kind', 'links', 'notified_on', 'statement'],
        additionalProperties: false,
        title: 'getStatement',
        example: {
          ceased_on: '2021-11-08',
          etag: '3f359cc57b46e2062a678196b8408e1b60b92d60',
          kind: 'persons-with-significant-control-statement',
          links: {
            self: '/company/08162785/persons-with-significant-control-statements/8N8QcP_qKb7tJT7skvkO_hxRMEk'
          },
          notified_on: '2016-07-31',
          statement: 'no-individual-or-entity-with-signficant-control'
        }
      }
    }
  }
} as const

export type GetStatementResponse = FromSchema<
  typeof GetStatementSchema['schema']['response']['200']
>
//export type GetStatementResponse = any // temporary until schemas can be fixed
