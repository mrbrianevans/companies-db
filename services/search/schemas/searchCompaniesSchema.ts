import {FromSchema} from "json-schema-to-ts";

export interface searchCompaniesParams {

}

export interface searchCompaniesQueryString {
  /** The term being searched for. */
  q: string;
  /** The number of search results to return per page. */
  items_per_page?: number;
  /** The index of the first result item to return. */
  start_index?: number;
  /** Enumerable options to restrict search results. Space separate multiple restriction options to combine functionality. For a "company name availability" search use "active-companies legally-equivalent-company-name" together. */
  restrictions?: string
}

export const searchCompaniesSchema = {
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
        "title": "CompanySearch",
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
            }
          }
        ],
        "properties": {
          "kind": {
            "type": "string",
            "description": "The type of search response returned.",
            "enum": [
              "search#companies"
            ]
          },
          "items": {
            "type": "array",
            "description": "The results of the completed search.",
            "items": {
              "title": "CompanySearchItems",
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
                      "type": "object",
                      "description": "The URL of the search result.",
                      "items": {
                        "title": "LinksModel",
                        "properties": {
                          "self": {
                            "type": "string",
                            "description": "The URL of the resource being returned by the search item."
                          }
                        }
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
                      "type": "object",
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
                        }
                      }
                    }
                  }
                }
              ],
              "required": [
                "kind",
                "title",
                "address_snippet",
                "links",
                "company_number",
                "date_of_creation",
                "company_type",
                "company_status",
                "address"
              ],
              "properties": {
                "kind": {
                  "type": "string",
                  "description": "The type of search result.",
                  "enum": [
                    "searchresults#company"
                  ]
                },
                "description_identifier": {
                  "items": {
                    "type": "string",
                    "enum": [
                      "incorporated-on",
                      "registered-on",
                      "formed-on",
                      "dissolved-on",
                      "converted-closed-on",
                      "closed-on",
                      "closed",
                      "first-uk-establishment-opened-on",
                      "opened-on",
                      "voluntary-arrangement",
                      "receivership",
                      "insolvency-proceedings",
                      "liquidation",
                      "administration"
                    ]
                  },
                  "type": "array",
                  "description": "An array of enumeration types that make up the search description. See search_descriptions_raw.yaml in api-enumerations"
                },
                "company_number": {
                  "type": "string",
                  "description": "The company registration / incorporation number of the company."
                },
                "date_of_creation": {
                  "type": "string",
                  "format": "date",
                  "description": "The date the company was created."
                },
                "date_of_cessation": {
                  "type": "string",
                  "format": "date",
                  "description": "The date the company ended."
                },
                "company_type": {
                  "type": "string",
                  "enum": [
                    "private-unlimited",
                    "ltd",
                    "plc",
                    "old-public-company",
                    "private-limited-guarant-nsc-limited-exemption",
                    "limited-partnership",
                    "private-limited-guarant-nsc",
                    "converted-or-closed",
                    "private-unlimited-nsc",
                    "private-limited-shares-section-30-exemption",
                    "assurance-company",
                    "oversea-company",
                    "eeig",
                    "icvc-securities",
                    "icvc-warrant",
                    "icvc-umbrella",
                    "industrial-and-provident-society",
                    "northern-ireland",
                    "northern-ireland-other",
                    "royal-charter",
                    "investment-company-with-variable-capital",
                    "unregistered-company",
                    "llp",
                    "other",
                    "european-public-limited-liability-company-se"
                  ],
                  "description": "The company type."
                },
                "company_status": {
                  "type": "string",
                  "enum": [
                    "active",
                    "dissolved",
                    "liquidation",
                    "receivership",
                    "administration",
                    "voluntary-arrangement",
                    "converted-closed",
                    "insolvency-proceedings"
                  ],
                  "description": "The company status."
                },
                "address": {
                  "description": "The address of the company's registered office.",
                  "type": "object",
                  "items": {
                    "title": "registeredOfficeAddress",
                    "required": [
                      "address_line_1"
                    ],
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
                        "description": "The country.",
                        "enum": [
                          "Wales",
                          "England",
                          "Scotland",
                          "Great Britain",
                          "Not specified",
                          "United Kingdom",
                          "Northern Ireland"
                        ],
                        "type": "string"
                      },
                      "locality": {
                        "description": "The locality e.g London.",
                        "type": "string"
                      },
                      "po_box": {
                        "description": "The post-office box number.",
                        "type": "string"
                      },
                      "postal_code": {
                        "description": "The postal code e.g CF14 3UZ.",
                        "type": "string"
                      },
                      "care_of": {
                        "description": "The care of name.",
                        "type": "string"
                      },
                      "region": {
                        "description": "The region e.g Surrey.",
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "type": "object"
      }
    }
  }
} as const

export type searchCompaniesResponse = FromSchema<typeof searchCompaniesSchema['schema']['response']['200']>

