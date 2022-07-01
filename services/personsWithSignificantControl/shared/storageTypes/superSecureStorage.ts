import {FromSchema} from "json-schema-to-ts";

const superSecureStorageSchema = {
  "type": "object",
  "properties": {
    "description": {
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
        }
      },
      "required": [
        "self"
      ]
    },
    "ceased": {
      "description": "Presence of that indicator means the super secure person status is ceased \n",
      "type": "boolean"
    }
  },
  "required": [
    "description",
    "etag",
    "kind",
    "links"
  ],
  "additionalProperties": false,
  "title": "getSuperSecurePerson",
  "$schema": "http://json-schema.org/draft-07/schema#"
} as const

export type SuperSecureStorage = FromSchema<typeof superSecureStorageSchema> & {company_number: string, super_secure_id: string}
