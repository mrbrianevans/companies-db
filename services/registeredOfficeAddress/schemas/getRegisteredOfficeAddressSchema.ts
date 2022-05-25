import { FromSchema } from 'json-schema-to-ts'

export interface GetRegisteredOfficeAddressParams {
  /** Company number for registered office address */
  company_number: string
}

export interface GetRegisteredOfficeAddressQueryString {}

export const GetRegisteredOfficeAddressSchema = {
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
          address_line_1: {
            type: 'string'
          },
          country: {
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
              }
            },
            required: ['self']
          },
          locality: {
            type: 'string'
          },
          postal_code: {
            type: 'string'
          },
          region: {
            type: 'string'
          },
          address_line_2: {
            type: 'string'
          },
          po_box: {
            type: 'string'
          }
        },
        required: ['etag', 'kind', 'links'],
        additionalProperties: false,
        title: 'getRegisteredOfficeAddress',
        example: {
          address_line_1: '29a High Street',
          country: 'England',
          etag: 'd932765332d66741b03f7bd9db5d9cf5f4286642',
          kind: 'registered-office-address',
          links: {
            self: '/company/14057702/registered-office-address'
          },
          locality: 'Banstead',
          postal_code: 'SM7 2NH',
          region: 'Surrey'
        }
      }
    }
  }
} as const

export type GetRegisteredOfficeAddressResponse = FromSchema<
  typeof GetRegisteredOfficeAddressSchema['schema']['response']['200']
>
//export type GetRegisteredOfficeAddressResponse = any // temporary until schemas can be fixed
