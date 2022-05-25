import { FromSchema } from 'json-schema-to-ts'

export interface GetOfficersParams {
  /** The company number of the officer list being requested. */
  company_number: string
  /** The appointment id of the company officer appointment being requested. */
  appointment_id: string
}

export interface GetOfficersQueryString {}

export const GetOfficersSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        company_number: {
          type: 'string'
        },
        appointment_id: {
          type: 'string'
        }
      },
      required: ['company_number', 'appointment_id']
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
          address: {
            type: 'object',
            properties: {
              address_line_1: {
                type: 'string'
              },
              country: {
                type: 'string'
              },
              locality: {
                type: 'string'
              },
              postal_code: {
                type: 'string'
              },
              premises: {
                type: 'string'
              },
              region: {
                type: 'string'
              },
              address_line_2: {
                type: 'string'
              },
              care_of: {
                type: 'string'
              },
              po_box: {
                type: 'string'
              }
            }
          },
          appointed_on: {
            type: 'string'
          },
          country_of_residence: {
            type: 'string'
          },
          date_of_birth: {
            type: 'object',
            properties: {
              month: {
                type: 'integer'
              },
              year: {
                type: 'integer'
              }
            },
            required: ['month', 'year']
          },
          links: {
            type: 'object',
            properties: {
              self: {
                type: 'string'
              },
              officer: {
                type: 'object',
                properties: {
                  appointments: {
                    type: 'string'
                  }
                },
                required: ['appointments']
              }
            },
            required: ['self', 'officer']
          },
          name: {
            type: 'string'
          },
          nationality: {
            type: 'string'
          },
          occupation: {
            type: 'string'
          },
          officer_role: {
            type: 'string'
          },
          resigned_on: {
            type: 'string'
          },
          identification: {
            type: 'object',
            properties: {
              identification_type: {
                type: 'string'
              },
              legal_authority: {
                type: 'string'
              },
              legal_form: {
                type: 'string'
              },
              place_registered: {
                type: 'string'
              },
              registration_number: {
                type: 'string'
              }
            },
            required: ['identification_type']
          },
          former_names: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                surname: {
                  type: 'string'
                },
                forenames: {
                  type: 'string'
                }
              },
              required: ['surname']
            }
          }
        },
        required: ['address', 'links', 'name', 'officer_role'],
        additionalProperties: false,
        title: 'getCompanyAppointment',
        example: {
          address: {
            address_line_1: 'Staverton',
            country: 'United Kingdom',
            locality: 'Cheltenham',
            postal_code: 'GL51 0UX',
            premises: 'Staverton Court',
            region: 'Gloucestershire'
          },
          appointed_on: '2011-10-24',
          country_of_residence: 'United Kingdom',
          date_of_birth: {
            month: 1,
            year: 1948
          },
          links: {
            self: '/company/07820800/appointments/crFJgZgte6RtqRg-esqTYnbMSFs',
            officer: {
              appointments: '/officers/i4lZL1tOKwZA_QCbxvLmIDBZ0b4/appointments'
            }
          },
          name: 'WINCKWORTH, Michael Richard',
          nationality: 'British',
          occupation: 'Company Director',
          officer_role: 'director'
        }
      }
    }
  }
} as const

export type GetOfficersResponse = FromSchema<
  typeof GetOfficersSchema['schema']['response']['200']
>
//export type GetOfficersResponse = any // temporary until schemas can be fixed
