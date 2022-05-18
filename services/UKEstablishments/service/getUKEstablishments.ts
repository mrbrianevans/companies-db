import type { GetUKEstablishmentsResponse } from '../schemas/GetUKEstablishmentsSchema.js'

/**
 * Company UK Establishments.
 *
 * List of uk-establishments companies.
 */
export async function getUKEstablishments(
  company_number: string
): Promise<GetUKEstablishmentsResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
