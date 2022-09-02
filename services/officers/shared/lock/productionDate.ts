import type {RedisClient} from "../dbClients.js"
import {getRedisClient} from "../dbClients.js"
import {Temporal} from "@js-temporal/polyfill";

const productionDateKey = 'officers:liveProductionDate'

/** Get the latest applied production date from Redis, optionally passing a pre-existing client */
export async function getProductionDate(redisClient?: RedisClient|undefined): Promise<Temporal.PlainDate> {
  const redis = redisClient ?? await getRedisClient()
  const lastProductionDate = await redis.get(productionDateKey)
  if(redisClient) await redis.quit()
  if(!lastProductionDate) throw new Error("Last production date not set in redis.")
  return Temporal.PlainDate.from(lastProductionDate)
}


/** Set the latest applied production date from Redis, optionally passing a pre-existing client */
export async function setProductionDate(newDate: {day: number,month: number, year: number}, redisClient?: RedisClient|undefined) {
  const redis = redisClient ?? await getRedisClient()
  await redis.set(productionDateKey, Temporal.PlainDate.from(newDate).toString())
  if(redisClient) await redis.quit()
}

