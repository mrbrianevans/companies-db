import type {getRegisteredOfficeAddressResponse} from "../schemas/getRegisteredOfficeAddressSchema.js";

/**
 * Registered Office Address.
 *
 * Get the current address of a company.
 */
export async function getRegisteredOfficeAddress(company_number: string): Promise<getRegisteredOfficeAddressResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}


