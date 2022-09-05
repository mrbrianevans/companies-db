import { getRedisClient } from "../dbClients.js"
import {searchIndexName} from "./searchIndexConstants.js";

interface SearchOptions{
  limit?: number,
  skip?: number
}

export async function performSearch(searchTerm: string, {limit=20, skip=0}: SearchOptions={}){
  const redis = await getRedisClient()
  const res = await redis.ft.search(searchIndexName, `@forenames|surname:($searchTerm)`, {LIMIT: {size:limit,from:skip},PARAMS: {searchTerm},RETURN: [] })
  await redis.quit()
  return res
}
