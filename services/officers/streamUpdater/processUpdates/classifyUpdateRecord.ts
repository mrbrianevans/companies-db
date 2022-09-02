import {personUpdateTransformer} from "../../shared/recordParser/transformers.js";
import {getMongoClient} from '../../shared/dbClients.js'
import {OfficerStorage} from '../../shared/storageTypes/Officer.js'

const DB_NAME = 'officers', COMPANY_COLLECTION = 'companies', OFFICER_COLLECTION = 'officers';

export enum UpdateTypes {
  NewAppointment,
  Resignation,
  PersonDetailsAmendmentCorrection,
  PersonDetailsAmendmentChange,
  PersonNumberIncrementation,
  MergedRecord,
  ErroredAppointment,
  Reinstatement,
  NomineeCorrection,
  Unclassified
}

export async function classifyUpdateRecord(record: ReturnType<typeof personUpdateTransformer>): Promise<UpdateTypes> {

  if(!('person_number' in record)) {
    console.log('Cannot classify record: ', record)
  }

  const mongo = await getMongoClient()
  const oldRecord = await mongo.db(DB_NAME).collection<OfficerStorage>(OFFICER_COLLECTION).findOne({
    company_number: record.company_number,
    person_number: record.person_number.old,
    officer_role: record.appointment_type.old.officer_role
  }).catch(e=>console.log(e))
  await mongo.close()

  /*
  old new type
  current current new appointment
  current resigned resignation
  current current details change or correction
  any errored errored appointment
  resigned current reinstatement
   */

  if (oldRecord === null && record.appointment_type.old.current && record.appointment_type.new.current) {
    // old record cannot be matched, therefore this could be a new appointment, depending on the officer_roles in update record
    return UpdateTypes.NewAppointment
  } else if (record.appointment_type.old.current && record.appointment_type.new.resigned) {
    // previously was current, now resigned
    return UpdateTypes.Resignation
  } else if (record.appointment_type.old.current && record.appointment_type.new.current && record.person_number.old === record.person_number.new) {
    if (record.correction) {
      return UpdateTypes.PersonDetailsAmendmentCorrection
    } else if (!record.correction) {
      return UpdateTypes.PersonDetailsAmendmentChange
    }
  } else if (record.appointment_type.old.code === record.appointment_type.new.code && record.person_number_prefix.old === record.person_number_prefix.new && record.person_number.old !== record.person_number.new) {
    // person number has been incremented, prefixes are the same, but last 4 digits differ. appointment types are the same
    return UpdateTypes.PersonNumberIncrementation
  } else if (record.appointment_type.old.code === record.appointment_type.new.code && record.person_number_prefix.old !== record.person_number_prefix.new) {
    return UpdateTypes.MergedRecord
  } else if (record.appointment_type.new.errored) {
    return UpdateTypes.ErroredAppointment
  } else if (record.appointment_type.old.resigned && record.appointment_type.new.current) {
    return UpdateTypes.Reinstatement
  } else if (record.company_number.length === 0 && record.person_number.old === record.person_number.new && record.person_number.old.toString().padStart(12, '0').startsWith('9')) {
    return UpdateTypes.NomineeCorrection
  }

  {
    const mongo = await getMongoClient()
    const oldRecord = await mongo.db(DB_NAME).collection<OfficerStorage>(OFFICER_COLLECTION).findOne({
      company_number: record.company_number,
      person_number: record.person_number.new, // new person number instead of old
      officer_role: record.appointment_type.old.officer_role
    })
    await mongo.close()
    //there are about a hundred records each day that make it this far without being classified.
    // its usually due to an error in the update file or missing data in the database.
    if (oldRecord !== null) {
      // swap person number around and try again, returning the result.
      const {new: newPersonNumber, old: oldPersonNumber} = record.person_number
      const {new: newPersonNumberPrefix, old: oldPersonNumberPrefix} = record.person_number_prefix
      record.person_number.new = oldPersonNumber
      record.person_number_prefix.new = oldPersonNumberPrefix
      record.person_number.old = newPersonNumber
      record.person_number_prefix.old = newPersonNumberPrefix
      return classifyUpdateRecord(record)
    } else if (record.appointment_type.old.resigned) console.log("Change in details for resigned officer, could not find because not in database")
    else if (record.appointed_on === record.resigned_on) {
      // if resigned on the same day as appointed, then just insert it as a new appointment.
      return UpdateTypes.NewAppointment
    } else {
      const {person_number: {old: person_number}, company_number} = record
      console.log(JSON.stringify({person_number, company_number}), record)
    }
  }


  return UpdateTypes.Unclassified
}
