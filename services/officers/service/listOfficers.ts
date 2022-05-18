import type { ListOfficersResponse } from '../schemas/ListOfficersSchema.js'

/**
 * Company Officers.
 *
 * List of all company officers.
 */
export async function listOfficers(
  company_number: string,
  items_per_page?: number,
  register_type?: string,
  register_view?: string,
  start_index?: number,
  order_by?: string
): Promise<ListOfficersResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
