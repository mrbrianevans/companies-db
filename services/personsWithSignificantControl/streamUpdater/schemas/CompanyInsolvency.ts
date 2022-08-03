
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
              "notes": {
                "type": "array",
                "items": {
                  "type": "string"
                }
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
  
  const sampleCompanyInsolvency: CompanyInsolvency = {
  "resource_kind": "company-insolvency",
  "resource_uri": "/company/11519482/insolvency",
  "resource_id": "11519482",
  "data": {
    "cases": [
      {
        "dates": [
          {
            "date": "2022-07-27",
            "type": "wound-up-on"
          }
        ],
        "number": "1",
        "practitioners": [
          {
            "address": {
              "address_line_1": "4th Floor Churchgate House",
              "locality": "Bolton",
              "postal_code": "BL1 1HL"
            },
            "appointed_on": "2022-07-27",
            "name": "Rikki Burton",
            "role": "practitioner"
          }
        ],
        "type": "creditors-voluntary-liquidation"
      }
    ],
    "etag": "0204bf1f01b6bcb1bbe21f946e775b5fd34a1fff",
    "status": [
      "liquidation"
    ]
  },
  "event": {
    "timepoint": 1293709,
    "published_at": "2022-08-02T14:51:01.704338+01:00",
    "type": "changed"
  },
  "received": 1659448483132.9688
}
  