import { FromSchema } from 'json-schema-to-ts'

export interface ListOfficerAppointmentsParams {
  /** The officer id of the appointment list being requested. */
  officer_id: string
}

export interface ListOfficerAppointmentsQueryString {
  /** The number of appointments to return per page. */
  items_per_page?: number
  /** The first row of data to retrieve, starting at 0. Use this parameter as a pagination mechanism along with the items_per_page parameter. */
  start_index?: number
}

export const ListOfficerAppointmentsSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        officer_id: {
          type: 'string'
        }
      },
      required: ['officer_id']
    },
    querystring: {
      type: 'object',
      properties: {
        items_per_page: {
          type: 'integer'
        },
        start_index: {
          type: 'integer'
        }
      },
      required: []
    },
    response: {
      '200': {
        type: 'object',
        properties: {
          etag: {
            type: 'string'
          },
          is_corporate_officer: {
            type: 'boolean'
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
                officer_role: {
                  type: 'string'
                },
                appointed_to: {
                  type: 'object',
                  properties: {
                    company_status: {
                      type: 'string'
                    },
                    company_number: {
                      type: 'string'
                    },
                    company_name: {
                      type: 'string'
                    }
                  },
                  required: ['company_number']
                },
                name: {
                  type: 'string'
                },
                appointed_on: {
                  type: 'string'
                },
                address: {
                  type: 'object',
                  properties: {
                    locality: {
                      type: 'string'
                    },
                    address_line_1: {
                      type: 'string'
                    },
                    country: {
                      type: 'string'
                    },
                    premises: {
                      type: 'string'
                    },
                    postal_code: {
                      type: 'string'
                    },
                    address_line_2: {
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
                },
                name_elements: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string'
                    },
                    forename: {
                      type: 'string'
                    },
                    surname: {
                      type: 'string'
                    },
                    other_forenames: {
                      type: 'string'
                    },
                    honours: {
                      type: 'string'
                    }
                  },
                  required: ['surname']
                },
                country_of_residence: {
                  type: 'string'
                },
                nationality: {
                  type: 'string'
                },
                occupation: {
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
                    registration_number: {
                      type: 'string'
                    },
                    place_registered: {
                      type: 'string'
                    },
                    legal_form: {
                      type: 'string'
                    },
                    legal_authority: {
                      type: 'string'
                    }
                  },
                  required: ['identification_type']
                },
                is_pre_1992_appointment: {
                  type: 'boolean'
                },
                appointed_before: {
                  type: 'string'
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
                    }
                  }
                }
              },
              required: [
                'links',
                'officer_role',
                'appointed_to',
                'name',
                'address'
              ]
            }
          },
          items_per_page: {
            type: 'integer'
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
          name: {
            type: 'string'
          },
          start_index: {
            type: 'integer'
          },
          total_results: {
            type: 'integer'
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
          }
        },
        required: [
          'etag',
          'is_corporate_officer',
          'items',
          'items_per_page',
          'kind',
          'links',
          'name',
          'start_index',
          'total_results'
        ],
        additionalProperties: false,
        title: 'listOfficerAppointments',
        example: {
          etag: 'ed9c67852e4a5210c0186bec133d725d74e6cb76',
          is_corporate_officer: false,
          items: [
            {
              links: {
                company: '/company/13276747'
              },
              officer_role: 'secretary',
              appointed_to: {
                company_status: 'active',
                company_number: '13276747',
                company_name: 'SEGRO (UK ENERGY) LIMITED'
              },
              name: 'Julia FOO',
              appointed_on: '2021-11-03',
              address: {
                locality: 'London',
                address_line_1: 'New Burlington Place',
                country: 'United Kingdom',
                premises: '1',
                postal_code: 'W1S 2HR'
              },
              name_elements: {
                title: 'Miss',
                forename: 'Julia',
                surname: 'FOO'
              }
            }
          ],
          items_per_page: 35,
          kind: 'personal-appointment',
          links: {
            self: '/officers/hzBw2VEdcjqwmYT1qWlbnNS4Z0I/appointments'
          },
          name: 'Julia FOO',
          start_index: 0,
          total_results: 1
        }
      }
    }
  }
} as const

export type ListOfficerAppointmentsResponse = FromSchema<
  typeof ListOfficerAppointmentsSchema['schema']['response']['200']
>
//export type ListOfficerAppointmentsResponse = any // temporary until schemas can be fixed
