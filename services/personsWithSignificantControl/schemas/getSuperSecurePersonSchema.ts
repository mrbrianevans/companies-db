import { FromSchema } from 'json-schema-to-ts'

export interface GetSuperSecurePersonParams {
  /** The company number of the super secure person with significant control details being requested. */
  company_number: string
  /** The id of the super secure person with significant control details being requested. */
  super_secure_id: string
}

export interface GetSuperSecurePersonQueryString {}

export const GetSuperSecurePersonSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        company_number: {
          type: 'string'
        },
        super_secure_id: {
          type: 'string'
        }
      },
      required: ['company_number', 'super_secure_id']
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
          description: {
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
          }
        },
        required: ['description', 'etag', 'kind', 'links'],
        additionalProperties: false,
        title: 'getPersonsWithSignificantControlSuperSecure',
        example: {
          description: 'super-secure-persons-with-significant-control',
          etag: '71519abc34634304d42ef2720a4ed0a432e28d96',
          kind: 'super-secure-person-with-significant-control',
          links: {
            self: '/company/OC418501/persons-with-significant-control/super-secure/hsp93JPzJLp3FHQiu0kZ040-jqk'
          }
        }
      }
    }
  }
} as const

export type GetSuperSecurePersonResponse = FromSchema<
  typeof GetSuperSecurePersonSchema['schema']['response']['200']
>
//export type GetSuperSecurePersonResponse = any // temporary until schemas can be fixed
