import {FromSchema} from "json-schema-to-ts";

const LegalPscStorageSchema = {
  "type": "object",
  "properties": {
    "address": {
      "type": "object",
      "properties": {
        "postal_code": {
          "type": "string"
        },
        "locality": {
          "type": "string"
        },
        "address_line_1": {
          "type": "string"
        },
        "premises": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "address_line_2": {
          "type": "string"
        },
        "care_of": {
          "description": "Care of name.",
          "type": "string"
        },
        "po_box": {
          "description": "The post-officer box number.",
          "type": "string"
        }
      },
      "required": [

      ]
    },
    "etag": {
      "type": "string"
    },
    "identification": {
      "type": "object",
      "properties": {
        "legal_authority": {
          "type": "string"
        },
        "legal_form": {
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
        },
        "statement": {
          "description": "The URL of the statement linked to this person with significant control.",
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
  ],
  "additionalProperties": false,
  "title": "getLegalPersons",
  "$schema": "http://json-schema.org/draft-07/schema#"
} as const

export type LegalPscStorage = FromSchema<typeof LegalPscStorageSchema> & {company_number: string, psc_id: string}
