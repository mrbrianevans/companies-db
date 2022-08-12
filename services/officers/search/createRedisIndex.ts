import {RediSearchSchema, SchemaFieldTypes, SchemaTextFieldPhonetics} from "redis";
import { getRedisClient } from "../shared/dbClients.js";
/*
The index uses about 4.6GB of RAM after creation, may use more during creation.
 */

// create index if not exists
async function createRedisIndex(){
  const redis = await getRedisClient()
  // for indexing names, stemming is disabled, but phonetic matching is enabled so that John will also match Jon.
  const schema: RediSearchSchema = {
    forenames: {type:SchemaFieldTypes.TEXT,NOSTEM: true,PHONETIC:SchemaTextFieldPhonetics.DM_EN},
    surname: {type:SchemaFieldTypes.TEXT,NOSTEM: true,PHONETIC:SchemaTextFieldPhonetics.DM_EN}
    // title and honours are not indexed, but are stored in the hash
  }
  const indices = await redis.ft._LIST()
  const indexName = 'names'
  if(indices.includes(indexName))
    console.log("Index already exists",{indexName})
  else {
    await redis.ft.CREATE('names', schema, {ON: 'HASH', PREFIX: 'officer:', NOOFFSETS: true, NOFREQS: true})
    console.log("Created index",{indexName})
  }
  await redis.quit()
}


await createRedisIndex()
