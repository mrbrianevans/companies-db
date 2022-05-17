import {FromSchema} from "json-schema-to-ts";

export interface getRegisteredOfficeAddressParams {
  /** Company number for registered office address */
  company_number: string
}

export interface getRegisteredOfficeAddressQueryString {

}

export const getRegisteredOfficeAddressSchema = {
  schema: {
    "params": {
      "type": "object",
      "properties": {
        "company_number": {
          "type": "string"
        }
      },
      "required": [
        "company_number"
      ]
    },
    "querystring": {
      "type": "object",
      "properties": {},
      "required": []
    },
    "response": {
      "200": {
        "title": "registeredOfficeAddress",
        "type": "object",
        "required": [
          "premises",
          "address_line_1",
          "locality",
          "country"
        ],
        "properties": {
          "etag": {
            "type": "string",
            "description": "The ETag of the resource.",
            "readOnly": true
          },
          "kind": {
            "type": "string",
            "description": "The type of resource.",
            "enum": [
              "registered-office-address"
            ],
            "readOnly": true
          },
          "links": {
            "type": "object",
            "description": "Links to the related resources",
            "items": {
              "required": [
                "self"
              ],
              "properties": {
                "self": {
                  "description": "URL to this resource.",
                  "readOnly": true,
                  "type": "string",
                  "format": "uri"
                }
              }
            },
            "readOnly": true
          },
          "premises": {
            "type": "string",
            "description": "The property name or number."
          },
          "address_line_1": {
            "type": "string",
            "description": "The first line of the address."
          },
          "address_line_2": {
            "type": "string",
            "description": "The second line of the address."
          },
          "locality": {
            "type": "string",
            "description": "The locality e.g London."
          },
          "region": {
            "type": "string",
            "description": "The region e.g Surrey."
          },
          "postal_code": {
            "type": "string",
            "description": "The postal code e.g CF14 3UZ."
          },
          "country": {
            "type": "string",
            "description": "The country.",
            "enum": [
              "England",
              "Wales",
              "Scotland",
              "Northern Ireland",
              "Great Britain",
              "United Kingdom",
              "Not specified"
            ]
          },
          "po_box": {
            "type": "string",
            "description": "The post-office box number."
          }
        }
      }
    }
  }
} as const

export type getRegisteredOfficeAddressResponse = FromSchema<typeof getRegisteredOfficeAddressSchema['schema']['response']['200']>

