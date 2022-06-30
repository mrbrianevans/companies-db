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
          address_line_2: {
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
          po_box: {
            type: 'string'
          },
          premises: {
            type: 'string',
            description: 'The property name or number.'
          }
        },
        additionalProperties: false,
        title: 'getRegisteredOfficeAddress',
        example: {
          address_line_1: '8th Floor (West Wing)',
          address_line_2: '54 Hagley Road',
          country: 'United Kingdom',
          etag: 'a914a2ce96e25f11b96d05632be6426e1578ec64',
          kind: 'registered-office-address',
          links: {
            self: '/company/13612247/registered-office-address'
          },
          locality: 'Edgbaston',
          postal_code: 'B16 8PE',
          region: 'Birmingham'
        }
      }
    }
  }
} as const

export type GetRegisteredOfficeAddressResponse = FromSchema<
  typeof GetRegisteredOfficeAddressSchema['schema']['response']['200']
>
//export type GetRegisteredOfficeAddressResponse = any // temporary until schemas can be fixed
