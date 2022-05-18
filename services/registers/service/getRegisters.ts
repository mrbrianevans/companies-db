import type { GetRegistersResponse } from '../schemas/GetRegistersSchema.js'

/**
 * Company registers.
 *
 * Get the company registers information.
 */
export async function getRegisters(
  company_number: string
): Promise<GetRegistersResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
