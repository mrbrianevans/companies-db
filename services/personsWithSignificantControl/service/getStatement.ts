import type {GetStatementResponse} from "../schemas/GetStatementSchema.js";

/**
 * Get the person with significant control statement.
 *
 * Get details of a person with significant control statement.
 */
export async function getStatement(company_number: string, statement_id: string): Promise<GetStatementResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}


