import {getRedisClient} from "./dbClients.js";

/*

This inserter was made from the bulkWriteMongo after its success. Modified to instead insert into Redis.

 */

interface WriteRedisOpts  {
  BulkOpSize?: number,
  prefix: string
}

export const writeRedis = ({BulkOpSize = 1998,prefix}:WriteRedisOpts) =>
  async function<ChunkType extends {id:string,value:Record<string,string>} = any>(source: AsyncIterable<ChunkType>){
    const buffer: ChunkType[] = []
    let counter = 0
    const redis = await getRedisClient()
    async function bulkInsert(){
      const items = buffer.splice(0, buffer.length)
      await Promise.all(items.map(item=>redis.HSET(prefix +':'+ item.id, item.value)))
      counter += items.length
    }
    for await(const chunk of source){
      try {
        buffer.push(chunk)
        if (buffer.length === BulkOpSize) await bulkInsert()
      }catch (e) {
        console.log('error processing chunk ', {chunk}, e)
        throw e
      }
    }
    await bulkInsert()

    await redis.quit()
    return {counter}
  }
