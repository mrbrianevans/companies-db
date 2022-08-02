
  import {FromSchema} from "json-schema-to-ts";
  
  export const CompanyInsolvencySchema = {
  "type": "object",
  "properties": {
    "resource_kind": {
      "const": "company-insolvency"
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
        "cases": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "dates": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "date": {
                      "type": "string"
                    },
                    "type": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "date",
                    "type"
                  ]
                }
              },
              "number": {
                "type": "string"
              },
              "practitioners": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "address": {
                      "type": "object",
                      "properties": {
                        "address_line_1": {
                          "type": "string"
                        },
                        "locality": {
                          "type": "string"
                        },
                        "postal_code": {
                          "type": "string"
                        },
                        "address_line_2": {
                          "type": "string"
                        },
                        "region": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "address_line_1",
                        "postal_code"
                      ]
                    },
                    "appointed_on": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "role": {
                      "type": "string"
                    },
                    "ceased_to_act_on": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "address",
                    "name",
                    "role"
                  ]
                }
              },
              "type": {
                "type": "string"
              },
              "links": {
                "type": "object",
                "properties": {
                  "charge": {
                    "type": "string"
                  }
                },
                "required": [
                  "charge"
                ]
              }
            },
            "required": [
              "number",
              "type"
            ]
          }
        },
        "etag": {
          "type": "string"
        },
        "status": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "cases",
        "etag"
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
  
  export type CompanyInsolvency = FromSchema<typeof CompanyInsolvencySchema>
  