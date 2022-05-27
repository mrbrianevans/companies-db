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
                  anyOf: [
                    {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          company: {
                            type: 'string',
                            description: 'The link to the company.'
                          }
                        },
                        required: ['company']
                      }
                    },
                    {
                      type: 'object',
                      properties: {
                        company: {
                          type: 'string'
                        }
                      },
                      required: ['company']
                    }
                  ]
                },
                locality: {
                  type: 'string'
                },
                company_number: {
                  type: 'string'
                },
                company_name: {
                  type: 'string'
                },
                company_status: {
                  type: 'string'
                }
              },
              required: [
                'links',
                'company_number',
                'company_name',
                'company_status'
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
        required: ['etag', 'items', 'kind'],
        additionalProperties: false,
        title: 'getUKEstablishments',
        example: {
          etag: 'e107f7caacf1efb5019ac55144b1f8d0568a0f10',
          items: [
            {
              links: {
                company: '/company/BR023799'
              },
              locality: 'Farnham',
              company_number: 'BR023799',
              company_name: 'UPPER FROYLE PROPERTY INVESTMENTS LIMITED',
              company_status: 'open'
            }
          ],
          kind: 'related-companies',
          links: {
            self: '/company/FC038704'
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
