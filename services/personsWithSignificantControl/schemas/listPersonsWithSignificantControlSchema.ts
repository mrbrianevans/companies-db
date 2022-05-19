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
        title: 'list',
        properties: {
          items_per_page: {
            description:
              'The number of persons with significant control to return per page.',
            type: 'integer'
          },
          items: {
            description: 'The list of persons with significant control.',
            items: {
              title: 'listSummary',
              required: [],
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
                country_of_residence: {
                  description:
                    'The country of residence of the person with significant control.',
                  type: 'string'
                },
                date_of_birth: {
                  description:
                    'The date of birth of the person with significant control.',
                  type: 'object',
                  title: 'dateOfBirth',
                  properties: {
                    day: {
                      description: 'The day of the date of birth.',
                      type: 'integer'
                    },
                    month: {
                      description: 'The month of date of birth.',
                      type: 'integer'
                    },
                    year: {
                      description: 'The year of date of birth.',
                      type: 'integer'
                    }
                  },
                  required: []
                },
                name: {
                  description: 'Name of the person with significant control.',
                  type: 'string'
                },
                name_elements: {
                  description:
                    "A document encapsulating the separate elements of a person with significant control's name.",
                  type: 'object',
                  title: 'nameElements',
                  properties: {
                    forename: {
                      description:
                        'The forename of the person with significant control.',
                      type: 'string'
                    },
                    title: {
                      description:
                        'Title of the person with significant control.',
                      type: 'string'
                    },
                    other_forenames: {
                      description:
                        'Other forenames of the person with significant control.',
                      type: 'string'
                    },
                    surname: {
                      description:
                        'The surname of the person with significant control.',
                      type: 'string'
                    }
                  },
                  required: []
                },
                links: {
                  description:
                    'A set of URLs related to the resource, including self.',
                  type: 'object',
                  title: 'pscLinksType',
                  required: [],
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
                nationality: {
                  description:
                    'The nationality of the person with significant control.',
                  type: 'string'
                },
                identification: {
                  description: '',
                  type: 'object',
                  title: 'pscListIdent',
                  properties: {
                    legal_authority: {
                      description:
                        'The legal authority supervising the corporate entity or legal person with significant control.',
                      type: 'string'
                    },
                    legal_form: {
                      description:
                        'The legal form of the corporate entity or legal person with significant control as defined by its country of registration.',
                      type: 'string'
                    },
                    place_registered: {
                      description:
                        'The place the corporate entity with significant control is registered.',
                      type: 'string'
                    },
                    registration_number: {
                      description:
                        'The registration number of the corporate entity with significant control.',
                      type: 'string'
                    },
                    country_registered: {
                      description:
                        'The country or state the corporate entity with significant control is registered in.',
                      type: 'string'
                    }
                  },
                  required: []
                },
                ceased: {
                  description:
                    'Presence of that indicator means the super secure person status is ceased <br />',
                  type: 'boolean'
                },
                description: {
                  description:
                    'Description of the super secure legal statement <br />',
                  enum: ['super-secure-persons-with-significant-control'],
                  type: 'string'
                },
                kind: {
                  enum: [
                    'individual-person-with-significant-control',
                    'corporate-entity-person-with-significant-control',
                    'legal-person-with-significant-control',
                    'super-secure-person-with-significant-control'
                  ],
                  type: 'string'
                },
                address: {
                  description:
                    'The service address of the person with significant control. If given, this address will be shown on the public record instead of the residential address.',
                  type: 'object',
                  title: 'pscAddress',
                  required: [],
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
                natures_of_control: {
                  description:
                    'Indicates the nature of control the person with significant control holds.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/psc_descriptions.yml) file. \n',
                  type: 'string'
                }
              },
              type: 'object'
            },
            type: 'array'
          },
          start_index: {
            description:
              'The offset into the entire result set that this page starts.',
            type: 'integer'
          },
          total_results: {
            description:
              'The total number of persons with significant control in this result set.',
            type: 'integer'
          },
          active_count: {
            description:
              'The number of active persons with significant control in this result set.',
            type: 'integer'
          },
          ceased_count: {
            description:
              'The number of ceased persons with significant control in this result set.',
            type: 'integer'
          },
          links: {
            description:
              'A set of URLs related to the resource, including self.',
            type: 'object',
            title: 'pscListLinksType',
            required: [],
            properties: {
              self: {
                description: 'The URL of the resource.',
                type: 'string'
              },
              persons_with_significant_control_list: {
                description:
                  'The URL of the persons with significant control list resource.',
                type: 'string'
              }
            }
          }
        },
        required: [],
        type: 'object'
      }
    }
  }
} as const

export type ListPersonsWithSignificantControlResponse = FromSchema<
  typeof ListPersonsWithSignificantControlSchema['schema']['response']['200']
>
//export type ListPersonsWithSignificantControlResponse = any // temporary until schemas can be fixed
