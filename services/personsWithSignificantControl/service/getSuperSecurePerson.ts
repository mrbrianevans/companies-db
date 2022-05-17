import type {getSuperSecurePersonResponse} from "../schemas/getSuperSecurePersonSchema.js";

/**
 * Get the super secure person with significant control.
 *
 * Get details of a super secure person with significant control.
 */
export async function getSuperSecurePerson(company_number: string, super_secure_id: string): Promise<getSuperSecurePersonResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}


