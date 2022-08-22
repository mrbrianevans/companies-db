import {streamEventsContinuously} from "./listenToStream.js";
import {companyCollectionName, CompanyStorage} from '../shared/CompanyStorage.js'
import {getMongoClient,  mongoDbName} from '../shared/dbClients.js'
import {CompanyProfileEvent} from "./CompanyProfileEventSchema.js";

const mongo = await getMongoClient()
for await(const event of streamEventsContinuously<CompanyProfileEvent>('companies')){
  await mongo.db(mongoDbName).collection<CompanyStorage>(companyCollectionName)
    .replaceOne({company_number: event.data.company_number}, event.data, {upsert: true})
}
await mongo.close()
