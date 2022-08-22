
import type { personUpdateTransformer } from "../shared/recordParser/transformers.js";
import { OfficerStorage } from "../shared/storageTypes/Officer.js";
import {UpdateTypes} from "./classifyUpdateRecord.js";

interface UpdateEventInterface {
  updateType: UpdateTypes
  companyNumber: string,
  oldPersonNumber: number
}
interface NewAppointmentEvent extends Pick<UpdateEventInterface, 'updateType'>{
  updateType: UpdateTypes.NewAppointment,
  appointmentDetails: OfficerStorage
}

interface ResignationEvent extends UpdateEventInterface{
  updateType: UpdateTypes.Resignation,
  resignationDate?: string,
  resignationOrigin?: string,
  newAppointmentTypeCode: number
}

interface PersonDetailsAmendmentCorrectionEvent extends UpdateEventInterface{
  updateType: UpdateTypes.PersonDetailsAmendmentCorrection,
  appointmentDetails: Pick<OfficerStorage, 'appointed_on'|'resigned_on'|'address'|'occupation'|'changed_on'|'updated_on'>,
  personDetails: Pick<OfficerStorage, 'name_elements'|'nationality'|'country_of_residence'|'date_of_birth'>
}
interface PersonDetailsAmendmentChangeEvent extends UpdateEventInterface{
  updateType: UpdateTypes.PersonDetailsAmendmentChange,
  appointmentDetails: Pick<OfficerStorage, 'address'|'occupation'|'changed_on'|'updated_on'>,
  personDetails: Pick<OfficerStorage, 'nationality'|'country_of_residence'>
}
interface PersonNumberIncrementationEvent extends UpdateEventInterface{
  updateType: UpdateTypes.PersonNumberIncrementation,
  // person details could have changed, and person number has been changed.
  newPersonNumber: number
  //todo: have changed person details such as name, address etc
}

type PersonUpdateEvent = NewAppointmentEvent|ResignationEvent|PersonDetailsAmendmentCorrectionEvent|PersonDetailsAmendmentChangeEvent|PersonNumberIncrementationEvent

/**
 * Returns the event for a person update record. This will depend on the type of update.
 * The event should contain enough data to apply the update to a database.
 */
export function getRecordEvent(updateType: UpdateTypes, record: ReturnType<typeof personUpdateTransformer>): PersonUpdateEvent|undefined{
  switch (updateType) {
    case UpdateTypes.NewAppointment:
      // create new appointment
      return {
        updateType,
        appointmentDetails: {
          personNumber: record.person_number.new,
          officer_role: record.appointment_type.new.officer_role,
          personNumberPrefix: record.person_number_prefix.new,
          address: record.address.new,
          appointed_on: record.appointed_on,
          company_number: record.company_number,
          nationality: record.nationality,
          country_of_residence: record.country_of_residence,
          occupation: record.occupation,
          name_elements: record.name_elements,
          date_of_birth: record.date_of_birth,
          appointmentDateOrigin: record.appointment_date_origin,
          resigned_on: record.resigned_on,
          is_corporate_officer: record.is_corporate_officer,
          changed_on: record.changed_on,
          updated_on: record.updated_on
        }
      }
    case UpdateTypes.Resignation:
      // update resignation date, resignation date origin and appointment type code
      return {
        updateType,
        companyNumber: record.company_number,
        oldPersonNumber: record.person_number.old,
        newAppointmentTypeCode: record.appointment_type.new.code,
        resignationDate: record.resigned_on,
        resignationOrigin: record.resignation_date_origin
      }
    case UpdateTypes.PersonDetailsAmendmentCorrection:
      return {
        updateType,
        companyNumber: record.company_number,
        oldPersonNumber: record.person_number.old,
        appointmentDetails: {
          address: record.address.new,
          occupation: record.occupation,
          appointed_on: record.appointed_on,
          resigned_on: record.resigned_on,
          changed_on: record.changed_on,
          updated_on: record.updated_on
        },
        personDetails: {
          name_elements: record.name_elements,
          nationality: record.nationality,
          country_of_residence: record.country_of_residence,
          date_of_birth: record.date_of_birth
        }
      }
    case UpdateTypes.PersonDetailsAmendmentChange:
      return {
        updateType,
        companyNumber: record.company_number,
        oldPersonNumber: record.person_number.old,
        appointmentDetails: {
          address: record.address.new,
          occupation: record.occupation,
          changed_on: record.changed_on,
          updated_on: record.updated_on
        },
        personDetails: {
          nationality: record.nationality,
          country_of_residence: record.country_of_residence
        }
      }
    case UpdateTypes.PersonNumberIncrementation:
      return {
        updateType,
        companyNumber: record.company_number,
        oldPersonNumber: record.person_number.old,
        newPersonNumber: record.person_number.new
      }
    case UpdateTypes.MergedRecord:
      break;
    case UpdateTypes.ErroredAppointment:
      break;
    case UpdateTypes.Reinstatement:
      break;
    case UpdateTypes.NomineeCorrection:
      break;
    case UpdateTypes.Unclassified:
      break;

  }
}
