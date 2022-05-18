import type { GetChargesResponse } from '../schemas/GetChargesSchema.js'

/**
 * .
 *
 * Individual charge information for company..
 */
export async function getCharges(
  company_number: string,
  charge_id: string
): Promise<GetChargesResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
