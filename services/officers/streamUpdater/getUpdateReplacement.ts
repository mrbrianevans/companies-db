import {getMongoClient} from "../shared/dbClients.js";
import type {PersonUpdate} from "../shared/recordParser/transformers.js";
import type {AnyBulkWriteOperation, BulkResult, MongoBulkWriteError} from "mongodb";
import type {OfficerUpdateFileRecordWithRecordType} from '../shared/recordParser/FileRecordTypes.js'
import {CompanyStorage} from "../shared/storageTypes/Company.js";
import {RecordType} from "../shared/recordParser/RecordTypes.js";
import {writeMongoCustom} from "../shared/bulkWriteMongo.js";

/**
 * Get a filter and replacement value for the officers collection based on an update file. Used for bulk writes.
 * @param record
 */
export function getPersonUpdateReplacement(record: PersonUpdate): AnyBulkWriteOperation{

  const filter = {
    company_number: record.company_number,
    person_number: { $in: [record.person_number.old, record.person_number.new] }, // filters for new and old person numbers
    officer_role: record.appointment_type.old.officer_role, // doesn't check for resigned status
    appointed_on: record.appointed_on // not sure if this is right? Should it check for this?? what about corrections?
  }

  if(record.appointment_type.new.errored){
    //  if appointment type code is 99, send a deleteOne
    return {
      deleteOne: {filter}
    }
  }else{
    const replacement = {
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

    return {
      replaceOne: {
        filter, replacement, upsert: true
      }
    }
  }
}
function getCompanyReplacement(record: CompanyStorage){
  const filter = {
    company_number: record.company_number
  }
  const replacement = record
  return {
    replaceOne: {
      filter, replacement, upsert: true
    }
  }
}

export const bulkWriteUpdates = writeMongoCustom('recordType', [
  {value: RecordType.Company, collection: 'companies', mapper: getCompanyReplacement},
  {value: RecordType.PersonUpdate, collection: 'officers', mapper: getPersonUpdateReplacement}
], 'officers')
