
import {FromSchema} from "json-schema-to-ts";
import {bulkFilePscSummarySchema} from "./bulkFilePscSummary.js";

const bulkFilePscStatementSchema = {
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
        "kind": {
          const: "persons-with-significant-control-statement"
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
        "notified_on": {
          "type": "string"
        },
        "statement": {
          "type": "string"
        },
        "ceased_on": {
          "type": "string"
        },
        "restrictions_notice_withdrawal_reason": {
          "description": "The reason for the company withdrawing a <code>restrictions-notice-issued-to-psc</code> statement",
          "enum": [
            "restrictions-notice-withdrawn-by-court-order",
            "restrictions-notice-withdrawn-by-company"
          ],
          "type": "string"
        }
      },
      "required": [
        "etag",
        "kind",
        "links",
        "notified_on",
        "statement"
      ]
    }
  },
  required: ['data', 'company_number'],
  additionalProperties: false
} as const

export type BulkFilePscStatement = FromSchema<typeof bulkFilePscStatementSchema>
