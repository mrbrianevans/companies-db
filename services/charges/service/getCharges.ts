import type {getChargesResponse} from "../schemas/getChargesSchema.js";

/**
 * .
 *
 * Individual charge information for company..
 */
export async function getCharges(company_number: string, charge_id: string): Promise<getChargesResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}


