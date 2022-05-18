export interface SearchDisqualifiedOfficersParams {

}

export interface SearchDisqualifiedOfficersQueryString {
  /** The term being searched for. */
  q: string;
  /** The number of search results to return per page. */
  items_per_page?: number;
  /** The index of the first result item to return. */
  start_index?: number
}

export const SearchDisqualifiedOfficersSchema = {
  schema: {
    "params": {
      "type": "object",
      "properties": {},
      "required": []
    },
    "querystring": {
      "type": "object",
      "properties": {
        "q": {
          "type": "string"
        },
        "items_per_page": {
          "type": "integer"
        },
        "start_index": {
          "type": "integer"
        }
      },
      "required": [
        "q"
      ]
    },
    "response": {
      "200": {
        "title": "DisqualifiedOfficerSearch",
        "allOf": [
          {
            "properties": {
              "total_results": {
                "type": "integer",
                "description": "The number of further search results available for the current search."
              },
              "start_index": {
                "type": "integer",
                "description": "The index into the entire result set that this result page starts."
              },
              "items_per_page": {
                "type": "integer",
                "description": "The number of search items returned per page."
              },
              "etag": {
                "type": "string",
                "description": "The ETag of the resource"
              }
            },
            "type": "object"
          }
        ],
        "required": [
          "kind",
          "total_results",
          "start_index",
          "items_per_page"
        ],
        "properties": {
          "kind": {
            "type": "string",
            "description": "The type of response returned.",
            "enum": [
              "search#disqualified-officers"
            ]
          },
          "items": {
            "type": "array",
            "description": "The results of the completed search.",
            "items": {
              "title": "DisqualifiedOfficerSearchItems",
              "allOf": [
                {
                  "properties": {
                    "title": {
                      "type": "string",
                      "description": "The title of the search result."
                    },
                    "address_snippet": {
                      "type": "string",
                      "description": "A single line address. This will be the address that matched within the indexed document or the primary address otherwise (as returned by the `address` member)."
                    },
                    "links": {
                      "type": "array",
                      "description": "The URL of the search result.",
                      "items": {
                        "title": "LinksModel",
                        "properties": {
                          "self": {
                            "type": "string",
                            "description": "The URL of the resource being returned by the search item."
                          }
                        },
                        "type": "object"
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "The result description."
                    },
                    "snippet": {
                      "type": "string",
                      "description": "Summary information for the result showing additional details that have matched."
                    },
                    "matches": {
                      "type": "array",
                      "description": "A list of members and arrays of character offset defining substrings that matched the search terms.",
                      "items": {
                        "title": "MatchesModel",
                        "properties": {
                          "title": {
                            "items": {
                              "type": "integer"
                            },
                            "type": "array",
                            "description": "An array of character offset into the `title` string. These always occur in pairs and define the start and end of substrings in the member `title` that matched the search terms. The first character of the string is index 1."
                          },
                          "snippet": {
                            "items": {
                              "type": "integer"
                            },
                            "type": "array",
                            "description": "An array of character offset into the `snippet` string. These always occur in pairs and define the start and end of substrings in the member `snippet` that matched the search terms. The first character of the string is index 1."
                          },
                          "address_snippet": {
                            "items": {
                              "type": "integer"
                            },
                            "type": "array",
                            "description": "An array of character offset into the `address_snippet` string. These always occur in pairs and define the start and end of substrings in the member `address_snippet` that matched the search terms."
                          }
                        },
                        "type": "object"
                      }
                    }
                  },
                  "type": "object"
                }
              ],
              "required": [
                "kind",
                "title",
                "description",
                "address",
                "address_snippet"
              ],
              "properties": {
                "kind": {
                  "type": "string",
                  "description": "Describes the type of result returned.",
                  "enum": [
                    "searchresults#disqualified-officer"
                  ]
                },
                "date_of_birth": {
                  "type": "string",
                  "format": "date",
                  "description": "The disqualified officer's date of birth."
                },
                "description_identifiers": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": [
                      "born-on"
                    ]
                  },
                  "description": "An array of enumeration types that make up the search description. See search_descriptions_raw.yaml in api-enumerations."
                },
                "address": {
                  "type": "array",
                  "description": "The address of the disqualified officer as provided by the disqualifying authority.",
                  "items": {
                    "title": "DisqualifiedOfficerAddress",
                    "properties": {
                      "address_line_1": {
                        "description": "The first line of the address.",
                        "type": "string"
                      },
                      "address_line_2": {
                        "description": "The second line of the address.",
                        "type": "string"
                      },
                      "country": {
                        "description": "The country. For example UK.",
                        "type": "string"
                      },
                      "locality": {
                        "description": "The locality. For example London.",
                        "type": "string"
                      },
                      "postal_code": {
                        "description": "The postal code. For example CF14 3UZ.",
                        "type": "string"
                      },
                      "premises": {
                        "description": "The property name or number.",
                        "type": "string"
                      },
                      "region": {
                        "description": "The region. For example Surrey.",
                        "type": "string"
                      }
                    },
                    "type": "object"
                  }
                }
              },
              "type": "object"
            }
          },
          "type": "array"
        },
        "type": "object"
      }
    }
  }
} as const

// export type SearchDisqualifiedOfficersResponse = FromSchema<typeof SearchDisqualifiedOfficersSchema['schema']['response']['200']>
export type SearchDisqualifiedOfficersResponse = any

