import type { AuthResponse } from '../schemas/authSchema.js'
import {FastifyRedis} from "@fastify/redis";
/**
 * Returns rate limit information.
 * @deprecated use AuthService instead.
 */
export async function getRatelimitHeaders(
  authHeader: string,
  redis: FastifyRedis
): Promise<AuthResponse> {
  //todo: this logic is not perfect, but it at least mocks the headers with some information
  const keyMatch = authHeader?.match(/^Basic (.*)$/)
  if(!keyMatch) throw new Error('Basic authorization key not included in request!')
  const key = Buffer.from(keyMatch[1], "base64").toString()

  const sizeMinutes = 5
  const window = Math.ceil(new Date().getMinutes() / sizeMinutes)

  const bucket = key + ':' + window
  const used = await redis.incr(bucket)
  await redis.expire(bucket, 60*sizeMinutes)
  const limit = 600
  const resetDate = new Date()
  resetDate.setMinutes(window * sizeMinutes)
  resetDate.setSeconds(0)
  resetDate.setMilliseconds(0)
  const reset = resetDate.getTime()
  return {
    limit,
    remain: limit - used,
    reset,
    window: sizeMinutes.toFixed() + 'm'
  }
}
