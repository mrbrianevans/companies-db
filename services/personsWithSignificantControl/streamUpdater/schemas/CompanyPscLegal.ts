
  import {FromSchema} from "json-schema-to-ts";
  
  export const CompanyPscLegalSchema = {
  "type": "object",
  "properties": {
    "resource_kind": {
      "const": "company-psc-legal"
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
            "address_line_1",
            "country",
            "locality",
            "postal_code",
            "premises"
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
  
  export type CompanyPscLegal = FromSchema<typeof CompanyPscLegalSchema>
  
  const sampleCompanyPscLegal: CompanyPscLegal = {
  "resource_kind": "company-psc-legal",
  "resource_uri": "/company/14146468/persons-with-significant-control/legal-person/EYJ2hHW1kW5i7_-DNLYamv97Ry4",
  "resource_id": "EYJ2hHW1kW5i7_-DNLYamv97Ry4",
  "data": {
    "address": {
      "address_line_1": "Southbourne Gardens",
      "country": "England",
      "locality": "London",
      "postal_code": "SE12 8UQ",
      "premises": "1"
    },
    "etag": "7026bdb65a92e02164390b2a0ef83670df5491ed",
    "identification": {
      "legal_authority": "United Kingdom",
      "legal_form": "Hr Department"
    },
    "kind": "legal-person-person-with-significant-control",
    "links": {
      "self": "/company/14146468/persons-with-significant-control/legal-person/EYJ2hHW1kW5i7_-DNLYamv97Ry4"
    },
    "name": "Harriet Nalule",
    "natures_of_control": [
      "significant-influence-or-control",
      "significant-influence-or-control-as-firm"
    ],
    "notified_on": "2022-08-02"
  },
  "event": {
    "timepoint": 4090490,
    "published_at": "2022-08-02T15:35:00",
    "type": "changed"
  },
  "received": 1659451166621.016
}
  