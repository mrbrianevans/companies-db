import { FromSchema } from 'json-schema-to-ts'

export interface ListCompanyOfficersParams {
  /** The company number of the officer list being requested. */
  company_number: string
}

export interface ListCompanyOfficersQueryString {
  /** The number of officers to return per page. */
  items_per_page?: number
  /** The register_type determines which officer type is returned for the registers view.The register_type field will only work if registers_view is set to true */
  register_type?: string
  /** Display register specific information. If given register is held at Companies House, registers_view set to true and correct register_type specified, only active officers will be returned. Those will also have full date of birth.Defaults to false */
  register_view?: string
  /** The offset into the entire result set that this page starts. */
  start_index?: number
  /** The field by which to order the result set. */
  order_by?: 'appointed_on'| 'resigned_on'| 'surname'
}

export const ListCompanyOfficersSchema = {
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
                nationality: {
                  type: 'string'
                },
                country_of_residence: {
                  type: 'string'
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
                occupation: {
                  type: 'string'
                },
                name: {
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
                officer_role: {
                  type: 'string'
                },
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
                        address_line_2: {
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
                        address_line_1: {
                          type: 'string'
                        },
                        premises: {
                          type: 'string'
                        },
                        locality: {
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
                resigned_on: {
                  type: 'string'
                },
                identification: {
                  type: 'object',
                  properties: {
                    registration_number: {
                      type: 'string'
                    },
                    identification_type: {
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
                  }
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
          'items',
          'items_per_page',
          'kind',
          'links',
          'resigned_count',
          'start_index',
          'total_results'
        ],
        additionalProperties: false,
        title: 'listOfficers',
        example: {
          active_count: 0,
          etag: '490e7c1c96f85192cf3f3973d59e9b33e47cade0',
          inactive_count: 1,
          items: [
            {
              nationality: 'British',
              country_of_residence: 'England',
              appointed_on: '2015-11-12',
              links: {
                self: '/company/09870307/appointments/0bhRVXIQoMxmVUWz_I5Aeo1q_gI',
                officer: {
                  appointments:
                    '/officers/VCAEYwOwGM_IN1qPw2UDOgPMHQ0/appointments'
                }
              },
              occupation: 'Company Director',
              name: 'KIRKHAM, Graham, Lord',
              date_of_birth: {
                month: 12,
                year: 1944
              },
              officer_role: 'director',
              address: {
                address_line_2: 'Redhouse Interchange, Ardwick-Le-Street',
                postal_code: 'DN6 7FE',
                country: 'England',
                region: 'South Yorkshire',
                address_line_1: 'Ebor Court',
                premises: '8,',
                locality: 'Doncaster'
              }
            }
          ],
          items_per_page: 35,
          kind: 'officer-list',
          links: {
            self: '/company/09870307/officers'
          },
          resigned_count: 0,
          start_index: 0,
          total_results: 1
        }
      }
    }
  }
} as const

export type ListCompanyOfficersResponse = FromSchema<
  typeof ListCompanyOfficersSchema['schema']['response']['200']
>
//export type ListCompanyOfficersResponse = any // temporary until schemas can be fixed
