import { FromSchema } from 'json-schema-to-ts'

export interface GetOfficerAppointmentParams {
  /** The company number of the officer list being requested. */
  company_number: string
  /** The appointment id of the company officer appointment being requested. */
  appointment_id: string
}

export interface GetOfficerAppointmentQueryString {}

export const GetOfficerAppointmentSchema = {
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
            anyOf: [
              {
                type: 'array',
                items: {
                  type: 'object',
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
                      description: 'The care of name.',
                      type: 'string'
                    },
                    country: {
                      description: 'The country e.g. United Kingdom.',
                      type: 'string'
                    },
                    locality: {
                      description: 'The locality e.g. London.',
                      type: 'string'
                    },
                    po_box: {
                      description: 'The post-office box number.',
                      type: 'string'
                    },
                    postal_code: {
                      description: 'The postal code e.g. CF14 3UZ.',
                      type: 'string'
                    },
                    premises: {
                      description: 'The property name or number.',
                      type: 'string'
                    },
                    region: {
                      description: 'The region e.g. Surrey.',
                      type: 'string'
                    }
                  },
                  required: ['address_line_1', 'locality']
                }
              },
              {
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
                  care_of: {
                    type: 'string'
                  },
                  po_box: {
                    type: 'string'
                  }
                }
              }
            ]
          },
          appointed_on: {
            type: 'string'
          },
          identification: {
            type: 'object',
            properties: {
              identification_type: {
                type: 'string'
              },
              registration_number: {
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
              }
            }
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
          officer_role: {
            type: 'string'
          },
          resigned_on: {
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
              },
              day: {
                description: 'The day of the date of birth.',
                type: 'integer'
              }
            },
            required: ['month', 'year']
          },
          nationality: {
            type: 'string'
          },
          occupation: {
            type: 'string'
          },
          former_names: {
            anyOf: [
              {
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
                  }
                }
              },
              {
                type: 'object',
                properties: {
                  forenames: {
                    description: 'Former forenames of the officer.',
                    type: 'string'
                  },
                  surname: {
                    description: 'Former surnames of the officer.',
                    type: 'string'
                  }
                }
              }
            ]
          },
          contact_details: {
            description:
              'The contact at the `corporate-managing-officer` of a `registered-overseas-entity`.',
            type: 'object',
            title: 'contactDetails',
            required: ['address_line_1', 'locality', 'name'],
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
                description: 'The care of name.',
                type: 'string'
              },
              country: {
                description: 'The country e.g. United Kingdom.',
                type: 'string'
              },
              locality: {
                description: 'The locality e.g. London.',
                type: 'string'
              },
              name: {
                description: 'The name of the contact.',
                type: 'string'
              },
              po_box: {
                description: 'The post-office box number.',
                type: 'string'
              },
              postal_code: {
                description: 'The postal code e.g. CF14 3UZ.',
                type: 'string'
              },
              premises: {
                description: 'The property name or number.',
                type: 'string'
              },
              region: {
                description: 'The region e.g. Surrey.',
                type: 'string'
              }
            }
          },
          principal_office_address: {
            description:
              'The principal/registered office address of a `corporate-managing-officer` of a `registered-overseas-entity`.',
            type: 'object',
            title: 'address',
            required: ['address_line_1', 'locality'],
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
                description: 'The care of name.',
                type: 'string'
              },
              country: {
                description: 'The country e.g. United Kingdom.',
                type: 'string'
              },
              locality: {
                description: 'The locality e.g. London.',
                type: 'string'
              },
              po_box: {
                description: 'The post-office box number.',
                type: 'string'
              },
              postal_code: {
                description: 'The postal code e.g. CF14 3UZ.',
                type: 'string'
              },
              premises: {
                description: 'The property name or number.',
                type: 'string'
              },
              region: {
                description: 'The region e.g. Surrey.',
                type: 'string'
              }
            }
          },
          responsibilities: {
            description:
              'The responsibilities of the managing officer of a `registered-overseas-entity`.',
            type: 'string'
          }
        },
        required: ['links', 'name', 'officer_role'],
        additionalProperties: false,
        title: 'getOfficers',
        example: {
          address: {
            address_line_1: '1229 Stratford Road',
            address_line_2: 'Hall Green',
            country: 'England',
            locality: 'Birmingham',
            postal_code: 'B28 9AA',
            premises: 'Cambrai Court'
          },
          appointed_on: '2011-06-10',
          identification: {
            identification_type: 'uk-limited-company',
            registration_number: '4527552'
          },
          links: {
            self: '/company/07665437/appointments/Maj2T4RZGfhC4yrgNJqXVo-dOsI',
            officer: {
              appointments: '/officers/UfHA2EySqUtaf2U6JlRT_cCdHYQ/appointments'
            }
          },
          name: 'CAPITAX & CO. (TAX CONSULTANTS) LTD.',
          officer_role: 'corporate-secretary',
          resigned_on: '2021-06-14'
        }
      }
    }
  }
} as const

export type GetOfficerAppointmentResponse = FromSchema<
  typeof GetOfficerAppointmentSchema['schema']['response']['200']
>
//export type GetOfficerAppointmentResponse = any // temporary until schemas can be fixed
