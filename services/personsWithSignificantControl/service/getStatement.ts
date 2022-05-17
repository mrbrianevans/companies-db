import type {getStatementResponse} from "../schemas/getStatementSchema.js";

/**
 * Get the person with significant control statement.
 *
 * Get details of a person with significant control statement.
 */
export async function getStatement(company_number: string, statement_id: string): Promise<getStatementResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}


