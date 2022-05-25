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
          notified_on: {
            type: 'string'
          },
          statement: {
            type: 'string'
          },
          ceased_on: {
            type: 'string'
          }
        },
        required: ['etag', 'kind', 'links', 'notified_on', 'statement'],
        additionalProperties: false,
        title: 'getPersonsWithSignificantControlStatement',
        example: {
          etag: '628debfa978bce7728190507ad12f08cbd247f7c',
          kind: 'persons-with-significant-control-statement',
          links: {
            self: '/company/11206460/persons-with-significant-control-statements/i42dMhzIfCQBO8XjRpRH9i76u0Y'
          },
          notified_on: '2018-02-14',
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
