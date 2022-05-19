import type { GetRegisteredOfficeAddressResponse } from '../schemas/GetRegisteredOfficeAddressSchema.js'

/**
 * Registered Office Address.
 *
 * Get the current address of a company.
 */
export async function getRegisteredOfficeAddress(
  company_number: string
): Promise<GetRegisteredOfficeAddressResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
