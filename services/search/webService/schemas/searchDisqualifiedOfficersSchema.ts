import { FromSchema } from 'json-schema-to-ts'

export interface SearchDisqualifiedOfficersParams {}

export interface SearchDisqualifiedOfficersQueryString {
  /** The term being searched for. */
  q: string
  /** The number of search results to return per page. */
  items_per_page?: number
  /** The index of the first result item to return. */
  start_index?: number
}

export const SearchDisqualifiedOfficersSchema = {
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
        items_per_page: {
          type: 'integer'
        },
        start_index: {
          type: 'integer'
        }
      },
      required: ['q']
    },
    response: {
      '200': {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                kind: {
                  type: 'string'
                },
                address: {
                  type: 'object',
                  properties: {
                    locality: {
                      type: 'string'
                    },
                    country: {
                      type: 'string'
                    },
                    premises: {
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
                    region: {
                      type: 'string'
                    }
                  }
                },
                description_identifiers: {
                  anyOf: [
                    {
                      type: 'string',
                      description:
                        'An array of enumeration types that make up the search description. See search_descriptions_raw.yaml in api-enumerations.',
                      enum: ['born-on']
                    },
                    {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  ]
                },
                date_of_birth: {
                  type: 'string'
                },
                title: {
                  type: 'string'
                },
                address_snippet: {
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
                description: {
                  type: 'string'
                },
                matches: {
                  type: 'object',
                  properties: {
                    snippet: {
                      type: 'array'
                    },
                    title: {
                      type: 'array',
                      items: {
                        type: 'integer'
                      }
                    }
                  },
                  required: ['snippet', 'title']
                },
                snippet: {
                  type: 'string'
                }
              },
              required: [
                'kind',
                'address',
                'title',
                'address_snippet',
                'description'
              ]
            }
          },
          items_per_page: {
            type: 'integer'
          },
          kind: {
            type: 'string'
          },
          page_number: {
            type: 'integer'
          },
          start_index: {
            type: 'integer'
          },
          total_results: {
            type: 'integer'
          }
        },
        required: ['items_per_page', 'kind', 'start_index', 'total_results'],
        additionalProperties: false,
        title: 'searchDisqualifiedOfficers',
        example: {
          items: [],
          items_per_page: 20,
          kind: 'search#disqualified-officers',
          page_number: 1,
          start_index: 0,
          total_results: 0
        }
      }
    }
  }
} as const

export type SearchDisqualifiedOfficersResponse = FromSchema<
  typeof SearchDisqualifiedOfficersSchema['schema']['response']['200']
>
//export type SearchDisqualifiedOfficersResponse = any // temporary until schemas can be fixed
