import { getRedisClient } from "../shared/dbClients.js"

async function searchIndex(searchTerm: string){
  const redis = await getRedisClient()
  const res = await redis.ft.search('names', searchTerm, {LIMIT: {size:3,from:0}})
  await redis.quit()
  return res.documents.map(d=>d.value).map(n=>[n.title, n.forenames, n.surname, n.honours ? `(${n.honours})`:''].join(' ').trim())
}


console.time('Search index')
const res = await searchIndex('james @surname:"coombe"') // query language
console.timeEnd('Search index')
console.log("result:", res)