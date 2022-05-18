export interface AdvancedCompanySearchParams {

}

export interface AdvancedCompanySearchQueryString {
  /** The company name (must contain) advanced search filter */
  company_name?: string;
  /** The company status advanced search filter. To search using multiple values, use a comma delimited list or multiple of the same key i.e. company_status=xxx&company_status=yyy */
  company_status?: undefined;
  /** The company subtype advanced search filter. To search using multiple values, use a comma delimited list or multiple of the same key i.e. company_subtype=xxx&company_subtype=yyy */
  company_subtype?: string;
  /** The company type advanced search filter. To search using multiple values, use a comma delimited list or multiple of the same key i.e. company_type=xxx&company_type=yyy */
  company_type?: undefined;
  /** The dissolved from date advanced search filter */
  dissolved_from?: undefined;
  /** The dissolved to date advanced search filter */
  dissolved_to?: undefined;
  /** The incorporated from date advanced search filter */
  incorporated_from?: undefined;
  /** The incorporated to date advanced search filter */
  incorporated_to?: undefined;
  /** The location advanced search filter */
  location?: string;
  /** The SIC codes advanced search filter. To search using multiple values, use a comma delimited list or multiple of the same key i.e. sic_codes=xxx&sic_codes=yyy */
  sic_codes?: undefined;
  /** The maximum number of results matching the search term(s) to return with a range of 1 to 5000 */
  size?: string;
  /** The point at which results will start from i.e show search results from result 20 (used for paging) */
  start_index?: string
}

export const AdvancedCompanySearchSchema = {
  schema: {
    "params": {
      "type": "object",
      "properties": {},
      "required": []
    },
    "querystring": {
      "type": "object",
      "properties": {
        "company_name": {
          "type": "string"
        },
        "company_status": {},
        "company_subtype": {
          "type": "string"
        },
        "company_type": {},
        "dissolved_from": {},
        "dissolved_to": {},
        "incorporated_from": {},
        "incorporated_to": {},
        "location": {
          "type": "string"
        },
        "sic_codes": {},
        "size": {
          "type": "string"
        },
        "start_index": {
          "type": "string"
        }
      },
      "required": []
    },
    "response": {
      "200": {
        "title": "A list of companies",
        "type": "object",
        "required": [
          "top_hit",
          "items",
          "kind",
          "hits"
        ],
        "allOf": [
          {
            "properties": {
              "etag": {
                "type": "string"
              },
              "items": {
                "type": "array",
                "items": {
                  "title": "advancedCompany",
                  "required": [
                    "company_name",
                    "company_number",
                    "company_status",
                    "company_type",
                    "date_of_creation",
                    "kind"
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
                      "description": "The status of the company.  \n For enumeration descriptions see `company_status` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)  ",
                      "type": "string",
                      "enum": [
                        "active",
                        "dissolved",
                        "open",
                        "closed",
                        "converted-closed",
                        "receivership",
                        "administration",
                        "liquidation",
                        "insolvency-proceedings",
                        "voluntary-arrangement"
                      ]
                    },
                    "company_type": {
                      "description": "The type of the company.  \n For enumeration descriptions see `company_type` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)    ",
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
                        "protected-cell-company",
                        "assurance-company",
                        "oversea-company",
                        "eeig",
                        "icvc-securities",
                        "icvc-warrant",
                        "icvc-umbrella",
                        "registered-society-non-jurisdictional",
                        "industrial-and-provident-society",
                        "northern-ireland",
                        "northern-ireland-other",
                        "royal-charter",
                        "investment-company-with-variable-capital",
                        "unregistered-company",
                        "llp",
                        "other",
                        "european-public-limited-liability-company-se",
                        "uk-establishment",
                        "scottish-partnership",
                        "charitable-incorporated-organisation",
                        "scottish-charitable-incorporated-organisation",
                        "further-education-or-sixth-form-college-corporation"
                      ],
                      "type": "string"
                    },
                    "company_subtype": {
                      "description": "The subtype of the company.  \n For enumeration descriptions see `company_subtype` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)",
                      "type": "string",
                      "enum": [
                        "community-interest-company",
                        "private-fund-limited-partnership"
                      ]
                    },
                    "kind": {
                      "type": "string",
                      "enum": [
                        "search-results#company"
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
                    "date_of_cessation": {
                      "type": "string",
                      "format": "date",
                      "description": "The date that the company was dissolved"
                    },
                    "date_of_creation": {
                      "type": "string",
                      "format": "date",
                      "description": "The date that the company was incorporated"
                    },
                    "registered_office_address": {
                      "title": "Registered Office Address",
                      "description": "This will only appear if there are ROA details in the company record",
                      "properties": {
                        "address_line_1": {
                          "type": "string",
                          "description": "The first line of the address e.g Crown Way"
                        },
                        "address_line_2": {
                          "type": "string",
                          "description": "The second line of the address"
                        },
                        "locality": {
                          "type": "string",
                          "description": "The town associated to the ROA e.g Cardiff"
                        },
                        "postal_code": {
                          "type": "string",
                          "description": "The postal code e.g CF14 3UZ"
                        },
                        "region": {
                          "description": "The region e.g Surrey.",
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
                        }
                      },
                      "type": "object"
                    },
                    "sic_codes": {
                      "items": {
                        "type": "string"
                      },
                      "type": "array",
                      "description": "SIC codes for this company"
                    }
                  },
                  "type": "object"
                }
              },
              "kind": {
                "type": "string",
                "enum": [
                  "search#advanced-search"
                ]
              },
              "top_hit": {
                "allOf": [
                  {
                    "title": "advancedCompany",
                    "required": [
                      "company_name",
                      "company_number",
                      "company_status",
                      "company_type",
                      "date_of_creation",
                      "kind"
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
                        "description": "The status of the company.  \n For enumeration descriptions see `company_status` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)  ",
                        "type": "string",
                        "enum": [
                          "active",
                          "dissolved",
                          "open",
                          "closed",
                          "converted-closed",
                          "receivership",
                          "administration",
                          "liquidation",
                          "insolvency-proceedings",
                          "voluntary-arrangement"
                        ]
                      },
                      "company_type": {
                        "description": "The type of the company.  \n For enumeration descriptions see `company_type` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)    ",
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
                          "protected-cell-company",
                          "assurance-company",
                          "oversea-company",
                          "eeig",
                          "icvc-securities",
                          "icvc-warrant",
                          "icvc-umbrella",
                          "registered-society-non-jurisdictional",
                          "industrial-and-provident-society",
                          "northern-ireland",
                          "northern-ireland-other",
                          "royal-charter",
                          "investment-company-with-variable-capital",
                          "unregistered-company",
                          "llp",
                          "other",
                          "european-public-limited-liability-company-se",
                          "uk-establishment",
                          "scottish-partnership",
                          "charitable-incorporated-organisation",
                          "scottish-charitable-incorporated-organisation",
                          "further-education-or-sixth-form-college-corporation"
                        ],
                        "type": "string"
                      },
                      "company_subtype": {
                        "description": "The subtype of the company.  \n For enumeration descriptions see `company_subtype` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)",
                        "type": "string",
                        "enum": [
                          "community-interest-company",
                          "private-fund-limited-partnership"
                        ]
                      },
                      "kind": {
                        "type": "string",
                        "enum": [
                          "search-results#company"
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
                      "date_of_cessation": {
                        "type": "string",
                        "format": "date",
                        "description": "The date that the company was dissolved"
                      },
                      "date_of_creation": {
                        "type": "string",
                        "format": "date",
                        "description": "The date that the company was incorporated"
                      },
                      "registered_office_address": {
                        "title": "Registered Office Address",
                        "description": "This will only appear if there are ROA details in the company record",
                        "properties": {
                          "address_line_1": {
                            "type": "string",
                            "description": "The first line of the address e.g Crown Way"
                          },
                          "address_line_2": {
                            "type": "string",
                            "description": "The second line of the address"
                          },
                          "locality": {
                            "type": "string",
                            "description": "The town associated to the ROA e.g Cardiff"
                          },
                          "postal_code": {
                            "type": "string",
                            "description": "The postal code e.g CF14 3UZ"
                          },
                          "region": {
                            "description": "The region e.g Surrey.",
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
                          }
                        },
                        "type": "object"
                      },
                      "sic_codes": {
                        "items": {
                          "type": "string"
                        },
                        "type": "array",
                        "description": "SIC codes for this company"
                      }
                    },
                    "type": "object"
                  },
                  {
                    "description": "The best matching company in an advanced search results"
                  }
                ]
              },
              "hits": {
                "type": "string",
                "description": "The number of matches found using advanced search"
              },
              "type": "array"
            },
            "type": "object"
          }
        ]
      }
    }
  }
} as const

// export type AdvancedCompanySearchResponse = FromSchema<typeof AdvancedCompanySearchSchema['schema']['response']['200']>
export type AdvancedCompanySearchResponse = any

