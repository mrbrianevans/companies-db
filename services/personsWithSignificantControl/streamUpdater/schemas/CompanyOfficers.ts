
  import {FromSchema} from "json-schema-to-ts";
  
  export const CompanyOfficersSchema = {
  "type": "object",
  "properties": {
    "resource_kind": {
      "const": "company-officers"
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
            "premises": {
              "type": "string"
            },
            "region": {
              "type": "string"
            },
            "country": {
              "type": "string"
            },
            "address_line_2": {
              "type": "string"
            },
            "care_of": {
              "type": "string"
            },
            "po_box": {
              "type": "string"
            }
          }
        },
        "appointed_on": {
          "type": "string"
        },
        "country_of_residence": {
          "type": "string"
        },
        "date_of_birth": {
          "type": "object",
          "properties": {
            "month": {
              "type": "integer"
            },
            "year": {
              "type": "integer"
            }
          },
          "required": [
            "month",
            "year"
          ]
        },
        "links": {
          "type": "object",
          "properties": {
            "self": {
              "type": "string"
            },
            "officer": {
              "type": "object",
              "properties": {
                "appointments": {
                  "type": "string"
                }
              },
              "required": [
                "appointments"
              ]
            }
          },
          "required": [
            "self"
          ]
        },
        "name": {
          "type": "string"
        },
        "nationality": {
          "type": "string"
        },
        "occupation": {
          "type": "string"
        },
        "officer_role": {
          "type": "string"
        },
        "identification": {
          "type": "object",
          "properties": {
            "identification_type": {
              "type": "string"
            },
            "legal_authority": {
              "type": "string"
            },
            "legal_form": {
              "type": "string"
            },
            "place_registered": {
              "type": "string"
            },
            "registration_number": {
              "type": "string"
            }
          },
          "required": [
            "identification_type",
            "registration_number"
          ]
        },
        "resigned_on": {
          "type": "string"
        },
        "former_names": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "forenames": {
                "type": "string"
              },
              "surname": {
                "type": "string"
              }
            }
          }
        }
      },
      "required": [
        "links",
        "name",
        "officer_role"
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
  
  export type CompanyOfficers = FromSchema<typeof CompanyOfficersSchema>
  