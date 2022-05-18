export interface GetNaturalOfficerParams {
  /** The disqualified officer's id. */
  officer_id: string
}

export interface GetNaturalOfficerQueryString {

}

export const GetNaturalOfficerSchema = {
  schema: {
    "params": {
      "type": "object",
      "properties": {
        "officer_id": {
          "type": "string"
        }
      },
      "required": [
        "officer_id"
      ]
    },
    "querystring": {
      "type": "object",
      "properties": {},
      "required": []
    },
    "response": {
      "200": {
        "title": "naturalDisqualification",
        "required": [
          "disqualifications",
          "etag",
          "kind",
          "links",
          "surname"
        ],
        "properties": {
          "date_of_birth": {
            "description": "The disqualified officer's date of birth.",
            "type": "string",
            "format": "date"
          },
          "etag": {
            "description": "The ETag of the resource.",
            "type": "string"
          },
          "forename": {
            "description": "The forename of the disqualified officer.",
            "type": "string"
          },
          "honours": {
            "description": "The honours that the disqualified officer has.",
            "type": "string"
          },
          "kind": {
            "type": "string",
            "enum": [
              "natural-disqualification"
            ]
          },
          "nationality": {
            "description": "The nationality of the disqualified officer.",
            "type": "string"
          },
          "other_forenames": {
            "description": "The other forenames of the disqualified officer.",
            "type": "string"
          },
          "surname": {
            "description": "The surname of the disqualified officer.",
            "type": "string"
          },
          "title": {
            "description": "The title of the disqualified officer.",
            "type": "string"
          },
          "links": {
            "description": "Links to other resources associated with this officer disqualification resource.",
            "type": "array",
            "items": {
              "title": "links",
              "properties": {
                "self": {
                  "description": "Link to this disqualification resource.",
                  "type": "string"
                }
              },
              "required": [
                "self"
              ],
              "type": "object"
            }
          },
          "disqualifications": {
            "description": "The officer's disqualifications.",
            "type": "array",
            "items": {
              "title": "disqualification",
              "properties": {
                "case_identifier": {
                  "description": "The case identifier of the disqualification.",
                  "type": "string"
                },
                "address": {
                  "description": "The address of the disqualified officer as provided by the disqualifying authority.",
                  "type": "array",
                  "items": {
                    "title": "address",
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
                        "description": "The country. For example, UK.",
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
                },
                "company_names": {
                  "description": "The companies in which the misconduct took place.",
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "court_name": {
                  "description": "The name of the court that handled the disqualification case.",
                  "type": "string"
                },
                "disqualification_type": {
                  "description": "An enumeration type that provides the disqualifying authority that handled the disqualification case.\n For enumeration descriptions see `disqualification_type` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/disqualified_officer_descriptions.yml)",
                  "type": "string"
                },
                "disqualified_from": {
                  "description": "The date that the disqualification starts.",
                  "type": "string",
                  "format": "date"
                },
                "disqualified_until": {
                  "description": "The date that the disqualification ends.",
                  "type": "string",
                  "format": "date"
                },
                "heard_on": {
                  "description": "The date the disqualification hearing was on.",
                  "type": "string",
                  "format": "date"
                },
                "undertaken_on": {
                  "description": "The date the disqualification undertaking was agreed on.",
                  "type": "string",
                  "format": "date"
                },
                "last_variation": {
                  "description": "The latest variation made to the disqualification.",
                  "type": "array",
                  "items": {
                    "title": "last_variation",
                    "properties": {
                      "varied_on": {
                        "description": "The date the variation was made against the disqualification.",
                        "type": "string",
                        "format": "date"
                      },
                      "case_identifier": {
                        "description": "The case identifier of the variation.",
                        "type": "string"
                      },
                      "court_name": {
                        "description": "The name of the court that handled the variation case.",
                        "type": "string"
                      }
                    },
                    "type": "object"
                  }
                },
                "reason": {
                  "description": "The reason for the disqualification.",
                  "type": "array",
                  "items": {
                    "title": "reason",
                    "properties": {
                      "description_identifier": {
                        "description": "An enumeration type that provides the description for the reason of disqualification.\n For enumeration descriptions see `description_identifier` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/disqualified_officer_descriptions.yml)",
                        "type": "string"
                      },
                      "act": {
                        "description": "An enumeration type that provides the law under which the disqualification was made.\n For enumeration descriptions see `act` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/disqualified_officer_descriptions.yml)",
                        "type": "string"
                      },
                      "article": {
                        "description": "The article of the act under which the disqualification was made.\n Only applicable if `reason.act` is `company-directors-disqualification-northern-ireland-order-2002`.",
                        "type": "string"
                      },
                      "section": {
                        "description": "The section of the act under which the disqualification was made.\n Only applicable if `reason.act` is `company-directors-disqualification-act-1986`.",
                        "type": "string"
                      }
                    },
                    "required": [
                      "description_identifier",
                      "act"
                    ],
                    "type": "object"
                  }
                }
              },
              "required": [
                "address",
                "disqualification_type",
                "disqualified_from",
                "disqualified_until",
                "reason"
              ],
              "type": "object"
            }
          },
          "permissions_to_act": {
            "description": "Permissions to act that have been granted for the disqualified officer.",
            "type": "array",
            "items": {
              "title": "permission_to_act",
              "required": [
                "expires_on",
                "granted_on"
              ],
              "properties": {
                "company_names": {
                  "description": "The companies for which the disqualified officer has permission to act.",
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "court_name": {
                  "description": "The name of the court that granted the permission to act.",
                  "type": "string"
                },
                "expires_on": {
                  "description": "The date that the permission ends.",
                  "type": "string",
                  "format": "date"
                },
                "granted_on": {
                  "description": "The date that the permission starts.",
                  "type": "string",
                  "format": "date"
                }
              },
              "type": "object"
            }
          }
        },
        "type": "object"
      }
    }
  }
} as const

// export type GetNaturalOfficerResponse = FromSchema<typeof GetNaturalOfficerSchema['schema']['response']['200']>
export type GetNaturalOfficerResponse = any

