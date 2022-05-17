import type {getLegalPersonsResponse} from "../schemas/getLegalPersonsSchema.js";

/**
 * Get the legal person with significant control.
 *
 * Get details of a legal person with significant control.
 */
export async function getLegalPersons(company_number: string, psc_id: string): Promise<getLegalPersonsResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}


