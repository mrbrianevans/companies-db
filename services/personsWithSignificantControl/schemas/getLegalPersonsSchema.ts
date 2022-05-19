import { FromSchema } from 'json-schema-to-ts'

export interface GetLegalPersonsParams {
  /** The company number of the legal person with significant control details being requested. */
  company_number: string
  /** The id of the legal person with significant control details being requested. */
  psc_id: string
}

export interface GetLegalPersonsQueryString {}

export const GetLegalPersonsSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        company_number: {
          type: 'string'
        },
        psc_id: {
          type: 'string'
        }
      },
      required: ['company_number', 'psc_id']
    },
    querystring: {
      type: 'object',
      properties: {},
      required: []
    },
    response: {
      '200': {
        title: 'legalPerson',
        required: [
          'etag',
          'notified_on',
          'kind',
          'name',
          'links',
          'address',
          'identification',
          'natures_of_control'
        ],
        properties: {
          etag: {
            description: 'The ETag of the resource.',
            type: 'string'
          },
          notified_on: {
            description:
              'The date that Companies House was notified about this person with significant control.',
            type: 'string',
            format: 'date'
          },
          ceased_on: {
            description:
              'The date that Companies House was notified about the cessation of this person with significant control.',
            type: 'string',
            format: 'date'
          },
          kind: {
            enum: ['legal-person-person-with-significant-control'],
            type: 'string'
          },
          name: {
            description: 'Name of the person with significant control.',
            type: 'string'
          },
          links: {
            description:
              'A set of URLs related to the resource, including self.',
            type: 'object',
            title: 'pscLinksType',
            required: ['self'],
            properties: {
              self: {
                description: 'The URL of the resource.',
                type: 'string'
              },
              statement: {
                description:
                  'The URL of the statement linked to this person with significant control.',
                type: 'string'
              }
            }
          },
          address: {
            description: 'The address of the person with significant control.',
            type: 'object',
            title: 'pscAddress',
            required: ['address_line_1', 'postal_code', 'premises'],
            properties: {
              address_line_1: {
                description: 'The first line of the address.',
                type: 'string'
              },
              address_line_2: {
                description: 'The second line of the address.',
                type: 'string'
              },
              care_of: {
                description: 'Care of name.',
                type: 'string'
              },
              country: {
                description: 'The country. For example, UK.',
                type: 'string'
              },
              locality: {
                description: 'The locality. For example London.',
                type: 'string'
              },
              po_box: {
                description: 'The post-officer box number.',
                type: 'string'
              },
              postal_code: {
                description: 'The postal code. For example CF14 3UZ.',
                type: 'string'
              },
              premises: {
                description: 'The property name or number.',
                type: 'string'
              },
              region: {
                description: 'The region. For example Surrey.',
                type: 'string'
              }
            }
          },
          identification: {
            description: '',
            type: 'object',
            title: 'legalPersonIdent',
            properties: {
              legal_authority: {
                description:
                  'The legal authority supervising the legal person with significant control.',
                type: 'string'
              },
              legal_form: {
                description:
                  'The legal form of the legal person with significant control as defined by its country of registration.',
                type: 'string'
              }
            },
            required: ['legal_authority', 'legal_form']
          },
          natures_of_control: {
            description:
              'Indicates the nature of control the person with significant control holds.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/psc_descriptions.yml) file. \n',
            type: 'array'
          }
        },
        type: 'object'
      }
    }
  }
} as const

export type GetLegalPersonsResponse = FromSchema<
  typeof GetLegalPersonsSchema['schema']['response']['200']
>
//export type GetLegalPersonsResponse = any // temporary until schemas can be fixed
