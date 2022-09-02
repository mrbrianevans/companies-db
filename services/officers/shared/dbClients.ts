import {getEnv} from "./utils.js";
import {RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts} from "redis";
// this is the type of the redis client throughout the application. other components can import this without installing redis module.
export type RedisClient = RedisClientType<Pick<RedisDefaultModules, 'ft'>, RedisFunctions, RedisScripts>
// gets a connected redis client. remember to call redis.quit()
export async function getRedisClient(): Promise<RedisClient>{
  const {createClient} = await import('redis')
  const redis = createClient<RedisDefaultModules,RedisFunctions,RedisScripts>({url: getEnv('REDIS_URL')})
  await redis.connect()
  return redis
}

// gets a connected mongo client. remember to call mongo.close()
export async function getMongoClient(){
  const {MongoClient} = await import('mongodb')
  const mongo = new MongoClient(getEnv('MONGO_URL'), {ignoreUndefined: true})
  await mongo.connect()
  return mongo
}

// components should use this constant instead of hardcoding the db name
export const mongoDbName = 'officers'
