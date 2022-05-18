import {FromSchema} from "json-schema-to-ts";

export interface GetInsolvencyParams {
  /** The company number that the insolvency list is required for. */
  company_number: string
}

export interface GetInsolvencyQueryString {

}

export const GetInsolvencySchema = {
  schema: {
    "params": {
      "type": "object",
      "properties": {
        "company_number": {
          "type": "string"
        }
      },
      "required": [
        "company_number"
      ]
    },
    "querystring": {
      "type": "object",
      "properties": {},
      "required": []
    },
    "response": {
      "200": {
        "title": "companyInsolvency",
        "required": [
          "etag",
          "cases",
          "status"
        ],
        "properties": {
          "etag": {
            "description": "The ETag of the resource.",
            "type": "string"
          },
          "cases": {
            "type": "array",
            "description": "List of insolvency cases.",
            "items": {
              "title": "case",
              "required": [
                "type",
                "dates",
                "practitioners"
              ],
              "properties": {
                "type": {
                  "type": "string",
                  "enum": [
                    "compulsory-liquidation",
                    "creditors-voluntary-liquidation",
                    "members-voluntary-liquidation",
                    "in-administration",
                    "corporate-voluntary-arrangement",
                    "corporate-voluntary-arrangement-moratorium",
                    "administration-order",
                    "receiver-manager",
                    "administrative-receiver",
                    "receivership",
                    "foreign-insolvency"
                  ],
                  "description": "The type of case.\n For enumeration descriptions see `insolvency_case_type` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)."
                },
                "dates": {
                  "type": "array",
                  "description": "The dates specific to the case.",
                  "items": {
                    "title": "caseDates",
                    "required": [
                      "type",
                      "date"
                    ],
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Describes what date is represented by the associated `date` element.\n For enumeration descriptions see `insolvency_case_date_type` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/constants.yml).",
                        "enum": [
                          "instrumented-on",
                          "administration-started-on",
                          "administration-discharged-on",
                          "administration-ended-on",
                          "concluded-winding-up-on",
                          "petitioned-on",
                          "ordered-to-wind-up-on",
                          "due-to-be-dissolved-on",
                          "case-end-on",
                          "wound-up-on",
                          "voluntary-arrangement-started-on",
                          "voluntary-arrangement-ended-on",
                          "moratorium-started-on",
                          "moratorium-ended-on",
                          "declaration-solvent-on"
                        ]
                      },
                      "date": {
                        "type": "string",
                        "format": "date",
                        "description": "The case date, described by `date_type`."
                      }
                    },
                    "type": "object"
                  }
                },
                "notes": {
                  "type": "array",
                  "description": "The dates specific to the case.",
                  "items": {
                    "type": "string"
                  }
                },
                "practitioners": {
                  "type": "array",
                  "description": "The practitioners for the case.",
                  "items": {
                    "title": "practitioners",
                    "required": [
                      "name",
                      "address"
                    ],
                    "properties": {
                      "name": {
                        "description": "The name of the practitioner.",
                        "type": "string"
                      },
                      "address": {
                        "type": "array",
                        "description": "The practitioners' address.",
                        "items": {
                          "title": "practitionerAddress",
                          "required": [
                            "address_line_1",
                            "postal_code"
                          ],
                          "properties": {
                            "address_line_1": {
                              "type": "string",
                              "description": "The first line of the address."
                            },
                            "address_line_2": {
                              "type": "string",
                              "description": "The second line of the address."
                            },
                            "locality": {
                              "type": "string",
                              "description": "The locality. For example London."
                            },
                            "region": {
                              "type": "string",
                              "description": "The region. For example Surrey."
                            },
                            "postal_code": {
                              "type": "string",
                              "description": "The postal code. For example CF14 3UZ."
                            },
                            "country": {
                              "type": "string",
                              "description": "The country."
                            }
                          },
                          "type": "object"
                        }
                      },
                      "appointed_on": {
                        "type": "string",
                        "format": "date",
                        "description": "The date the practitioner was appointed on."
                      },
                      "ceased_to_act_on": {
                        "type": "string",
                        "format": "date",
                        "description": "The date the practitioner ceased to act for the case."
                      },
                      "role": {
                        "type": "string",
                        "description": "The type of role.",
                        "enum": [
                          "final-liquidator",
                          "receiver",
                          "receiver-manager",
                          "proposed-liquidator",
                          "provisional-liquidator",
                          "administrative-receiver",
                          "practitioner",
                          "interim-liquidator"
                        ]
                      }
                    },
                    "type": "object"
                  }
                },
                "links": {
                  "type": "array",
                  "description": "The practitioners for the case.",
                  "items": {
                    "title": "links",
                    "properties": {
                      "charge": {
                        "type": "string",
                        "description": "The link to the charge this case is lodged against."
                      }
                    },
                    "type": "object"
                  }
                },
                "number": {
                  "type": "integer",
                  "description": "The case number."
                }
              },
              "type": "object"
            }
          },
          "status": {
            "type": "string",
            "description": "Company insolvency status details",
            "enum": [
              "live-propopsed-transfer-from-gb",
              "voluntary-arrangement",
              "voluntary-arrangement-receivership",
              "live-receiver-manager-on-at-least-one-charge",
              "receiver-manager-or-administrative-receiver",
              "receiver-manager",
              "administrative-receiver",
              "administration-order",
              "receivership",
              "in-administration"
            ]
          }
        },
        "type": "object"
      }
    }
  }
} as const

export type GetInsolvencyResponse = FromSchema<typeof GetInsolvencySchema['schema']['response']['200']>

