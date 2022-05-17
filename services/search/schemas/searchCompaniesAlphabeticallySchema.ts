import {FromSchema} from "json-schema-to-ts";

export interface searchCompaniesAlphabeticallyParams {

}

export interface searchCompaniesAlphabeticallyQueryString {
  /** The company name being searched for */
  q: string;
  /** The ordered_alpha_key_with_id used for paging */
  search_above?: string;
  /** The ordered_alpha_key_with_id used for paging */
  search_below?: string;
  /** The maximum number of results matching the search term(s) to return with a range of 1 to 100 */
  size?: string
}

export const searchCompaniesAlphabeticallySchema = {
  schema: {
    "params": {
      "type": "object",
      "properties": {},
      "required": []
    },
    "querystring": {
      "type": "object",
      "properties": {
        "undefined": {
          "type": "string"
        }
      },
      "required": [
        null
      ]
    },
    "response": {
      "200": {
        "title": "List of companies",
        "type": "object",
        "allOf": [
          {
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "title": "Alphabetical company",
                  "required": [
                    "company_name",
                    "company_number",
                    "company_status",
                    "company_type",
                    "links"
                  ],
                  "properties": {
                    "company_name": {
                      "type": "string",
                      "description": "The company name associated with the company"
                    },
                    "company_number": {
                      "type": "string",
                      "description": "The company number of the company"
                    },
                    "company_status": {
                      "type": "string",
                      "description": "The status of the company"
                    },
                    "ordered_alpha_key_with_id": {
                      "type": "string",
                      "description": "The alphakey with it's id associated with the company"
                    },
                    "kind": {
                      "type": "string",
                      "enum": [
                        "search-results#alphabetical-search"
                      ],
                      "description": "The type of search result"
                    },
                    "links": {
                      "type": "object",
                      "description": "The link to the company",
                      "properties": {
                        "company_profile": {
                          "type": "string",
                          "description": "The link to the company"
                        }
                      }
                    },
                    "company_type": {
                      "type": "string",
                      "description": "The type of company associated with the company"
                    }
                  }
                }
              },
              "kind": {
                "type": "string",
                "enum": [
                  "search#alphabetical-search",
                  "search#enhanced-search"
                ]
              },
              "top_hit": {
                "allOf": [
                  {
                    "title": "Alphabetical company",
                    "required": [
                      "company_name",
                      "company_number",
                      "company_status",
                      "company_type",
                      "links"
                    ],
                    "properties": {
                      "company_name": {
                        "type": "string",
                        "description": "The company name associated with the company"
                      },
                      "company_number": {
                        "type": "string",
                        "description": "The company number of the company"
                      },
                      "company_status": {
                        "type": "string",
                        "description": "The status of the company"
                      },
                      "ordered_alpha_key_with_id": {
                        "type": "string",
                        "description": "The alphakey with it's id associated with the company"
                      },
                      "kind": {
                        "type": "string",
                        "enum": [
                          "search-results#alphabetical-search"
                        ],
                        "description": "The type of search result"
                      },
                      "links": {
                        "type": "object",
                        "description": "The link to the company",
                        "properties": {
                          "company_profile": {
                            "type": "string",
                            "description": "The link to the company"
                          }
                        }
                      },
                      "company_type": {
                        "type": "string",
                        "description": "The type of company associated with the company"
                      }
                    }
                  },
                  {
                    "description": "The best matching company in alphabetical search results"
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
} as const

export type searchCompaniesAlphabeticallyResponse = FromSchema<typeof searchCompaniesAlphabeticallySchema['schema']['response']['200']>

