import type { GetInsolvencyResponse } from '../schemas/getInsolvencySchema.js'

/**
 * .
 *
 * Company insolvency information.
 */
export async function getInsolvency(
  company_number: string
): Promise<GetInsolvencyResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
