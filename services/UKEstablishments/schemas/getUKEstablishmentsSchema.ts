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
          type: 'string',
        },
      },
      required: ['company_number'],
    },
    querystring: {
      type: 'object',
      properties: {},
      required: [],
    },
    response: {
      '200': {
        title: 'companyUKEstablishments',
        required: ['etag', 'kind', 'items'],
        properties: {
          etag: {
            type: 'string',
            description: 'The ETag of the resource.',
          },
          kind: {
            type: 'string',
            description: 'UK Establishment companies.',
            enum: ['ukestablishment-companies'],
          },
          links: {
            type: 'array',
            description: 'UK Establishment Resources related to this company.',
            items: {
              title: 'self_links',
              required: ['self'],
              properties: {
                self: {
                  type: 'string',
                  description: 'Link to this company.',
                },
              },
              type: 'object',
            },
          },
          items: {
            type: 'array',
            description: 'List of UK Establishment companies.',
            items: {
              title: 'companyDetails',
              required: [
                'company_number',
                'company_name',
                'company_status',
                'links',
              ],
              properties: {
                company_number: {
                  type: 'string',
                  description: 'The number of the company.',
                },
                company_name: {
                  type: 'string',
                  description: 'The name of the company.',
                },
                company_status: {
                  type: 'string',
                  description: 'Company status.',
                },
                locality: {
                  type: 'string',
                  description: 'The locality e.g London.',
                },
                links: {
                  description: 'Resources related to this company.',
                  type: 'array',
                  items: {
                    title: 'links',
                    required: ['company'],
                    properties: {
                      company: {
                        type: 'string',
                        description: 'The link to the company.',
                      },
                    },
                    type: 'object',
                  },
                },
              },
              type: 'object',
            },
          },
          type: 'array',
        },
        type: 'object',
      },
    },
  },
} as const

// export type GetUKEstablishmentsResponse = FromSchema<typeof GetUKEstablishmentsSchema['schema']['response']['200']>
export type GetUKEstablishmentsResponse = any // temporary until schemas can be fixed
