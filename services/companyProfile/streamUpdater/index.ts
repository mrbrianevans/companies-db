import {streamEventsContinuously} from "./listenToStream.js";
import {companyCollectionName} from '../shared/CompanyStorage.js'
import { mongoDbName} from '../shared/dbClients.js'
import {mongoTimedBulkWriter} from '../shared/MongoBulkWriter.js'
import {CompanyProfileEvent} from "./CompanyProfileEventSchema.js";
import {pipeline} from "stream/promises";
import {AnyBulkWriteOperation} from "mongodb";

function getMongoOp(event:CompanyProfileEvent): AnyBulkWriteOperation{
  return ({replaceOne: {filter: {company_number: event.data.company_number}, replacement:event.data, upsert: true }})
}

const updateWriter = mongoTimedBulkWriter(null, [{value: null, collection: companyCollectionName, mapper: getMongoOp }], mongoDbName, {intervalSeconds: 10, maxBufferSize: 1000})

await pipeline(streamEventsContinuously<CompanyProfileEvent>('companies'), updateWriter )
