export interface GetChargesParams {
  /** The company number of the company with the charge. */
  company_number: string;
  /** The charge id of the charge being requested. */
  charge_id: string
}

export interface GetChargesQueryString {

}

export const GetChargesSchema = {
  schema: {
    "params": {
      "type": "object",
      "properties": {
        "company_number": {
          "type": "string"
        },
        "charge_id": {
          "type": "string"
        }
      },
      "required": [
        "company_number",
        "charge_id"
      ]
    },
    "querystring": {
      "type": "object",
      "properties": {},
      "required": []
    },
    "response": {
      "200": {
        "title": "chargeDetails",
        "required": [
          "etag",
          "status",
          "classification",
          "charge_number"
        ],
        "properties": {
          "etag": {
            "type": "string"
          },
          "id": {
            "type": "string",
            "description": "The id of the charge"
          },
          "charge_code": {
            "type": "string",
            "description": "The charge code is a replacement of the mortgage description"
          },
          "classification": {
            "type": "array",
            "description": "Classification information",
            "items": {
              "title": "classificationDesc",
              "required": [
                "type",
                "description"
              ],
              "properties": {
                "type": {
                  "enum": [
                    "charge-description",
                    "nature-of-charge"
                  ],
                  "type": "string",
                  "description": "The type of charge classication.\n For enumeration descriptions see `classificationDesc` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/mortgage_descriptions.yml)"
                },
                "description": {
                  "type": "string",
                  "description": "Details of the charge classification"
                }
              },
              "type": "object"
            }
          },
          "charge_number": {
            "type": "integer",
            "description": "The charge number is used to reference an individual charge"
          },
          "status": {
            "enum": [
              "outstanding",
              "fully-satisfied",
              "part-satisfied",
              "satisfied"
            ],
            "type": "string",
            "description": "The status of the charge.\n For enumeration descriptions see `status` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/mortgage_descriptions.yml)"
          },
          "assests_ceased_released": {
            "enum": [
              "property-ceased-to-belong",
              "part-property-release-and-ceased-to-belong",
              "part-property-released",
              "part-property-ceased-to-belong",
              "whole-property-released",
              "multiple-filings",
              "whole-property-released-and-ceased-to-belong"
            ],
            "type": "string",
            "description": "Cease/release information about the charge.\n For enumeration descriptions see `assets-ceased-released` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/mortgage_descriptions.yml)"
          },
          "acquired_on": {
            "type": "string",
            "format": "date",
            "description": "The date the property or undertaking was acquired on"
          },
          "delivered_on": {
            "type": "string",
            "format": "date",
            "description": "The date the charge was submitted to Companies House"
          },
          "resolved_on": {
            "type": "string",
            "format": "date",
            "description": "The date the issue was resolved on"
          },
          "covering_instrument_date": {
            "type": "string",
            "format": "date",
            "description": "The date by which the series of debentures were created"
          },
          "created_on": {
            "type": "string",
            "format": "date",
            "description": "The date the charge was created"
          },
          "satisfied_on": {
            "type": "string",
            "format": "date",
            "description": "The date the charge was satisfied"
          },
          "particulars": {
            "type": "array",
            "description": "Details of charge or undertaking",
            "items": {
              "title": "particularDesc",
              "required": [
                "type",
                "description"
              ],
              "properties": {
                "type": {
                  "enum": [
                    "short-particulars",
                    "charged-property-description",
                    "charged-property-or-undertaking-description",
                    "brief-description"
                  ],
                  "type": "string",
                  "description": "The type of charge particulars.\n For enumeration descriptions see `particular-description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/mortgage_descriptions.yml)"
                },
                "description": {
                  "type": "string",
                  "description": "Details of charge particulars"
                },
                "contains_floating_charge": {
                  "type": "boolean",
                  "description": "The charge contains a floating charge"
                },
                "contains_fixed_charge": {
                  "type": "boolean",
                  "description": "The charge contains a fixed charge"
                },
                "floating_charge_covers_all": {
                  "type": "boolean",
                  "description": "The floating charge covers all the property or undertaking or the company"
                },
                "contains_negative_pledge": {
                  "type": "boolean",
                  "description": "The charge contains a negative pledge"
                },
                "chargor_acting_as_bare_trustee": {
                  "type": "boolean",
                  "description": "The chargor is acting as a bare trustee for the property"
                }
              },
              "type": "object"
            }
          },
          "secured_details": {
            "type": "array",
            "description": "Information about what is secured against this charge",
            "items": {
              "title": "securedDetailsDesc",
              "required": [
                "type",
                "description"
              ],
              "properties": {
                "type": {
                  "enum": [
                    "amount-secured",
                    "obligations-secured"
                  ],
                  "type": "string",
                  "description": "The type of secured details.\n For enumeration descriptions see `secured-details-description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/mortgage_descriptions.yml)"
                },
                "description": {
                  "type": "string",
                  "description": "Details of the amount or obligation secured by the charge"
                }
              },
              "type": "object"
            }
          },
          "scottish_alterations": {
            "type": "array",
            "items": {
              "title": "alterationsDesc",
              "required": [
                "type",
                "description"
              ],
              "properties": {
                "type": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "has_alterations_to_order": {
                  "type": "boolean",
                  "description": "The charge has alterations to order"
                },
                "has_alterations_to_prohibitions": {
                  "type": "boolean",
                  "description": "The charge has alterations to prohibitions"
                },
                "has_alterations_to_provisions": {
                  "type": "boolean",
                  "description": "The charge has provisions restricting the creation of further charges"
                }
              },
              "type": "object"
            },
            "description": "Information about alterations for Scottish companies"
          },
          "more_than_four_persons_entitled": {
            "type": "boolean",
            "description": "Charge has more than four person entitled"
          },
          "persons_entitled": {
            "type": "array",
            "description": "People that are entitled to the charge",
            "items": {
              "title": "persons_entitled",
              "required": [
                "name"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "description": "The name of the person entitled."
                }
              },
              "type": "object"
            }
          },
          "transactions": {
            "type": "array",
            "description": "Transactions that have been filed for the charge.",
            "items": {
              "title": "transactions",
              "properties": {
                "filing_type": {
                  "type": "string",
                  "description": "Filing type which created, updated or satisfied the charge"
                },
                "transaction_id": {
                  "type": "integer",
                  "description": "The id of the filing"
                },
                "delivered_on": {
                  "type": "string",
                  "format": "date",
                  "description": "The date the filing was submitted to Companies House"
                },
                "insolvency_case_number": {
                  "type": "integer",
                  "description": "The insolvency case related to this filing"
                },
                "links": {
                  "type": "array",
                  "description": "The resources related to this filing",
                  "items": {
                    "title": "transaction_links",
                    "properties": {
                      "filing": {
                        "type": "string",
                        "description": "Link to the charge filing data"
                      },
                      "insolvency_case": {
                        "type": "string",
                        "description": "Link to the insolvency case related to this filing"
                      }
                    },
                    "type": "object"
                  }
                }
              },
              "type": "object"
            }
          },
          "insolvency_cases": {
            "type": "array",
            "description": "Transactions that have been filed for the charge.",
            "items": {
              "title": "insolvency_cases",
              "properties": {
                "case_number": {
                  "type": "integer",
                  "description": "The number of this insolvency case"
                },
                "transaction_id": {
                  "type": "integer",
                  "description": "The id of the insolvency filing"
                },
                "links": {
                  "type": "array",
                  "description": "The resources related to this insolvency case",
                  "items": {
                    "title": "insolvency_case_links",
                    "properties": {
                      "case": {
                        "type": "string",
                        "description": "Link to the insolvency case data"
                      }
                    },
                    "type": "object"
                  }
                }
              },
              "type": "object"
            }
          },
          "links": {
            "type": "array",
            "description": "The resources related to this charge",
            "items": {
              "title": "charge_links",
              "required": [
                "self"
              ],
              "properties": {
                "self": {
                  "type": "string",
                  "description": "Link to the this charge data"
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

// export type GetChargesResponse = FromSchema<typeof GetChargesSchema['schema']['response']['200']>
export type GetChargesResponse = any

