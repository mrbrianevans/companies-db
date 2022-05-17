import type {getInsolvencyResponse} from "../schemas/getInsolvencySchema.js";

/**
 * .
 *
 * Company insolvency information.
 */
export async function getInsolvency(company_number: string): Promise<getInsolvencyResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}


