
  import {FromSchema} from "json-schema-to-ts";
  
  export const CompanyPscIndividualSchema = {
  "type": "object",
  "properties": {
    "resource_kind": {
      "const": "company-psc-individual"
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
            "forename": {
              "type": "string"
            },
            "surname": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "middle_name": {
              "type": "string"
            }
          },
          "required": [
            "forename",
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
  
  export type CompanyPscIndividual = FromSchema<typeof CompanyPscIndividualSchema>
  
  const sampleCompanyPscIndividual: CompanyPscIndividual = {
  "resource_kind": "company-psc-individual",
  "resource_uri": "/company/14271677/persons-with-significant-control/individual/OLv7cb3ohBOU-XXedafXA-BI1nA",
  "resource_id": "OLv7cb3ohBOU-XXedafXA-BI1nA",
  "data": {
    "address": {
      "address_line_1": "Bulstrode Road",
      "country": "England",
      "locality": "Hounslow",
      "postal_code": "TW3 3AW",
      "premises": "45"
    },
    "country_of_residence": "England",
    "date_of_birth": {
      "month": 11,
      "year": 1993
    },
    "etag": "671af2299013f0af50400d00060dd4f30dbd0da7",
    "kind": "individual-person-with-significant-control",
    "links": {
      "self": "/company/14271677/persons-with-significant-control/individual/OLv7cb3ohBOU-XXedafXA-BI1nA"
    },
    "name": "Mr Rahul Rahul",
    "name_elements": {
      "forename": "Rahul",
      "surname": "Rahul",
      "title": "Mr"
    },
    "nationality": "Indian",
    "natures_of_control": [
      "ownership-of-shares-25-to-50-percent",
      "voting-rights-25-to-50-percent",
      "right-to-appoint-and-remove-directors"
    ],
    "notified_on": "2022-08-02"
  },
  "event": {
    "timepoint": 4091408,
    "published_at": "2022-08-02T16:28:01",
    "type": "changed"
  },
  "received": 1659454203213.247
}
  