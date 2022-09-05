import { getRedisClient } from "../dbClients.js"
import {searchIndexName} from "./searchIndexConstants.js";


interface SearchOptions{
  limit?: number,
  skip?: number
}

export async function performSearch(searchTerm: string, {limit=20, skip=0}: SearchOptions={}){
  const redis = await getRedisClient()
  const res = await redis.ft.search(searchIndexName, searchTerm, {LIMIT: {size:limit,from:skip}})
  await redis.quit()
  return res.documents.map(d=>d.value).map(n=>[n.title, n.forenames, n.surname, n.honours ? `(${n.honours})`:''].join(' ').trim())
}

