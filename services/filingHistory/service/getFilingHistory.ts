import type { GetFilingHistoryResponse } from '../schemas/getFilingHistorySchema.js'

/**
 * filingHistoryItem resource.
 *
 * Get the filing history item of a company.
 */
export async function getFilingHistory(
  company_number: string,
  transaction_id: string
): Promise<GetFilingHistoryResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}
