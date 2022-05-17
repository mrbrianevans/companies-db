import type {listFilingHistoryResponse} from "../schemas/listFilingHistorySchema.js";

/**
 * filingHistoryList resource.
 *
 * Get the filing history list of a company.
 */
export async function listFilingHistory(company_number: string, category?: string, items_per_page?: number, start_index?: number): Promise<listFilingHistoryResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}


