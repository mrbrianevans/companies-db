import type {getRegistersResponse} from "../schemas/getRegistersSchema.js";

/**
 * Company registers.
 *
 * Get the company registers information.
 */
export async function getRegisters(company_number: string): Promise<getRegistersResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}


