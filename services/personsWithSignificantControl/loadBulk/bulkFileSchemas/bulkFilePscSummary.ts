
import {FromSchema} from "json-schema-to-ts";

export const bulkFilePscSummarySchema = {
  "type": "object",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "kind": {
          const: "totals#persons-of-significant-control-snapshot"
        },
        "persons_of_significant_control_count": {
          "type": "integer"
        },
        "statements_count": {
          "type": "integer"
        },
        "exemptions_count": {
          "type": "integer"
        },
        "generated_at": {
          "type": "string"
        }
      },
      "required": [
        "kind",
        "persons_of_significant_control_count",
        "statements_count",
        "exemptions_count",
        "generated_at"
      ]
    }
  },
  required: ['data'],
  additionalProperties: false
} as const

export type BulkFilePscSummary = FromSchema<typeof bulkFilePscSummarySchema>
