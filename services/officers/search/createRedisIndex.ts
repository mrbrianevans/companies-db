import {RediSearchSchema, SchemaFieldTypes, SchemaTextFieldPhonetics} from "redis";
import { getRedisClient } from "../shared/dbClients.js";
import {searchIndexName, searchIndexPrefix} from "../shared/search/searchIndexConstants.js";
/*
The index uses about 4.6GB of RAM after creation, may use more during creation.
 */

// create index if not exists
export async function createRedisIndex(){
  const redis = await getRedisClient()
  // for indexing names, stemming is disabled, but phonetic matching is enabled so that John will also match Jon.
  const schema: RediSearchSchema = {
    forenames: {type:SchemaFieldTypes.TEXT,NOSTEM: true,PHONETIC:SchemaTextFieldPhonetics.DM_EN},
    surname: {type:SchemaFieldTypes.TEXT,NOSTEM: true,PHONETIC:SchemaTextFieldPhonetics.DM_EN}
    // title and honours are not indexed, but are stored in the hash
  }
  const indices = await redis.ft._LIST()

  if(indices.includes(searchIndexName))
    console.log("Index already exists",{searchIndexName})
  else {
    await redis.ft.CREATE(searchIndexName, schema, {ON: 'HASH', PREFIX: searchIndexPrefix+':', NOOFFSETS: true, NOFREQS: true})
    console.log("Created index",{searchIndexName})
  }
  await redis.quit()
}

