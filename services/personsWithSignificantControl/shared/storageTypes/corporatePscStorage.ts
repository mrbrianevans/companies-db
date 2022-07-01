import {FromSchema} from "json-schema-to-ts";

const CorporatePscStorageSchema = {
  "type": "object",
  "properties": {
    "address": {
      "type": "object",
      "properties": {
        "country": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "locality": {
          "type": "string"
        },
        "premises": {
          "type": "string"
        },
        "address_line_1": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "address_line_2": {
          "type": "string"
        },
        "po_box": {
          "type": "string"
        },
        "care_of": {
          "description": "Care of name.",
          "type": "string"
        }
      },
      additionalProperties: false
    },
    "ceased_on": {
      "type": "string"
    },
    "etag": {
      "type": "string"
    },
    "identification": {
      "type": "object",
      "properties": {
        "legal_form": {
          "type": "string"
        },
        "place_registered": {
          "type": "string"
        },
        "legal_authority": {
          "type": "string"
        },
        "country_registered": {
          "type": "string"
        },
        "registration_number": {
          "type": "string"
        }
      },
      "required": [
        "legal_form",
        "legal_authority"
      ],
      additionalProperties: false
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
      ],
      additionalProperties: false
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
  "title": "getCorporateEntities",
  "$schema": "http://json-schema.org/draft-07/schema#"
} as const

export type CorporatePscStorage = FromSchema<typeof CorporatePscStorageSchema> & {company_number: string, psc_id: string}
