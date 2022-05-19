import type { GetCompanyProfileResponse } from '../schemas/getCompanyProfileSchema.js'

/**
 * Company profile.
 *
 * Get the basic company information.
 */
export async function getCompanyProfile(
  company_number: string
): Promise<GetCompanyProfileResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
