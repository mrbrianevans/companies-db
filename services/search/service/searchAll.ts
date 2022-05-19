import type { SearchAllResponse } from '../schemas/searchAllSchema.js'

/**
 * Search All.
 *
 * Search companies, officers and disqualified officers.
 */
export async function searchAll(
  q?: string,
  items_per_page?: number,
  start_index?: number
): Promise<SearchAllResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
