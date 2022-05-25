import { FromSchema } from 'json-schema-to-ts'

export interface ListOfficersParams {
  /** The company number of the officer list being requested. */
  company_number: string
}

export interface ListOfficersQueryString {
  /** The number of officers to return per page. */
  items_per_page?: number
  /** The register_type determines which officer type is returned for the registers view.The register_type field will only work if registers_view is set to true */
  register_type?: string
  /** Display register specific information. If given register is held at Companies House, registers_view set to true and correct register_type specified, only active officers will be returned. Those will also have full date of birth.Defaults to false */
  register_view?: string
  /** The offset into the entire result set that this page starts. */
  start_index?: number
  /** The field by which to order the result set. */
  order_by?: string
}

export const ListOfficersSchema = {
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
      properties: {
        items_per_page: {
          type: 'integer'
        },
        register_type: {
          enum: ['directors', 'secretaries', 'llp-members'],
          type: 'string'
        },
        register_view: {
          enum: ['true', 'false'],
          type: 'string'
        },
        start_index: {
          type: 'integer'
        },
        order_by: {
          enum: ['appointed_on', 'resigned_on', 'surname'],
          type: 'string'
        }
      },
      required: []
    },
    response: {
      '200': {
        type: 'object',
        properties: {
          active_count: {
            type: 'integer'
          },
          etag: {
            type: 'string'
          },
          inactive_count: {
            type: 'integer'
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                address: {
                  type: 'object',
                  properties: {
                    locality: {
                      type: 'string'
                    },
                    address_line_1: {
                      type: 'string'
                    },
                    premises: {
                      type: 'string'
                    },
                    postal_code: {
                      type: 'string'
                    },
                    country: {
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
                date_of_birth: {
                  type: 'object',
                  properties: {
                    year: {
                      type: 'integer'
                    },
                    month: {
                      type: 'integer'
                    }
                  },
                  required: ['year', 'month']
                },
                nationality: {
                  type: 'string'
                },
                occupation: {
                  type: 'string'
                },
                country_of_residence: {
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
                    legal_authority: {
                      type: 'string'
                    },
                    legal_form: {
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
                    }
                  }
                }
              },
              required: ['links', 'name', 'officer_role']
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
          resigned_count: {
            type: 'integer'
          },
          start_index: {
            type: 'integer'
          },
          total_results: {
            type: 'integer'
          }
        },
        required: [
          'active_count',
          'etag',
          'inactive_count',
          'items',
          'items_per_page',
          'kind',
          'links',
          'resigned_count',
          'start_index',
          'total_results'
        ],
        additionalProperties: false,
        title: 'listCompanyOfficers',
        example: {
          active_count: 4,
          etag: '79566b66c86329874c13ce61bae1022dba6dee79',
          inactive_count: 0,
          items: [
            {
              address: {
                locality: 'Glasgow',
                address_line_1: 'Sauchiehall Street',
                premises: '217',
                postal_code: 'G2 3EX',
                country: 'United Kingdom'
              },
              appointed_on: '2017-10-12',
              links: {
                self: '/company/SC578764/appointments/Iz_abzJJlhXIA1S0i20WoVAO5W4',
                officer: {
                  appointments:
                    '/officers/nP3gmZB3lWqH98KnxGroxeD_FXQ/appointments'
                }
              },
              name: 'DICKSON, Ian',
              officer_role: 'secretary'
            },
            {
              links: {
                officer: {
                  appointments:
                    '/officers/4KhFXpxeyOcEy0kUYfVw7ymCAPo/appointments'
                },
                self: '/company/SC578764/appointments/kT2WRWqaFQVRf1jnI4V26rpfJLE'
              },
              date_of_birth: {
                year: 1950,
                month: 4
              },
              nationality: 'British',
              occupation: 'Director',
              officer_role: 'director',
              country_of_residence: 'United Kingdom',
              name: 'DICKSON, Ian',
              appointed_on: '2017-10-12',
              address: {
                country: 'United Kingdom',
                locality: 'Glasgow',
                address_line_1: 'Sauchiehall Street',
                postal_code: 'G2 3EX',
                premises: '217'
              }
            },
            {
              occupation: 'Director',
              officer_role: 'director',
              country_of_residence: 'Scotland',
              name: 'MCCALLUM, Colin',
              address: {
                country: 'United Kingdom',
                address_line_1: 'Sauchiehall Street',
                postal_code: 'G2 3EX',
                locality: 'Glasgow',
                premises: '217'
              },
              appointed_on: '2022-02-01',
              links: {
                self: '/company/SC578764/appointments/z_09dfxugbWSiZbZd8UDKrQCh3U',
                officer: {
                  appointments:
                    '/officers/1HLYRNBXuWirO2VxG0aIk55ZNEY/appointments'
                }
              },
              nationality: 'British',
              date_of_birth: {
                year: 1958,
                month: 3
              }
            },
            {
              date_of_birth: {
                year: 1972,
                month: 8
              },
              nationality: 'British',
              links: {
                officer: {
                  appointments:
                    '/officers/FMjH8gNRH1IYdXF9sSgSO4RL8uk/appointments'
                },
                self: '/company/SC578764/appointments/cSkjz1xlTcb3alhlaO6mWgK5zbU'
              },
              appointed_on: '2019-08-25',
              address: {
                premises: '217',
                country: 'United Kingdom',
                address_line_1: 'Sauchiehall Street',
                locality: 'Glasgow',
                postal_code: 'G2 3EX'
              },
              country_of_residence: 'Scotland',
              occupation: 'Director',
              officer_role: 'director',
              name: 'YOUNG, Pauline Agnes'
            },
            {
              links: {
                self: '/company/SC578764/appointments/ZUbltBTnEHJ0gRyAW3e5m9Eot1g',
                officer: {
                  appointments:
                    '/officers/gIWdb7lKe_mkPVxFZ6oTsS50600/appointments'
                }
              },
              nationality: 'British',
              date_of_birth: {
                year: 1949,
                month: 12
              },
              occupation: 'Director',
              officer_role: 'director',
              country_of_residence: 'United Kingdom',
              name: 'CAIRNS, David',
              address: {
                country: 'United Kingdom',
                postal_code: 'G2 3EX',
                address_line_1: 'Sauchiehall Street',
                premises: '217',
                locality: 'Glasgow'
              },
              resigned_on: '2020-03-03',
              appointed_on: '2017-10-12'
            },
            {
              links: {
                officer: {
                  appointments:
                    '/officers/I2mO4LGkIHc3r8tKeMkbzU8AzGY/appointments'
                },
                self: '/company/SC578764/appointments/-8qz5QzZBnPKnUJH-JWJfWBg-O4'
              },
              date_of_birth: {
                month: 5,
                year: 1962
              },
              nationality: 'British',
              occupation: 'Director',
              officer_role: 'director',
              country_of_residence: 'United Kingdom',
              name: 'MACKIE, John Ross',
              resigned_on: '2019-02-06',
              appointed_on: '2017-10-12',
              address: {
                locality: 'Glasgow',
                postal_code: 'G2 3EX',
                premises: '217',
                country: 'United Kingdom',
                address_line_1: 'Sauchiehall Street'
              }
            },
            {
              name: 'SINCLAIR, Celia Margaret Lloyd',
              country_of_residence: 'United Kingdom',
              occupation: 'Director',
              officer_role: 'director',
              appointed_on: '2017-10-12',
              resigned_on: '2022-01-31',
              address: {
                country: 'United Kingdom',
                address_line_1: 'Sauchiehall Street',
                postal_code: 'G2 3EX',
                locality: 'Glasgow',
                premises: '217'
              },
              links: {
                officer: {
                  appointments:
                    '/officers/5ymszo9eA4oUAFboil6bm1sSfaU/appointments'
                },
                self: '/company/SC578764/appointments/yr2pkyWU-wTKRo94eov84ArehlA'
              },
              date_of_birth: {
                month: 4,
                year: 1947
              },
              nationality: 'British'
            },
            {
              links: {
                officer: {
                  appointments:
                    '/officers/Xyy43RTMDaH3yesypIaEdACu0rE/appointments'
                },
                self: '/company/SC578764/appointments/XtsO7txqc9OTN6F1bm7EeZINW_w'
              },
              date_of_birth: {
                year: 1939,
                month: 11
              },
              nationality: 'British',
              officer_role: 'director',
              occupation: 'Director',
              country_of_residence: 'Scotland',
              name: 'TAYLOR, Maurice Vincent',
              resigned_on: '2021-07-21',
              appointed_on: '2017-10-12',
              address: {
                address_line_1: 'Sauchiehall Street',
                postal_code: 'G2 3EX',
                country: 'United Kingdom',
                premises: '217',
                locality: 'Glasgow'
              }
            }
          ],
          items_per_page: 35,
          kind: 'officer-list',
          links: {
            self: '/company/SC578764/officers'
          },
          resigned_count: 4,
          start_index: 0,
          total_results: 8
        }
      }
    }
  }
} as const

export type ListOfficersResponse = FromSchema<
  typeof ListOfficersSchema['schema']['response']['200']
>
//export type ListOfficersResponse = any // temporary until schemas can be fixed
