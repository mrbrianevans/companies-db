
  import {FromSchema} from "json-schema-to-ts";
  
  export const CompanyChargesSchema = {
  "type": "object",
  "properties": {
    "resource_kind": {
      "const": "company-charges"
    },
    "resource_uri": {
      "type": "string"
    },
    "resource_id": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "charge_code": {
          "type": "string"
        },
        "charge_number": {
          "type": "integer"
        },
        "classification": {
          "type": "object",
          "properties": {
            "description": {
              "type": "string"
            },
            "type": {
              "type": "string"
            }
          },
          "required": [
            "description",
            "type"
          ]
        },
        "created_on": {
          "type": "string"
        },
        "delivered_on": {
          "type": "string"
        },
        "etag": {
          "type": "string"
        },
        "links": {
          "type": "object",
          "properties": {
            "self": {
              "type": "string"
            }
          },
          "required": [
            "self"
          ]
        },
        "particulars": {
          "type": "object",
          "properties": {
            "contains_fixed_charge": {
              "type": "boolean"
            },
            "contains_floating_charge": {
              "type": "boolean"
            },
            "contains_negative_pledge": {
              "type": "boolean"
            },
            "description": {
              "type": "string"
            },
            "type": {
              "type": "string"
            },
            "floating_charge_covers_all": {
              "type": "boolean"
            },
            "chargor_acting_as_bare_trustee": {
              "type": "boolean"
            }
          }
        },
        "persons_entitled": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              }
            },
            "required": [
              "name"
            ]
          }
        },
        "satisfied_on": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "transactions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "delivered_on": {
                "type": "string"
              },
              "filing_type": {
                "type": "string"
              },
              "links": {
                "type": "object",
                "properties": {
                  "filing": {
                    "type": "string"
                  },
                  "insolvency_case": {
                    "type": "string"
                  }
                },
                "required": [
                  "filing"
                ]
              },
              "insolvency_case_number": {
                "type": "string"
              }
            },
            "required": [
              "delivered_on",
              "filing_type"
            ]
          }
        },
        "secured_details": {
          "type": "object",
          "properties": {
            "description": {
              "type": "string"
            },
            "type": {
              "type": "string"
            }
          },
          "required": [
            "description",
            "type"
          ]
        },
        "assets_ceased_released": {
          "type": "string"
        },
        "more_than_four_persons_entitled": {
          "type": "boolean"
        },
        "insolvency_cases": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "case_number": {
                "type": "string"
              },
              "links": {
                "type": "object",
                "properties": {
                  "case": {
                    "type": "string"
                  }
                },
                "required": [
                  "case"
                ]
              }
            },
            "required": [
              "case_number",
              "links"
            ]
          }
        }
      },
      "required": [
        "charge_number",
        "classification",
        "created_on",
        "delivered_on",
        "etag",
        "links",
        "particulars",
        "persons_entitled",
        "status",
        "transactions"
      ]
    },
    "event": {
      "type": "object",
      "properties": {
        "timepoint": {
          "type": "integer"
        },
        "published_at": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "timepoint",
        "published_at",
        "type"
      ]
    },
    "received": {
      "type": "number"
    }
  },
  "required": [
    "resource_kind",
    "resource_uri",
    "resource_id",
    "data",
    "event",
    "received"
  ],
  "additionalProperties": false
} as const
  
  export type CompanyCharges = FromSchema<typeof CompanyChargesSchema>
  
  const sampleCompanyCharges: CompanyCharges = {
  "resource_kind": "company-charges",
  "resource_uri": "/company/05155434/charges/P2zOyddJrIvX4pCiLto7F7lqH_4",
  "resource_id": "P2zOyddJrIvX4pCiLto7F7lqH_4",
  "data": {
    "charge_code": "051554340008",
    "charge_number": 8,
    "classification": {
      "description": "A registered charge",
      "type": "charge-description"
    },
    "created_on": "2016-07-26",
    "delivered_on": "2016-07-28",
    "etag": "d546f20f156289e0056193bac8098af5a48d8031",
    "links": {
      "self": "/company/05155434/charges/P2zOyddJrIvX4pCiLto7F7lqH_4"
    },
    "particulars": {
      "contains_fixed_charge": true,
      "contains_floating_charge": true,
      "contains_negative_pledge": true,
      "description": "76 whitchurch road shrewsbury.",
      "type": "brief-description"
    },
    "persons_entitled": [
      {
        "name": "Lloyds Bank PLC"
      }
    ],
    "satisfied_on": "2022-08-03",
    "status": "fully-satisfied",
    "transactions": [
      {
        "delivered_on": "2016-07-28",
        "filing_type": "create-charge-with-deed",
        "links": {
          "filing": "/company/05155434/filing-history/MzE1NDI1MDE1NWFkaXF6a2N4"
        }
      },
      {
        "delivered_on": "2022-08-03",
        "filing_type": "charge-satisfaction",
        "links": {
          "filing": "/company/05155434/filing-history/MzM0NzcwMzk0NGFkaXF6a2N4"
        }
      }
    ]
  },
  "event": {
    "timepoint": 1487036,
    "published_at": "2022-08-03T12:58:01",
    "type": "changed"
  },
  "received": 1659528079109.5159
}
  