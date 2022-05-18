import type {GetCorporateEntitiesResponse} from "../schemas/GetCorporateEntitiesSchema.js";

/**
 * Get the corporate entity with significant control.
 *
 * Get details of a corporate entity with significant control.
 */
export async function getCorporateEntities(company_number: string, psc_id: string): Promise<GetCorporateEntitiesResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}


