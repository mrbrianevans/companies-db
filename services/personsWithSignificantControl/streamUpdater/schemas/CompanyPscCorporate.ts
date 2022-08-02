
  import {FromSchema} from "json-schema-to-ts";
  
  export const CompanyPscCorporateSchema = {
  "type": "object",
  "properties": {
    "resource_kind": {
      "const": "company-psc-corporate"
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
            "country": {
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
            "address_line_2": {
              "type": "string"
            }
          },
          "required": [
            "locality",
            "premises"
          ]
        },
        "etag": {
          "type": "string"
        },
        "identification": {
          "type": "object",
          "properties": {
            "country_registered": {
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
            "legal_authority",
            "legal_form"
          ]
        },
        "kind": {
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
        "name": {
          "type": "string"
        },
        "natures_of_control": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "notified_on": {
          "type": "string"
        },
        "ceased_on": {
          "type": "string"
        }
      },
      "required": [
        "address",
        "etag",
        "identification",
        "kind",
        "links",
        "name",
        "natures_of_control",
        "notified_on"
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
  
  export type CompanyPscCorporate = FromSchema<typeof CompanyPscCorporateSchema>
  