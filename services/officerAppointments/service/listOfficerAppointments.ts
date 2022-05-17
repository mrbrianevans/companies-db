import type {listOfficerAppointmentsResponse} from "../schemas/listOfficerAppointmentsSchema.js";

/**
 * Officer Appointment List.
 *
 * List of all officer appointments.
 */
export async function listOfficerAppointments(officer_id: string, items_per_page?: number, start_index?: number): Promise<listOfficerAppointmentsResponse> {
  //todo: Write logic for function here, access database, return response
  return Promise.resolve(null)
}


