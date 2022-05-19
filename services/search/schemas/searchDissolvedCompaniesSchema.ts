import { FromSchema } from 'json-schema-to-ts'

export interface SearchDissolvedCompaniesParams {}

export interface SearchDissolvedCompaniesQueryString {
  /** The company name being searched for */
  q?: string
  /** Determines type of search. Options are alphabetical, best-match, previous-name-dissolved */
  search_type?: string
  /** The ordered_alpha_key_with_id used for alphabetical paging */
  search_above?: string
  /** The ordered_alpha_key_with_id used for alphabetical paging */
  search_below?: string
  /** The maximum number of results matching the search term(s) to return with a range of 1 to 100 */
  size?: string
  /** Used in best-match and previous-name-dissolved search-type */
  start_index?: string
}

export const SearchDissolvedCompaniesSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {},
      required: []
    },
    querystring: {
      type: 'object',
      properties: {
        q: {
          type: 'string'
        },
        search_type: {
          type: 'string'
        },
        search_above: {
          type: 'string'
        },
        search_below: {
          type: 'string'
        },
        size: {
          type: 'string'
        },
        start_index: {
          type: 'string'
        }
      },
      required: []
    },
    response: {
      '200': {
        title: 'List of dissolved companies',
        type: 'object',
        allOf: [
          {
            properties: {
              etag: {
                type: 'string'
              },
              items: {
                type: 'array',
                items: {
                  title: 'Dissolved company',
                  required: [
                    'company_name',
                    'company_number',
                    'date_of_cessation',
                    'date_of_creation'
                  ],
                  properties: {
                    company_name: {
                      type: 'string',
                      description:
                        'The company name associated with the dissolved company'
                    },
                    company_number: {
                      type: 'string',
                      description: 'The company number of the dissolved company'
                    },
                    company_status: {
                      type: 'string',
                      description: 'The status of the company'
                    },
                    ordered_alpha_key_with_id: {
                      type: 'string',
                      description:
                        "The alphakey with it's id associated with the dissolved company"
                    },
                    kind: {
                      type: 'string',
                      enum: ['search-results#dissolved-company'],
                      description: 'The type of search result'
                    },
                    date_of_cessation: {
                      type: 'string',
                      format: 'date',
                      description: 'The date that the company was dissolved'
                    },
                    date_of_creation: {
                      type: 'string',
                      format: 'date',
                      description: 'The date that the company was incorporated'
                    },
                    registered_office_address: {
                      title: 'Registered Office Address',
                      description:
                        'This will only appear if there are ROA details in the company record',
                      properties: {
                        address_line_1: {
                          type: 'string',
                          description:
                            'The first line of the address e.g Crown Way'
                        },
                        address_line_2: {
                          type: 'string',
                          description: 'The second line of the address'
                        },
                        locality: {
                          type: 'string',
                          description:
                            'The town associated to the ROA e.g Cardiff'
                        },
                        postal_code: {
                          type: 'string',
                          description: 'The postal code e.g CF14 3UZ'
                        }
                      }
                    },
                    previous_company_names: {
                      type: 'array',
                      items: {
                        title: 'Previous company name',
                        properties: {
                          company_number: {
                            type: 'string',
                            description:
                              'The company number of the dissolved company'
                          },
                          ceased_on: {
                            type: 'string',
                            format: 'date',
                            description:
                              'The date that the company ceased being known under the company name'
                          },
                          effective_from: {
                            type: 'string',
                            format: 'date',
                            description:
                              'The date that the company started being known under the company name'
                          },
                          name: {
                            type: 'string',
                            description: 'The previous name of the company'
                          }
                        }
                      }
                    },
                    matched_previous_company_name: {
                      title: 'Previous company name',
                      properties: {
                        company_number: {
                          type: 'string',
                          description:
                            'The company number of the dissolved company'
                        },
                        ceased_on: {
                          type: 'string',
                          format: 'date',
                          description:
                            'The date that the company ceased being known under the company name'
                        },
                        effective_from: {
                          type: 'string',
                          format: 'date',
                          description:
                            'The date that the company started being known under the company name'
                        },
                        name: {
                          type: 'string',
                          description: 'The previous name of the company'
                        }
                      }
                    }
                  }
                }
              },
              kind: {
                type: 'string',
                enum: [
                  'search#alphabetical-dissolved',
                  'search#dissolved',
                  'search#previous-name-dissolved'
                ]
              },
              top_hit: {
                allOf: [
                  {
                    title: 'Dissolved company',
                    required: [
                      'company_name',
                      'company_number',
                      'date_of_cessation',
                      'date_of_creation'
                    ],
                    properties: {
                      company_name: {
                        type: 'string',
                        description:
                          'The company name associated with the dissolved company'
                      },
                      company_number: {
                        type: 'string',
                        description:
                          'The company number of the dissolved company'
                      },
                      company_status: {
                        type: 'string',
                        description: 'The status of the company'
                      },
                      ordered_alpha_key_with_id: {
                        type: 'string',
                        description:
                          "The alphakey with it's id associated with the dissolved company"
                      },
                      kind: {
                        type: 'string',
                        enum: ['search-results#dissolved-company'],
                        description: 'The type of search result'
                      },
                      date_of_cessation: {
                        type: 'string',
                        format: 'date',
                        description: 'The date that the company was dissolved'
                      },
                      date_of_creation: {
                        type: 'string',
                        format: 'date',
                        description:
                          'The date that the company was incorporated'
                      },
                      registered_office_address: {
                        title: 'Registered Office Address',
                        description:
                          'This will only appear if there are ROA details in the company record',
                        properties: {
                          address_line_1: {
                            type: 'string',
                            description:
                              'The first line of the address e.g Crown Way'
                          },
                          address_line_2: {
                            type: 'string',
                            description: 'The second line of the address'
                          },
                          locality: {
                            type: 'string',
                            description:
                              'The town associated to the ROA e.g Cardiff'
                          },
                          postal_code: {
                            type: 'string',
                            description: 'The postal code e.g CF14 3UZ'
                          }
                        }
                      },
                      previous_company_names: {
                        type: 'array',
                        items: {
                          title: 'Previous company name',
                          properties: {
                            company_number: {
                              type: 'string',
                              description:
                                'The company number of the dissolved company'
                            },
                            ceased_on: {
                              type: 'string',
                              format: 'date',
                              description:
                                'The date that the company ceased being known under the company name'
                            },
                            effective_from: {
                              type: 'string',
                              format: 'date',
                              description:
                                'The date that the company started being known under the company name'
                            },
                            name: {
                              type: 'string',
                              description: 'The previous name of the company'
                            }
                          }
                        }
                      },
                      matched_previous_company_name: {
                        title: 'Previous company name',
                        properties: {
                          company_number: {
                            type: 'string',
                            description:
                              'The company number of the dissolved company'
                          },
                          ceased_on: {
                            type: 'string',
                            format: 'date',
                            description:
                              'The date that the company ceased being known under the company name'
                          },
                          effective_from: {
                            type: 'string',
                            format: 'date',
                            description:
                              'The date that the company started being known under the company name'
                          },
                          name: {
                            type: 'string',
                            description: 'The previous name of the company'
                          }
                        }
                      }
                    }
                  },
                  {
                    description:
                      'The best matching company in dissolved search results'
                  }
                ]
              },
              hits: {
                type: 'string',
                description:
                  'The number of hits returned on a best-match or previous-company-names search'
              }
            }
          }
        ]
      }
    }
  }
} as const

export type SearchDissolvedCompaniesResponse = FromSchema<
  typeof SearchDissolvedCompaniesSchema['schema']['response']['200']
>
//export type SearchDissolvedCompaniesResponse = any // temporary until schemas can be fixed
