import {getEnv} from "./utils.js";
import {RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts} from "redis";

// gets a connected redis client. remember to call redis.quit()
export async function getRedisClient(): Promise<RedisClientType<Pick<RedisDefaultModules, 'ft'>, RedisFunctions, RedisScripts>>{
  const {createClient} = await import('redis')
  const redis = createClient<RedisDefaultModules,RedisFunctions,RedisScripts>({url: getEnv('REDIS_URL')})
  await redis.connect()
  return redis
}

// gets a connected mongo client. remember to call mongo.close()
export async function getMongoClient(){
  const {MongoClient} = await import('mongodb')
  const mongo = new MongoClient(getEnv('MONGO_URL'))
  await mongo.connect()
  return mongo
}

// components should use this constant instead of hardcoding the db name
export const mongoDbName = 'insolvency'
