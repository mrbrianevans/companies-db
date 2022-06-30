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
                date_of_birth: {
                  type: 'object',
                  properties: {
                    year: {
                      type: 'integer'
                    },
                    month: {
                      type: 'integer'
                    },
                    day: {
                      description: 'The day of the date of birth.',
                      type: 'integer'
                    }
                  },
                  required: ['year', 'month']
                },
                name_elements: {
                  type: 'object',
                  properties: {
                    middle_name: {
                      type: 'string'
                    },
                    forename: {
                      type: 'string'
                    },
                    surname: {
                      type: 'string'
                    },
                    title: {
                      type: 'string'
                    },
                    other_forenames: {
                      description:
                        'Other forenames of the person with significant control.',
                      type: 'string'
                    }
                  },
                  required: ['surname']
                },
                kind: {
                  type: 'string'
                },
                natures_of_control: {
                  anyOf: [
                    {
                      description:
                        'Indicates the nature of control the person with significant control holds.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/psc_descriptions.yml) file.\n',
                      type: 'string'
                    },
                    {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  ]
                },
                name: {
                  type: 'string'
                },
                country_of_residence: {
                  type: 'string'
                },
                nationality: {
                  type: 'string'
                },
                address: {
                  type: 'object',
                  properties: {
                    postal_code: {
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
                links: {
                  type: 'object',
                  properties: {
                    self: {
                      type: 'string'
                    },
                    statement: {
                      description:
                        'The URL of the statement linked to this person with significant control.',
                      type: 'string'
                    }
                  },
                  required: ['self']
                },
                notified_on: {
                  type: 'string'
                },
                etag: {
                  type: 'string'
                },
                ceased_on: {
                  type: 'string'
                },
                identification: {
                  type: 'object',
                  properties: {
                    registration_number: {
                      type: 'string'
                    },
                    legal_authority: {
                      type: 'string'
                    },
                    country_registered: {
                      type: 'string'
                    },
                    place_registered: {
                      type: 'string'
                    },
                    legal_form: {
                      type: 'string'
                    }
                  },
                  required: ['legal_authority', 'legal_form']
                },
                description: {
                  type: 'string'
                },
                ceased: {
                  description:
                    'Presence of that indicator means the super secure person status is ceased <br />',
                  type: 'boolean'
                }
              },
              required: ['links', 'etag']
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
              },
              persons_with_significant_control_list: {
                description:
                  'The URL of the persons with significant control list resource.',
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
              date_of_birth: {
                year: 1969,
                month: 6
              },
              name_elements: {
                middle_name: 'Roy',
                forename: 'Jonathan',
                surname: 'Growcott',
                title: 'Mr'
              },
              kind: 'individual-person-with-significant-control',
              natures_of_control: ['ownership-of-shares-75-to-100-percent'],
              name: 'Mr Jonathan Roy Growcott',
              country_of_residence: 'England',
              nationality: 'English',
              address: {
                postal_code: 'DY6 7HU',
                address_line_1: 'Stallings Lane',
                premises: '8a',
                locality: 'Kingswinford',
                country: 'England'
              },
              links: {
                self: '/company/08744864/persons-with-significant-control/individual/oBL_jXq90aj3DzFLaZtqh3Ak9QI'
              },
              notified_on: '2019-09-30',
              etag: '0f3d8e2cb44eb939e8feaba52a625b74ef074371'
            },
            {
              date_of_birth: {
                month: 9,
                year: 1960
              },
              name_elements: {
                forename: 'Jeremy',
                middle_name: 'Peter',
                surname: 'Moore',
                title: 'Mr'
              },
              name: 'Mr Jeremy Peter Moore',
              natures_of_control: ['ownership-of-shares-75-to-100-percent'],
              ceased_on: '2019-09-30',
              kind: 'individual-person-with-significant-control',
              address: {
                region: 'Shropshire',
                locality: 'Hilton',
                premises: 'New Barns Farm',
                postal_code: 'WV15 5PB'
              },
              country_of_residence: 'England',
              nationality: 'British',
              etag: '3e76a5ad71ef44c634b16e1354f600cd511ed521',
              notified_on: '2016-10-01',
              links: {
                self: '/company/08744864/persons-with-significant-control/individual/PzH2tbV8TNFk1HQXjxvITe5E7MQ'
              }
            }
          ],
          items_per_page: 25,
          links: {
            self: '/company/08744864/persons-with-significant-control'
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
