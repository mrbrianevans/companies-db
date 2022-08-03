
  import {FromSchema} from "json-schema-to-ts";
  
  export const CompanyPscCorporateSchema = {
  "type": "object",
  "properties": {
    "resource_kind": {
      "const": "company-psc-corporate"
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
            }
          },
          "required": [
            "locality",
            "premises"
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
  
  export type CompanyPscCorporate = FromSchema<typeof CompanyPscCorporateSchema>
  
  const sampleCompanyPscCorporate: CompanyPscCorporate = {
  "resource_kind": "company-psc-corporate",
  "resource_uri": "/company/14273658/persons-with-significant-control/corporate-entity/tD1YeDQV7at1sGQmgXt-sXQIqV0",
  "resource_id": "tD1YeDQV7at1sGQmgXt-sXQIqV0",
  "data": {
    "address": {
      "address_line_1": "Charlotte Building",
      "address_line_2": "17 Gresse Street",
      "country": "United Kingdom",
      "locality": "London",
      "postal_code": "W1T 1QL",
      "premises": "6th Floor"
    },
    "etag": "f9dd98a4e601faceef6fd37fb3a5043b633783d8",
    "identification": {
      "country_registered": "United Kingdom",
      "legal_authority": "Companies Act 2006",
      "legal_form": "Limited By Shares",
      "place_registered": "Companies House",
      "registration_number": "13707911"
    },
    "kind": "corporate-entity-person-with-significant-control",
    "links": {
      "self": "/company/14273658/persons-with-significant-control/corporate-entity/tD1YeDQV7at1sGQmgXt-sXQIqV0"
    },
    "name": "Battersea Pictures Holdings Limited",
    "natures_of_control": [
      "ownership-of-shares-75-to-100-percent",
      "voting-rights-75-to-100-percent",
      "right-to-appoint-and-remove-directors"
    ],
    "notified_on": "2022-08-03"
  },
  "event": {
    "timepoint": 4099642,
    "published_at": "2022-08-03T12:08:02",
    "type": "changed"
  },
  "received": 1659525157666.7305
}
  