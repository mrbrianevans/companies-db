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
          type: 'string',
        },
      },
      required: ['company_number'],
    },
    querystring: {
      type: 'object',
      properties: {
        items_per_page: {
          type: 'integer',
        },
        register_type: {
          enum: ['directors', 'secretaries', 'llp-members'],
          type: 'string',
        },
        register_view: {
          enum: ['true', 'false'],
          type: 'string',
        },
        start_index: {
          type: 'integer',
        },
        order_by: {
          enum: ['appointed_on', 'resigned_on', 'surname'],
          type: 'string',
        },
      },
      required: [],
    },
    response: {
      '200': {
        title: 'officerList',
        properties: {
          active_count: {
            description: 'The number of active officers in this result set.',
            type: 'integer',
          },
          etag: {
            description: 'The ETag of the resource.',
            type: 'string',
          },
          items: {
            description: 'The list of officers.',
            items: {
              title: 'officerSummary',
              properties: {
                address: {
                  description: 'The correspondence address of the officer.',
                  items: {
                    title: 'address',
                    required: ['address_line_1', 'locality'],
                    properties: {
                      address_line_1: {
                        description: 'The first line of the address.',
                        type: 'string',
                      },
                      address_line_2: {
                        description: 'The second line of the address.',
                        type: 'string',
                      },
                      care_of: {
                        description: 'The care of name.',
                        type: 'string',
                      },
                      country: {
                        description: 'The country e.g. United Kingdom.',
                        type: 'string',
                      },
                      locality: {
                        description: 'The locality e.g. London.',
                        type: 'string',
                      },
                      po_box: {
                        description: 'The post-office box number.',
                        type: 'string',
                      },
                      postal_code: {
                        description: 'The postal code e.g. CF14 3UZ.',
                        type: 'string',
                      },
                      premises: {
                        description: 'The property name or number.',
                        type: 'string',
                      },
                      region: {
                        description: 'The region e.g. Surrey.',
                        type: 'string',
                      },
                    },
                    type: 'object',
                  },
                  type: 'array',
                },
                appointed_on: {
                  description: 'The date on which the officer was appointed.',
                  type: 'string',
                  format: 'date',
                },
                contact_details: {
                  description:
                    'The contact at the `corporate-managing-officer` of a `registered-overseas-entity`.',
                  items: {
                    title: 'contactDetails',
                    required: ['address_line_1', 'locality', 'name'],
                    properties: {
                      address_line_1: {
                        description: 'The first line of the address.',
                        type: 'string',
                      },
                      address_line_2: {
                        description: 'The second line of the address.',
                        type: 'string',
                      },
                      care_of: {
                        description: 'The care of name.',
                        type: 'string',
                      },
                      country: {
                        description: 'The country e.g. United Kingdom.',
                        type: 'string',
                      },
                      locality: {
                        description: 'The locality e.g. London.',
                        type: 'string',
                      },
                      name: {
                        description: 'The name of the contact.',
                        type: 'string',
                      },
                      po_box: {
                        description: 'The post-office box number.',
                        type: 'string',
                      },
                      postal_code: {
                        description: 'The postal code e.g. CF14 3UZ.',
                        type: 'string',
                      },
                      premises: {
                        description: 'The property name or number.',
                        type: 'string',
                      },
                      region: {
                        description: 'The region e.g. Surrey.',
                        type: 'string',
                      },
                    },
                    type: 'object',
                  },
                  type: 'array',
                },
                country_of_residence: {
                  description: "The officer's country of residence.",
                  type: 'string',
                },
                date_of_birth: {
                  description: 'Details of director date of birth.',
                  items: {
                    title: 'dateOfBirth',
                    properties: {
                      day: {
                        description: 'The day of the date of birth.',
                        type: 'integer',
                      },
                      month: {
                        description: 'The month of date of birth.',
                        type: 'integer',
                      },
                      year: {
                        description: 'The year of date of birth.',
                        type: 'integer',
                      },
                    },
                    required: ['month', 'year'],
                    type: 'object',
                  },
                  type: 'array',
                },
                links: {
                  description:
                    'Links to other resources associated with this officer list item.',
                  items: {
                    title: 'itemLinkTypes',
                    required: ['self', 'officer'],
                    properties: {
                      self: {
                        description:
                          'Link to this individual company officer appointment resource.',
                        type: 'string',
                      },
                      officer: {
                        description:
                          'Links to other officer resources associated with this officer list item.',
                        items: {
                          title: 'officerLinkTypes',
                          required: ['appointments'],
                          properties: {
                            appointments: {
                              description:
                                'Link to the officer appointment resource that this appointment is associated with.',
                              type: 'string',
                            },
                          },
                          type: 'object',
                        },
                        type: 'array',
                      },
                    },
                    type: 'object',
                  },
                  type: 'array',
                },
                name: {
                  description: 'Corporate or natural officer name.',
                  type: 'string',
                },
                nationality: {
                  description: "The officer's nationality.",
                  type: 'string',
                },
                occupation: {
                  description: "The officer's job title.",
                  type: 'string',
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
                    'secretary',
                  ],
                  type: 'string',
                },
                principal_office_address: {
                  description:
                    'The principal/registered office address of a `corporate-managing-officer` of a `registered-overseas-entity`.',
                  items: {
                    title: 'address',
                    required: ['address_line_1', 'locality'],
                    properties: {
                      address_line_1: {
                        description: 'The first line of the address.',
                        type: 'string',
                      },
                      address_line_2: {
                        description: 'The second line of the address.',
                        type: 'string',
                      },
                      care_of: {
                        description: 'The care of name.',
                        type: 'string',
                      },
                      country: {
                        description: 'The country e.g. United Kingdom.',
                        type: 'string',
                      },
                      locality: {
                        description: 'The locality e.g. London.',
                        type: 'string',
                      },
                      po_box: {
                        description: 'The post-office box number.',
                        type: 'string',
                      },
                      postal_code: {
                        description: 'The postal code e.g. CF14 3UZ.',
                        type: 'string',
                      },
                      premises: {
                        description: 'The property name or number.',
                        type: 'string',
                      },
                      region: {
                        description: 'The region e.g. Surrey.',
                        type: 'string',
                      },
                    },
                    type: 'object',
                  },
                  type: 'array',
                },
                resigned_on: {
                  description: 'The date on which the officer resigned.',
                  type: 'string',
                  format: 'date',
                },
                responsibilities: {
                  description:
                    'The responsibilities of the managing officer of a `registered-overseas-entity`.',
                  type: 'string',
                },
                former_names: {
                  description: 'Former names for the officer.',
                  items: {
                    title: 'formerNames',
                    properties: {
                      forenames: {
                        description: 'Former forenames of the officer.',
                        type: 'string',
                      },
                      surname: {
                        description: 'Former surnames of the officer.',
                        type: 'string',
                      },
                    },
                    type: 'object',
                  },
                  type: 'array',
                },
                identification: {
                  description:
                    'Only one from `eea`, `non-eea`, `uk-limited`, `other-corporate-body-or-firm` or `registered-overseas-entity-corporate-managing-officer` can be supplied, not multiples of them.',
                  items: {
                    title: 'corporateIdent',
                    properties: {
                      identification_type: {
                        description: "The officer's identity type",
                        enum: [
                          'eea',
                          'non-eea',
                          'uk-limited',
                          'other-corporate-body-or-firm',
                          'registered-overseas-entity-corporate-managing-officer',
                        ],
                        type: 'string',
                      },
                      legal_authority: {
                        description:
                          'The legal authority supervising the company.',
                        type: 'string',
                      },
                      legal_form: {
                        description:
                          'The legal form of the company as defined by its country of registration.',
                        type: 'string',
                      },
                      place_registered: {
                        description: 'Place registered.',
                        type: 'string',
                      },
                      registration_number: {
                        description: 'Company registration number.',
                        type: 'string',
                      },
                    },
                    type: 'object',
                  },
                  type: 'array',
                },
              },
              required: [
                'address',
                'appointed_on',
                'links',
                'name',
                'officer_role',
              ],
              type: 'object',
            },
            type: 'array',
          },
          items_per_page: {
            description: 'The number of officers to return per page.',
            type: 'integer',
          },
          kind: {
            enum: ['officer-list'],
            type: 'string',
          },
          links: {
            description:
              'Links to other resources associated with this officer list resource.',
            items: {
              title: 'linkTypes',
              required: ['self'],
              properties: {
                self: {
                  description: 'Link to this officer list resource.',
                  type: 'string',
                },
              },
              type: 'object',
            },
            type: 'array',
          },
          resigned_count: {
            description: 'The number of resigned officers in this result set.',
            type: 'integer',
          },
          start_index: {
            description:
              'The offset into the entire result set that this page starts.',
            type: 'integer',
          },
          total_results: {
            description: 'The total number of officers in this result set.',
            type: 'integer',
          },
          type: 'array',
        },
        required: [
          'etag',
          'items_per_page',
          'kind',
          'links',
          'items',
          'start_index',
          'total_results',
          'active_count',
          'resigned_count',
        ],
        type: 'object',
      },
    },
  },
} as const

// export type ListOfficersResponse = FromSchema<typeof ListOfficersSchema['schema']['response']['200']>
export type ListOfficersResponse = any // temporary until schemas can be fixed
