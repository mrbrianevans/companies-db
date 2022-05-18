import type {GetOfficersResponse} from "../schemas/GetOfficersSchema.js";

/**
 * Get a company officer appointment.
 *
 * Get details of an individual company officer appointment.
 */
export async function getOfficers(company_number: string, appointment_id: string): Promise<GetOfficersResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}


