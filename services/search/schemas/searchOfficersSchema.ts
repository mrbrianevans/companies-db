import { FromSchema } from 'json-schema-to-ts'

export interface SearchOfficersParams {}

export interface SearchOfficersQueryString {
  /** The term being searched for. */
  q: string
  /** The number of search results to return per page. */
  items_per_page?: number
  /** The index of the first result item to return. */
  start_index?: number
}

export const SearchOfficersSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {},
      required: [],
    },
    querystring: {
      type: 'object',
      properties: {
        q: {
          type: 'string',
        },
        items_per_page: {
          type: 'integer',
        },
        start_index: {
          type: 'integer',
        },
      },
      required: ['q'],
    },
    response: {
      '200': {
        title: 'OfficerSearch',
        allOf: [
          {
            properties: {
              total_results: {
                type: 'integer',
                description:
                  'The number of further search results available for the current search.',
              },
              start_index: {
                type: 'integer',
                description:
                  'The index into the entire result set that this result page starts.',
              },
              items_per_page: {
                type: 'integer',
                description: 'The number of search items returned per page.',
              },
              etag: {
                type: 'string',
                description: 'The ETag of the resource',
              },
            },
          },
        ],
        required: ['kind'],
        properties: {
          kind: {
            type: 'string',
            description: 'The type of response returned.',
            enum: ['search#officers'],
          },
          items: {
            type: 'object',
            description: 'The results of the completed search.',
            title: 'OfficerSearchItems',
            allOf: [
              {
                properties: {
                  title: {
                    type: 'string',
                    description: 'The title of the search result.',
                  },
                  address_snippet: {
                    type: 'string',
                    description:
                      'A single line address. This will be the address that matched within the indexed document or the primary address otherwise (as returned by the `address` member).',
                  },
                  links: {
                    type: 'object',
                    description: 'The URL of the search result.',
                    items: {
                      title: 'LinksModel',
                      properties: {
                        self: {
                          type: 'string',
                          description:
                            'The URL of the resource being returned by the search item.',
                        },
                      },
                    },
                  },
                  description: {
                    type: 'string',
                    description: 'The result description.',
                  },
                  snippet: {
                    type: 'string',
                    description:
                      'Summary information for the result showing additional details that have matched.',
                  },
                  matches: {
                    type: 'object',
                    description:
                      'A list of members and arrays of character offset defining substrings that matched the search terms.',
                    items: {
                      title: 'MatchesModel',
                      properties: {
                        title: {
                          items: {
                            type: 'integer',
                          },
                          type: 'array',
                          description:
                            'An array of character offset into the `title` string. These always occur in pairs and define the start and end of substrings in the member `title` that matched the search terms. The first character of the string is index 1.',
                        },
                        snippet: {
                          items: {
                            type: 'integer',
                          },
                          type: 'array',
                          description:
                            'An array of character offset into the `snippet` string. These always occur in pairs and define the start and end of substrings in the member `snippet` that matched the search terms. The first character of the string is index 1.',
                        },
                        address_snippet: {
                          items: {
                            type: 'integer',
                          },
                          type: 'array',
                          description:
                            'An array of character offset into the `address_snippet` string. These always occur in pairs and define the start and end of substrings in the member `address_snippet` that matched the search terms.',
                        },
                      },
                    },
                  },
                },
              },
            ],
            required: [
              'appointment_count',
              'description',
              'kind',
              'title',
              'address_snippet',
              'address',
            ],
            properties: {
              kind: {
                type: 'string',
                description: 'Describes the type of result returned.',
                enum: ['searchresults#officer'],
              },
              date_of_birth: {
                description: 'The officer date of birth details.',
                items: {
                  title: 'OfficerDateOfBirth',
                  required: ['month', 'year'],
                  properties: {
                    month: {
                      description: 'The month the officer was born in.',
                      type: 'integer',
                    },
                    year: {
                      description: 'The year the officer was born in.',
                      type: 'integer',
                    },
                  },
                },
              },
              appointment_count: {
                type: 'integer',
                description:
                  'The total number of appointments the officer has.',
              },
              description_identifiers: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: ['appointment-count', 'born-on'],
                },
                description:
                  'An array of enumeration types that make up the search description. See search_descriptions_raw.yaml in api-enumerations.',
              },
              address: {
                type: 'object',
                description: 'The service address of the officer.',
                items: {
                  title: 'OfficerAddress',
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
                      description: 'The country. For example UK.',
                      type: 'string',
                    },
                    locality: {
                      description: 'The locality. For example London.',
                      type: 'string',
                    },
                    po_box: {
                      description: 'The post-office box number.',
                      type: 'string',
                    },
                    postal_code: {
                      description: 'The postal code. For example CF14 3UZ.',
                      type: 'string',
                    },
                    premises: {
                      description: 'The property name or number.',
                      type: 'string',
                    },
                    region: {
                      description: 'The region. For example Surrey.',
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
        type: 'object',
      },
    },
  },
} as const

export type SearchOfficersResponse = FromSchema<
  typeof SearchOfficersSchema['schema']['response']['200']
>
//export type SearchOfficersResponse = any // temporary until schemas can be fixed
