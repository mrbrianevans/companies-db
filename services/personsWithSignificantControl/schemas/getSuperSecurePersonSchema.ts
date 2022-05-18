import {FromSchema} from "json-schema-to-ts";

export interface GetSuperSecurePersonParams {
  /** The company number of the super secure person with significant control details being requested. */
  company_number: string;
  /** The id of the super secure person with significant control details being requested. */
  super_secure_id: string
}

export interface GetSuperSecurePersonQueryString {

}

export const GetSuperSecurePersonSchema = {
  schema: {
    "params": {
      "type": "object",
      "properties": {
        "company_number": {
          "type": "string"
        },
        "super_secure_id": {
          "type": "string"
        }
      },
      "required": [
        "company_number",
        "super_secure_id"
      ]
    },
    "querystring": {
      "type": "object",
      "properties": {},
      "required": []
    },
    "response": {
      "200": {
        "title": "superSecure",
        "required": [
          "etag",
          "kind",
          "description",
          "links"
        ],
        "properties": {
          "etag": {
            "description": "The ETag of the resource.",
            "type": "string"
          },
          "kind": {
            "enum": [
              "super-secure-person-with-significant-control"
            ],
            "type": "string"
          },
          "description": {
            "description": "Description of the super secure legal statement \n",
            "enum": [
              "super-secure-persons-with-significant-control"
            ],
            "type": "string"
          },
          "ceased": {
            "description": "Presence of that indicator means the super secure person status is ceased \n",
            "type": "boolean"
          },
          "links": {
            "description": "A set of URLs related to the resource, including self.",
            "items": {
              "title": "superSecureLinksType",
              "required": [
                "self"
              ],
              "properties": {
                "self": {
                  "description": "The URL of the resource.",
                  "type": "string"
                }
              },
              "type": "object"
            },
            "type": "array"
          }
        },
        "type": "object"
      }
    }
  }
} as const

export type GetSuperSecurePersonResponse = FromSchema<typeof GetSuperSecurePersonSchema['schema']['response']['200']>

