import {FromSchema} from "json-schema-to-ts";

const IndividualPscStorageSchema = {
  "type": "object",
  "properties": {
    "address": {
      "type": "object",
      "properties": {
        "premises": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "locality": {
          "type": "string"
        },
        "address_line_1": {
          "type": "string"
        },
        "address_line_2": {
          "type": "string"
        },
        "po_box": {
          "type": "string"
        },
        "care_of": {
          "type": "string"
        }
      }
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
        },
        "day": {
          "description": "The day of the date of birth.",
          "type": "integer"
        }
      },
      "required": [
        "month",
        "year"
      ]
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
    "name_elements": {
      "type": "object",
      "properties": {
        "middle_name": {
          "type": "string"
        },
        "surname": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "forename": {
          "type": "string"
        },
        "other_forenames": {
          "description": "Other forenames of the person with significant control.",
          "type": "string"
        }
      },
      "required": [
        "surname"
      ]
    },
    "nationality": {
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
    "country_of_residence",
    "etag",
    "kind",
    "links",
    "name",
    "name_elements",
    "nationality",
    "natures_of_control",
    "notified_on"
  ],
  "additionalProperties": false,
  "title": "getIndividual",
  "$schema": "http://json-schema.org/draft-07/schema#"
} as const

export type IndividualPscStorage = FromSchema<typeof IndividualPscStorageSchema> & {company_number: string, psc_id: string}
