import { FromSchema } from 'json-schema-to-ts'

export interface GetUKEstablishmentsParams {
  /** Company number */
  company_number: string
}

export interface GetUKEstablishmentsQueryString {}

export const GetUKEstablishmentsSchema = {
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
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                links: {
                  type: 'object',
                  properties: {
                    company: {
                      type: 'string'
                    }
                  },
                  required: ['company']
                },
                company_status: {
                  type: 'string'
                },
                company_number: {
                  type: 'string'
                },
                locality: {
                  type: 'string'
                },
                company_name: {
                  type: 'string'
                }
              },
              required: [
                'links',
                'company_status',
                'company_number',
                'locality',
                'company_name'
              ]
            }
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
          }
        },
        required: ['etag', 'items', 'kind', 'links'],
        additionalProperties: false,
        title: 'listUkEstablishments',
        example: {
          etag: '8ad9b7f6dc0c0d0f2fcb8ab6a41db35ccedce243',
          items: [
            {
              links: {
                company: '/company/BR023780'
              },
              company_status: 'open',
              company_number: 'BR023780',
              locality: 'London',
              company_name: 'LINCOLN MIDCO PTE. LIMITED'
            }
          ],
          kind: 'related-companies',
          links: {
            self: '/company/FC038685'
          }
        }
      }
    }
  }
} as const

export type GetUKEstablishmentsResponse = FromSchema<
  typeof GetUKEstablishmentsSchema['schema']['response']['200']
>
//export type GetUKEstablishmentsResponse = any // temporary until schemas can be fixed
