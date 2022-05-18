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
          type: 'string',
        },
        statement_id: {
          type: 'string',
        },
      },
      required: ['company_number', 'statement_id'],
    },
    querystring: {
      type: 'object',
      properties: {},
      required: [],
    },
    response: {
      '200': {
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
              type: 'object',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
    },
  },
} as const

// export type GetStatementResponse = FromSchema<typeof GetStatementSchema['schema']['response']['200']>
export type GetStatementResponse = any // temporary until schemas can be fixed
