import {personUpdateTransformer} from "../shared/recordParser/transformers.js";
import {getMongoClient} from '../shared/dbClients.js'
import {OfficerStorage} from '../shared/storageTypes/Officer.js'

const DB_NAME = 'officers', COMPANY_COLLECTION = 'companies', OFFICER_COLLECTION = 'officers';

export enum UpdateTypes{
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

export async function classifyUpdateRecord(record: ReturnType<typeof personUpdateTransformer>): Promise<UpdateTypes>{

  const mongo = await getMongoClient()

  const oldRecord = await mongo.db(DB_NAME).collection<OfficerStorage>(OFFICER_COLLECTION).findOne({company_number: record.company_number, person_number: record.person_number.old, officer_role: record.appointment_type.old.officer_role})

  await mongo.close()

  if(oldRecord === null){
    // old record cannot be matched, therefore this could be a new appointment, depending on the officer_roles in update record
    if(record.appointment_type.old.current && record.appointment_type.new.current){
      // this is a new appointment
      // insert person appointment
      return UpdateTypes.NewAppointment
    }else{
      // console.log("Record not found, and new and old roles aren't current: ", record.person_number,JSON.stringify(record.appointment_type), record.company_number)
    }

  }else{
    // old record CAN be matched
    if(record.appointment_type.old.current && record.appointment_type.new.resigned){
      // previously was current, now resigned
      return UpdateTypes.Resignation
    }

    else if(record.appointment_type.old.current && record.appointment_type.new.current && record.person_number.old === record.person_number.new){

      if(record.correction){
        return UpdateTypes.PersonDetailsAmendmentCorrection
      }else if(!record.correction){
        return UpdateTypes.PersonDetailsAmendmentChange
      }

    }

    else if(record.appointment_type.old.code === record.appointment_type.new.code && record.person_number_prefix.old === record.person_number_prefix.new && record.person_number.old !== record.person_number.new){
      // person number has been incremented, prefixes are the same, but last 4 digits differ. appointment types are the same
      return UpdateTypes.PersonNumberIncrementation
    }

    else if(record.appointment_type.old.code === record.appointment_type.new.code && record.person_number_prefix.old !== record.person_number_prefix.new){
      return UpdateTypes.MergedRecord
    }

    else if(record.appointment_type.new.errored){
      return UpdateTypes.ErroredAppointment
    }

    else if(record.appointment_type.old.resigned && record.appointment_type.new.current && record.appointed_on === oldRecord.appointed_on){
      return UpdateTypes.Reinstatement
    }

    else if(record.company_number.length === 0 && record.person_number.old === record.person_number.new && record.person_number.old.toString().padStart(12, '0').startsWith('9')){
      return UpdateTypes.NomineeCorrection
    }
  }

  {
    const mongo = await getMongoClient()

    const oldRecord = await mongo.db(DB_NAME).collection<OfficerStorage>(OFFICER_COLLECTION).findOne({
      company_number: record.company_number,
      person_number: record.person_number.new,
      officer_role: record.appointment_type.old.officer_role
    })

    await mongo.close()
//todo: if its one of these known categories, reclassify it.
    if(oldRecord !== null) console.log('Could not find record for "old" person number, but could find one for new. Probably swapped around')
    else if(record.appointment_type.old.resigned) console.log("Change in details for resigned officer, could not find because not in database")
    else if(record.appointed_on === record.resigned_on) console.log("Appointed and resigned on same day")
    else {
      const {person_number: {old: person_number}, company_number} = record
      console.log(JSON.stringify({person_number, company_number}),record)
    }
  }


  return UpdateTypes.Unclassified
}
