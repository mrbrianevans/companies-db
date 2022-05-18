import type { ListPersonsWithSignificantControlResponse } from '../schemas/ListPersonsWithSignificantControlSchema.js'

/**
 * List the company persons with significant control.
 *
 * List of all persons with significant control (not statements).
 */
export async function listPersonsWithSignificantControl(
  company_number: string,
  items_per_page: string,
  start_index: string,
  register_view: string
): Promise<ListPersonsWithSignificantControlResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
