import type {getCorporateEntitiesResponse} from "../schemas/getCorporateEntitiesSchema.js";

/**
 * Get the corporate entity with significant control.
 *
 * Get details of a corporate entity with significant control.
 */
export async function getCorporateEntities(company_number: string, psc_id: string): Promise<getCorporateEntitiesResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}


