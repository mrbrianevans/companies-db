
import {FromSchema} from "json-schema-to-ts";

const bulkFilePscExemptionsSchema = {
  "type": "object",
  "properties": {
    "company_number": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "etag": {
          "type": "string"
        },
        "exemptions": {
          "type": "object",
          "properties": {
            "psc_exempt_as_shares_admitted_on_market": {
              "type": "object",
              "properties": {
                "exemption_type": {
                  "type": "string"
                },
                "items": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "exempt_from": {
                        "type": "string"
                      },
                      "exempt_to": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "exempt_from"
                    ]
                  }
                }
              },
              "required": [
                "exemption_type",
                "items"
              ]
            },
            "disclosure_transparency_rules_chapter_five_applies": {
              "type": "object",
              "properties": {
                "exemption_type": {
                  "type": "string"
                },
                "items": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "exempt_from": {
                        "type": "string"
                      },
                      "exempt_to": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "exempt_from",
                      "exempt_to"
                    ]
                  }
                }
              },
              "required": [
                "exemption_type",
                "items"
              ]
            },
            "psc_exempt_as_trading_on_regulated_market": {
              "type": "object",
              "properties": {
                "exemption_type": {
                  "type": "string"
                },
                "items": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "exempt_from": {
                        "type": "string"
                      },
                      "exempt_to": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "exempt_from"
                    ]
                  }
                }
              },
              "required": [
                "exemption_type",
                "items"
              ]
            },
            "psc_exempt_as_trading_on_eu_regulated_market": {
              "type": "object",
              "properties": {
                "exemption_type": {
                  "type": "string"
                },
                "items": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "exempt_from": {
                        "type": "string"
                      },
                      "exempt_to": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "exempt_from",
                      "exempt_to"
                    ]
                  }
                }
              },
              "required": [
                "exemption_type",
                "items"
              ]
            }
          }
        },
        "kind": {
          const: 'exemptions'
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
        }
      },
      "required": [
        "etag",
        "exemptions",
        "kind",
        "links"
      ]
    }
  },
  required: ['data', 'company_number'],
  additionalProperties: false
} as const

export type BulkFilePscExemptions = FromSchema<typeof bulkFilePscExemptionsSchema>
