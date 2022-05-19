import type { ListStatementsResponse } from '../schemas/listStatementsSchema.js'

/**
 * List the company persons with significant control statements.
 *
 * List of all persons with significant control statements.
 */
export async function listStatements(
  company_number: string,
  items_per_page?: number,
  start_index?: number,
  register_view?: undefined
): Promise<ListStatementsResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
