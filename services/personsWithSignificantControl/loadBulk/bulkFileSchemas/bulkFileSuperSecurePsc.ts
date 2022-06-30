
import {FromSchema} from "json-schema-to-ts";

const bulkFileSuperSecurePscSchema = {
  "type": "object",
  "properties": {
    "company_number": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "etag": {
          "type": "string"
        },
        "kind": {
          const: 'super-secure-person-with-significant-control'
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
        "ceased": {
          "type": "integer"
        }
      },
      "required": [
        "description",
        "etag",
        "kind",
        "links"
      ]
    }
  },
  required: ['data', 'company_number'],
  additionalProperties: false
} as const

export type BulkFileSuperSecurePsc = FromSchema<typeof bulkFileSuperSecurePscSchema>
