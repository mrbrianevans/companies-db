import { FromSchema } from 'json-schema-to-ts'

export interface ListPersonsWithSignificantControlParams {
  /** The company number of the persons with significant control list being requested. */
  company_number: string
}

export interface ListPersonsWithSignificantControlQueryString {
  /** The number of persons with significant control to return per page. */
  items_per_page?: string
  /** The offset into the entire result set that this page starts. */
  start_index?: string
  /** Display register specific information. If register is held at
Companies House and register_view is set to true, only PSCs which are
active or were terminated during election period are shown together with
full dates of birth where available. Accepted values are: -`true`  
-`false`  \n Defaults to false.
 */
  register_view?: string
}

export const ListPersonsWithSignificantControlSchema = {
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
          type: 'string'
        },
        start_index: {
          type: 'string'
        },
        register_view: {
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
          ceased_count: {
            type: 'integer'
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                country_of_residence: {
                  type: 'string'
                },
                etag: {
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
                notified_on: {
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
                natures_of_control: {
                  type: 'array',
                  items: {
                    type: 'string'
                  }
                },
                nationality: {
                  type: 'string'
                },
                name_elements: {
                  type: 'object',
                  properties: {
                    forename: {
                      type: 'string'
                    },
                    title: {
                      type: 'string'
                    },
                    surname: {
                      type: 'string'
                    },
                    middle_name: {
                      type: 'string'
                    }
                  },
                  required: ['surname']
                },
                name: {
                  type: 'string'
                },
                address: {
                  type: 'object',
                  properties: {
                    locality: {
                      type: 'string'
                    },
                    premises: {
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
                    postal_code: {
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
                kind: {
                  type: 'string'
                },
                ceased_on: {
                  type: 'string'
                },
                identification: {
                  type: 'object',
                  properties: {
                    legal_authority: {
                      type: 'string'
                    },
                    country_registered: {
                      type: 'string'
                    },
                    legal_form: {
                      type: 'string'
                    },
                    registration_number: {
                      type: 'string'
                    },
                    place_registered: {
                      type: 'string'
                    }
                  },
                  required: ['legal_authority', 'legal_form']
                },
                description: {
                  type: 'string'
                }
              },
              required: ['etag', 'links', 'kind']
            }
          },
          items_per_page: {
            type: 'integer'
          },
          links: {
            type: 'object',
            properties: {
              self: {
                type: 'string'
              },
              persons_with_significant_control_statements: {
                type: 'string'
              },
              exemptions: {
                type: 'string'
              }
            },
            required: ['self']
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
          'ceased_count',
          'items',
          'items_per_page',
          'links',
          'start_index',
          'total_results'
        ],
        additionalProperties: false,
        title: 'listPersonsWithSignificantControl',
        example: {
          active_count: 1,
          ceased_count: 1,
          items: [
            {
              country_of_residence: 'England',
              etag: '09dda16a85bbd90be915ea4d1bc0938c141d5006',
              date_of_birth: {
                year: 1958,
                month: 12
              },
              notified_on: '2020-10-26',
              links: {
                self: '/company/04277636/persons-with-significant-control/individual/OXRcen646dCFlhc7SCl3D2KAxZ0'
              },
              natures_of_control: ['ownership-of-shares-75-to-100-percent'],
              nationality: 'British',
              name_elements: {
                forename: 'Asmita',
                title: 'Mrs',
                surname: 'Saujani',
                middle_name: 'Nitinchandra'
              },
              name: 'Mrs Asmita Nitinchandra Saujani',
              address: {
                locality: 'Rickmansworth',
                premises: '50 Grovewood Close',
                country: 'England',
                region: 'Hertfordshire',
                address_line_1: 'Chorleywood',
                postal_code: 'WD3 5PX'
              },
              kind: 'individual-person-with-significant-control'
            },
            {
              ceased_on: '2020-10-26',
              etag: 'a3f86f7fde9af31b046343300aeb6ea470dd1a29',
              country_of_residence: 'United Arab Emirates',
              notified_on: '2016-08-01',
              date_of_birth: {
                year: 1966,
                month: 7
              },
              name: 'Mrs Falguni Sanjiv Patel',
              name_elements: {
                title: 'Mrs',
                forename: 'Falguni',
                middle_name: 'Sanjiv',
                surname: 'Patel'
              },
              nationality: 'British',
              links: {
                self: '/company/04277636/persons-with-significant-control/individual/VqdFpT8mO1_olhlkbz49WQ8FI84'
              },
              natures_of_control: ['ownership-of-shares-25-to-50-percent'],
              kind: 'individual-person-with-significant-control',
              address: {
                locality: 'Middlesex',
                address_line_2: 'Northwood',
                address_line_1: '41 The Broadway, Joel Street',
                postal_code: 'HA6 1NZ'
              }
            }
          ],
          items_per_page: 25,
          links: {
            self: '/company/04277636/persons-with-significant-control'
          },
          start_index: 0,
          total_results: 2
        }
      }
    }
  }
} as const

export type ListPersonsWithSignificantControlResponse = FromSchema<
  typeof ListPersonsWithSignificantControlSchema['schema']['response']['200']
>
//export type ListPersonsWithSignificantControlResponse = any // temporary until schemas can be fixed
