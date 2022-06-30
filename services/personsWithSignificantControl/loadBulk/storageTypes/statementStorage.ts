import {constants} from "fs";
import {FromSchema} from "json-schema-to-ts";

const StatementStorageSchema = {
  "type": "object",
  "properties": {
    "ceased_on": {
      "type": "string"
    },
    "etag": {
      "type": "string"
    },
    "kind": {
      "type": "string"
    },
    "links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string"
        },
        "person_with_significant_control": {
          "description": "The URL of the person with significant control linked to this statement.",
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
    "restrictions_notice_withdrawal_reason": {
      "description": "The reason for the company withdrawing a <code>restrictions-notice-issued-to-psc</code> statement",
      "enum": [
        "restrictions-notice-withdrawn-by-court-order",
        "restrictions-notice-withdrawn-by-company"
      ],
      "type": "string"
    },
    "linked_psc_name": {
      "description": "The name of the psc linked to this statement.",
      "type": "string"
    }
  },
  "required": [
    "etag",
    "kind",
    "links",
    "notified_on",
    "statement"
  ],
  "additionalProperties": false,
  "title": "getStatement",
  "$schema": "http://json-schema.org/draft-07/schema#"
} as const

export type StatementStorage = FromSchema<typeof StatementStorageSchema> & {company_number: string, statement_id: string}
