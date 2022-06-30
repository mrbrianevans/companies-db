
import {FromSchema} from "json-schema-to-ts";

const bulkFileCorporatePscSchema = {
  "type": "object",
  "properties": {
    "company_number": {
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
            "address_line_2": {
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
            "po_box": {
              "type": "string"
            }
          },
          "required": [
            "locality"
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
          const: "corporate-entity-person-with-significant-control"
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
    }
  },
  required: ['data', 'company_number'],
  additionalProperties: false
} as const

export type BulkFileCorporatePsc = FromSchema<typeof bulkFileCorporatePscSchema>
