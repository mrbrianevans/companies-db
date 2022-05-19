import type { GetIndividualResponse } from '../schemas/getIndividualSchema.js'

/**
 * Get the individual person with significant control.
 *
 * Get details of an individual person with significant control.
 */
export async function getIndividual(
  company_number: string,
  psc_id: string
): Promise<GetIndividualResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
