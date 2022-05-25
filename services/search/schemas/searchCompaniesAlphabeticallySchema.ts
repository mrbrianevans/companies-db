import { FromSchema } from 'json-schema-to-ts'

export interface SearchCompaniesAlphabeticallyParams {}

export interface SearchCompaniesAlphabeticallyQueryString {
  /** The company name being searched for */
  q?: string
  /** The ordered_alpha_key_with_id used for paging */
  search_above?: string
  /** The ordered_alpha_key_with_id used for paging */
  search_below?: string
  /** The maximum number of results matching the search term(s) to return with a range of 1 to 100 */
  size?: string
}

export const SearchCompaniesAlphabeticallySchema = {
  schema: {
    params: {
      type: 'object',
      properties: {},
      required: []
    },
    querystring: {
      type: 'object',
      properties: {
        q: {
          type: 'string'
        },
        search_above: {
          type: 'string'
        },
        search_below: {
          type: 'string'
        },
        size: {
          type: 'string'
        }
      },
      required: []
    },
    response: {
      '200': {
        title: 'List of companies',
        type: 'object'
      }
    }
  }
} as const

export type SearchCompaniesAlphabeticallyResponse = FromSchema<
  typeof SearchCompaniesAlphabeticallySchema['schema']['response']['200']
>
//export type SearchCompaniesAlphabeticallyResponse = any // temporary until schemas can be fixed
