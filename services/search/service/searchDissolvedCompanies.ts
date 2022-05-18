import type { SearchDissolvedCompaniesResponse } from '../schemas/SearchDissolvedCompaniesSchema.js'

/**
 * Search for a dissolved company.
 *
 * Search for a dissolved company.
 */
export async function searchDissolvedCompanies(
  q: string,
  search_type: string,
  search_above?: string,
  search_below?: string,
  size?: string,
  start_index?: string
): Promise<SearchDissolvedCompaniesResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
