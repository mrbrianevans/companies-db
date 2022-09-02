
import type { personUpdateTransformer } from "../../shared/recordParser/transformers.js";
import { OfficerStorage } from "../../shared/storageTypes/Officer.js";
import {UpdateTypes} from "./classifyUpdateRecord.js";

interface UpdateEventInterface {
  updateType: UpdateTypes
  companyNumber: string,
  oldPersonNumber: number
}
interface NewAppointmentEvent extends Pick<UpdateEventInterface, 'updateType'|'companyNumber'>{
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
// person details could have changed (name or address), and person number suffix has been changed.
interface PersonNumberIncrementationEvent extends UpdateEventInterface{
  updateType: UpdateTypes.PersonNumberIncrementation,
  newPersonNumber: number
  appointmentDetails: Pick<OfficerStorage, 'address'|'name_elements'|'occupation'|'changed_on'|'updated_on'>
}

interface MergedRecordsEvent extends UpdateEventInterface{
  updateType: UpdateTypes.MergedRecord,
  newPersonNumber: number
  appointmentDetails: Pick<OfficerStorage, 'address'|'name_elements'|'occupation'|'changed_on'|'updated_on'>,
  personDetails: Pick<OfficerStorage, 'nationality'|'country_of_residence'|'date_of_birth'>
}

interface ErroredAppointmentEvent extends UpdateEventInterface{
  updateType: UpdateTypes.ErroredAppointment
}

interface ReinstatementEvent extends UpdateEventInterface{
  updateType: UpdateTypes.Reinstatement
  newAppointmentType: OfficerStorage['officer_role']
}

interface NomineeEvent extends Pick<UpdateEventInterface, 'updateType'|'oldPersonNumber'>{
  updateType: UpdateTypes.NomineeCorrection,
  appointmentDetails: Pick<OfficerStorage, 'name_elements'|'occupation'|'changed_on'|'updated_on'>,
  personDetails: Pick<OfficerStorage, 'nationality'|'country_of_residence'|'date_of_birth'|'address'>

}

interface UnclassifiedEvent extends UpdateEventInterface{
  updateType: UpdateTypes.Unclassified,
  appointmentDetails: OfficerStorage,
  record: ReturnType<typeof personUpdateTransformer>
}

/*

Attributes of a person for person number prefix:
  URA (only country is provided)
  Nationality
  Date of birth
  Is corporate officer

Person attributes specific to person number suffix:
  Service address
  Occupation
  Name

 */

type PersonUpdateEvent = NewAppointmentEvent
  |ResignationEvent|PersonDetailsAmendmentCorrectionEvent
  |PersonDetailsAmendmentChangeEvent|PersonNumberIncrementationEvent
  |MergedRecordsEvent|ErroredAppointmentEvent|ReinstatementEvent
  |NomineeEvent|UnclassifiedEvent

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
        companyNumber: record.company_number,
        appointmentDetails: {
          person_number: record.person_number.new,
          officer_role: record.appointment_type.new.officer_role,
          resigned: record.appointment_type.new.resigned,
          person_number_prefix: record.person_number_prefix.new,
          address: record.address.new,
          appointed_on: record.appointed_on,
          company_number: record.company_number,
          nationality: record.nationality,
          country_of_residence: record.country_of_residence,
          occupation: record.occupation,
          name_elements: record.name_elements,
          date_of_birth: record.date_of_birth,
          appointment_date_origin: record.appointment_date_origin,
          resignation_date_origin: record.resignation_date_origin,
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
        newPersonNumber: record.person_number.new,
        appointmentDetails: {
          name_elements: record.name_elements,
          address: record.address.new,
          occupation: record.occupation,
          changed_on: record.changed_on,
          updated_on: record.updated_on
        },
      }
    case UpdateTypes.MergedRecord:
      return {
        updateType,
        companyNumber: record.company_number,
        oldPersonNumber: record.person_number.old,
        newPersonNumber: record.person_number.new,
        appointmentDetails: {
          address: record.address.new,
          occupation: record.occupation,
          name_elements: record.name_elements,
          changed_on: record.changed_on,
          updated_on: record.updated_on
        },
        personDetails: {
          nationality: record.nationality,
          country_of_residence: record.country_of_residence,
          date_of_birth: record.date_of_birth
        }
      }
    case UpdateTypes.ErroredAppointment:
      return {
        updateType,
        companyNumber: record.company_number,
        oldPersonNumber: record.person_number.old
      }
    case UpdateTypes.Reinstatement:
      return {
        updateType,
        companyNumber: record.company_number,
        oldPersonNumber: record.person_number.old,
        newAppointmentType: record.appointment_type.new.officer_role
      }
    case UpdateTypes.NomineeCorrection:
      return {
        updateType,
        oldPersonNumber: record.person_number.old,
        appointmentDetails: {
          occupation: record.occupation,
          name_elements: record.name_elements,
          changed_on: record.changed_on,
          updated_on: record.updated_on
        },
        personDetails: {
          address: record.address.new,
          nationality: record.nationality,
          country_of_residence: record.country_of_residence,
          date_of_birth: record.date_of_birth
        }
      }

    case UpdateTypes.Unclassified:
      return {
        updateType,
        companyNumber: record.company_number,
        oldPersonNumber: record.person_number.old,
        appointmentDetails: {
          person_number: record.person_number.new,
          officer_role: record.appointment_type.new.officer_role,
          resigned: record.appointment_type.new.resigned,
          person_number_prefix: record.person_number_prefix.new,
          address: record.address.new,
          appointed_on: record.appointed_on,
          company_number: record.company_number,
          nationality: record.nationality,
          country_of_residence: record.country_of_residence,
          occupation: record.occupation,
          name_elements: record.name_elements,
          date_of_birth: record.date_of_birth,
          appointment_date_origin: record.appointment_date_origin,
          resigned_on: record.resigned_on,
          is_corporate_officer: record.is_corporate_officer,
          changed_on: record.changed_on,
          updated_on: record.updated_on
        },
        record
      }


  }
}
