
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
            "contains_negative_pledge": {
              "type": "boolean"
            },
            "description": {
              "type": "string"
            },
            "type": {
              "type": "string"
            },
            "contains_fixed_charge": {
              "type": "boolean"
            },
            "contains_floating_charge": {
              "type": "boolean"
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
  