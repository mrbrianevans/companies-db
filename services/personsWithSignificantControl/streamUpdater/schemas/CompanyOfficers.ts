
  import {FromSchema} from "json-schema-to-ts";
  
  export const CompanyOfficersSchema = {
  "type": "object",
  "properties": {
    "resource_kind": {
      "const": "company-officers"
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
            "locality": {
              "type": "string"
            },
            "postal_code": {
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
            "care_of": {
              "type": "string"
            },
            "po_box": {
              "type": "string"
            }
          }
        },
        "appointed_on": {
          "type": "string"
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
        "links": {
          "type": "object",
          "properties": {
            "self": {
              "type": "string"
            },
            "officer": {
              "type": "object",
              "properties": {
                "appointments": {
                  "type": "string"
                }
              },
              "required": [
                "appointments"
              ]
            }
          },
          "required": [
            "self"
          ]
        },
        "name": {
          "type": "string"
        },
        "nationality": {
          "type": "string"
        },
        "occupation": {
          "type": "string"
        },
        "officer_role": {
          "type": "string"
        },
        "resigned_on": {
          "type": "string"
        },
        "identification": {
          "type": "object",
          "properties": {
            "identification_type": {
              "type": "string"
            },
            "registration_number": {
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
            }
          },
          "required": [
            "identification_type",
            "registration_number"
          ]
        },
        "former_names": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "forenames": {
                "type": "string"
              },
              "surname": {
                "type": "string"
              }
            }
          }
        }
      },
      "required": [
        "links",
        "name",
        "officer_role"
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
  
  export type CompanyOfficers = FromSchema<typeof CompanyOfficersSchema>
  
  const sampleCompanyOfficers: CompanyOfficers = {
  "resource_kind": "company-officers",
  "resource_uri": "/company/07217743/appointments/lZX48JQSZFCbhsdpDhYLSoG6Dbc",
  "resource_id": "lZX48JQSZFCbhsdpDhYLSoG6Dbc",
  "data": {
    "address": {
      "address_line_1": "C/O Sable International",
      "address_line_2": "12-16 Addiscombe Road",
      "locality": "Croydon",
      "postal_code": "CR0 0XT",
      "premises": "13th Floor One Croydon"
    },
    "appointed_on": "2016-05-01",
    "country_of_residence": "United Kingdom",
    "date_of_birth": {
      "month": 10,
      "year": 1977
    },
    "links": {
      "self": "/company/07217743/appointments/lZX48JQSZFCbhsdpDhYLSoG6Dbc"
    },
    "name": "CSOMOR, Anna",
    "nationality": "Hungarian",
    "occupation": "Director",
    "officer_role": "director",
    "resigned_on": "2022-08-01"
  },
  "event": {
    "timepoint": 6521935,
    "published_at": "2022-08-02T15:17:01",
    "type": "changed"
  },
  "received": 1659450080817.5671
}
  