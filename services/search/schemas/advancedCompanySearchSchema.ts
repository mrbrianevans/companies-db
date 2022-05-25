import { FromSchema } from 'json-schema-to-ts'

export interface AdvancedCompanySearchParams {}

export interface AdvancedCompanySearchQueryString {
  /** The company name (must contain) advanced search filter */
  company_name?: string
  /** The company status advanced search filter. To search using multiple values, use a comma delimited list or multiple of the same key i.e. company_status=xxx&company_status=yyy */
  company_status?: undefined
  /** The company subtype advanced search filter. To search using multiple values, use a comma delimited list or multiple of the same key i.e. company_subtype=xxx&company_subtype=yyy */
  company_subtype?: string
  /** The company type advanced search filter. To search using multiple values, use a comma delimited list or multiple of the same key i.e. company_type=xxx&company_type=yyy */
  company_type?: undefined
  /** The dissolved from date advanced search filter */
  dissolved_from?: undefined
  /** The dissolved to date advanced search filter */
  dissolved_to?: undefined
  /** The incorporated from date advanced search filter */
  incorporated_from?: undefined
  /** The incorporated to date advanced search filter */
  incorporated_to?: undefined
  /** The location advanced search filter */
  location?: string
  /** The SIC codes advanced search filter. To search using multiple values, use a comma delimited list or multiple of the same key i.e. sic_codes=xxx&sic_codes=yyy */
  sic_codes?: undefined
  /** The maximum number of results matching the search term(s) to return with a range of 1 to 5000 */
  size?: string
  /** The point at which results will start from i.e show search results from result 20 (used for paging) */
  start_index?: string
}

export const AdvancedCompanySearchSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {},
      required: []
    },
    querystring: {
      type: 'object',
      properties: {
        company_name: {
          type: 'string'
        },
        company_status: {},
        company_subtype: {
          type: 'string'
        },
        company_type: {},
        dissolved_from: {},
        dissolved_to: {},
        incorporated_from: {},
        incorporated_to: {},
        location: {
          type: 'string'
        },
        sic_codes: {},
        size: {
          type: 'string'
        },
        start_index: {
          type: 'string'
        }
      },
      required: []
    },
    response: {
      '200': {
        title: 'A list of companies',
        type: 'object'
      }
    }
  }
} as const

export type AdvancedCompanySearchResponse = FromSchema<
  typeof AdvancedCompanySearchSchema['schema']['response']['200']
>
//export type AdvancedCompanySearchResponse = any // temporary until schemas can be fixed
