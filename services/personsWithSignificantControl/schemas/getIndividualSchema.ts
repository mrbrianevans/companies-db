import {FromSchema} from "json-schema-to-ts";

export interface getIndividualParams {
  /** The company number of the person with significant control details being requested. */
  company_number: string;
  /** The id of the person with significant control details being requested. */
  psc_id: string
}

export interface getIndividualQueryString {

}

export const getIndividualSchema = {
  schema: {
    "params": {
      "type": "object",
      "properties": {
        "company_number": {
          "type": "string"
        },
        "psc_id": {
          "type": "string"
        }
      },
      "required": [
        "company_number",
        "psc_id"
      ]
    },
    "querystring": {
      "type": "object",
      "properties": {},
      "required": []
    },
    "response": {
      "200": {
        "title": "individual",
        "required": [
          "etag",
          "notified_on",
          "kind",
          "country_of_residence",
          "date_of_birth",
          "name",
          "name_elements",
          "links",
          "nationality",
          "address",
          "natures_of_control"
        ],
        "properties": {
          "etag": {
            "description": "The ETag of the resource.",
            "type": "string"
          },
          "notified_on": {
            "description": "The date that Companies House was notified about this person with significant control.",
            "type": "string",
            "format": "date"
          },
          "ceased_on": {
            "description": "The date that Companies House was notified about the cessation of this person with significant control.",
            "type": "string",
            "format": "date"
          },
          "kind": {
            "enum": [
              "individual-person-with-significant-control"
            ],
            "type": "string"
          },
          "country_of_residence": {
            "description": "The country of residence of the person with significant control.",
            "type": "string"
          },
          "date_of_birth": {
            "description": "The date of birth of the person with significant control.",
            "items": {
              "title": "dateOfBirth",
              "properties": {
                "day": {
                  "description": "The day of the date of birth.",
                  "type": "integer"
                },
                "month": {
                  "description": "The month of date of birth.",
                  "type": "integer"
                },
                "year": {
                  "description": "The year of date of birth.",
                  "type": "integer"
                }
              },
              "required": [
                "month",
                "year"
              ]
            },
            "type": "object"
          },
          "name": {
            "description": "Name of the person with significant control.",
            "type": "string"
          },
          "name_elements": {
            "description": "A document encapsulating the seperate elements of a person with significant control's name.",
            "items": {
              "title": "nameElements",
              "properties": {
                "forename": {
                  "description": "The forename of the person with significant control.",
                  "type": "string"
                },
                "title": {
                  "description": "Title of the person with significant control.",
                  "type": "string"
                },
                "other_forenames": {
                  "description": "Other forenames of the person with significant control.",
                  "type": "string"
                },
                "surname": {
                  "description": "The surname of the person with significant control.",
                  "type": "string"
                }
              },
              "required": [
                "surname"
              ]
            },
            "type": "object"
          },
          "links": {
            "description": "A set of URLs related to the resource, including self.",
            "items": {
              "title": "pscLinksType",
              "required": [
                "self"
              ],
              "properties": {
                "self": {
                  "description": "The URL of the resource.",
                  "type": "string"
                },
                "statement": {
                  "description": "The URL of the statement linked to this person with significant control.",
                  "type": "string"
                }
              }
            },
            "type": "object"
          },
          "nationality": {
            "description": "The nationality of the person with significant control.",
            "type": "string"
          },
          "address": {
            "description": "The service address of the person with significant control. If given, this address will be shown on the public record instead of the residential address.",
            "items": {
              "title": "pscAddress",
              "required": [
                "address_line_1",
                "postal_code",
                "premises"
              ],
              "properties": {
                "address_line_1": {
                  "description": "The first line of the address.",
                  "type": "string"
                },
                "address_line_2": {
                  "description": "The second line of the address.",
                  "type": "string"
                },
                "care_of": {
                  "description": "Care of name.",
                  "type": "string"
                },
                "country": {
                  "description": "The country. For example, UK.",
                  "type": "string"
                },
                "locality": {
                  "description": "The locality. For example London.",
                  "type": "string"
                },
                "po_box": {
                  "description": "The post-officer box number.",
                  "type": "string"
                },
                "postal_code": {
                  "description": "The postal code. For example CF14 3UZ.",
                  "type": "string"
                },
                "premises": {
                  "description": "The property name or number.",
                  "type": "string"
                },
                "region": {
                  "description": "The region. For example Surrey.",
                  "type": "string"
                }
              }
            },
            "type": "object"
          },
          "natures_of_control": {
            "description": "Indicates the nature of control the person with significant control holds.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/psc_descriptions.yml) file. \n",
            "type": "array"
          }
        },
        "type": "object"
      }
    }
  }
} as const

export type getIndividualResponse = FromSchema<typeof getIndividualSchema['schema']['response']['200']>

