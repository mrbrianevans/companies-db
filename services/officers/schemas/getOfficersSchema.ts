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
        title: 'officerSummary',
        properties: {
          address: {
            description: 'The correspondence address of the officer.',
            items: {
              title: 'address',
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
              type: 'object'
            },
            type: 'array'
          },
          appointed_on: {
            description: 'The date on which the officer was appointed.',
            type: 'string',
            format: 'date'
          },
          contact_details: {
            description:
              'The contact at the `corporate-managing-officer` of a `registered-overseas-entity`.',
            type: 'object',
            title: 'contactDetails',
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
          country_of_residence: {
            description: "The officer's country of residence.",
            type: 'string'
          },
          date_of_birth: {
            description: 'Details of director date of birth.',
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
          links: {
            description:
              'Links to other resources associated with this officer list item.',
            type: 'object',
            title: 'itemLinkTypes',
            required: [],
            properties: {
              self: {
                description:
                  'Link to this individual company officer appointment resource.',
                type: 'string'
              },
              officer: {
                description:
                  'Links to other officer resources associated with this officer list item.',
                type: 'object',
                title: 'officerLinkTypes',
                required: [],
                properties: {
                  appointments: {
                    description:
                      'Link to the officer appointment resource that this appointment is associated with.',
                    type: 'string'
                  }
                }
              }
            }
          },
          name: {
            description: 'Corporate or natural officer name.',
            type: 'string'
          },
          nationality: {
            description: "The officer's nationality.",
            type: 'string'
          },
          occupation: {
            description: "The officer's job title.",
            type: 'string'
          },
          officer_role: {
            enum: [
              'cic-manager',
              'corporate-director',
              'corporate-llp-designated-member',
              'corporate-llp-member',
              'corporate-manager-of-an-eeig',
              'corporate-managing-officer',
              'corporate-member-of-a-management-organ',
              'corporate-member-of-a-supervisory-organ',
              'corporate-member-of-an-administrative-organ',
              'corporate-nominee-director',
              'corporate-nominee-secretary',
              'corporate-secretary',
              'director',
              'general-partner-in-a-limited-partnership',
              'judicial-factor',
              'limited-partner-in-a-limited-partnership',
              'llp-designated-member',
              'llp-member',
              'manager-of-an-eeig',
              'managing-officer',
              'member-of-a-management-organ',
              'member-of-a-supervisory-organ',
              'member-of-an-administrative-organ',
              'nominee-director',
              'nominee-secretary',
              'person-authorised-to-accept',
              'person-authorised-to-represent',
              'person-authorised-to-represent-and-accept',
              'receiver-and-manager',
              'secretary'
            ],
            type: 'string'
          },
          principal_office_address: {
            description:
              'The principal/registered office address of a `corporate-managing-officer` of a `registered-overseas-entity`.',
            type: 'object',
            title: 'address',
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
          resigned_on: {
            description: 'The date on which the officer resigned.',
            type: 'string',
            format: 'date'
          },
          responsibilities: {
            description:
              'The responsibilities of the managing officer of a `registered-overseas-entity`.',
            type: 'string'
          },
          former_names: {
            description: 'Former names for the officer.',
            type: 'object',
            title: 'formerNames',
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
          },
          identification: {
            description:
              'Only one from `eea`, `non-eea`, `uk-limited`, `other-corporate-body-or-firm` or `registered-overseas-entity-corporate-managing-officer` can be supplied, not multiples of them.',
            type: 'object',
            title: 'corporateIdent',
            properties: {
              identification_type: {
                description: "The officer's identity type",
                enum: [
                  'eea',
                  'non-eea',
                  'uk-limited',
                  'other-corporate-body-or-firm',
                  'registered-overseas-entity-corporate-managing-officer'
                ],
                type: 'string'
              },
              legal_authority: {
                description: 'The legal authority supervising the company.',
                type: 'string'
              },
              legal_form: {
                description:
                  'The legal form of the company as defined by its country of registration.',
                type: 'string'
              },
              place_registered: {
                description: 'Place registered.',
                type: 'string'
              },
              registration_number: {
                description: 'Company registration number.',
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

export type GetOfficersResponse = FromSchema<
  typeof GetOfficersSchema['schema']['response']['200']
>
//export type GetOfficersResponse = any // temporary until schemas can be fixed
