import { getEnv } from "../../shared/utils.js"


// only import this file if you need the redis connection.
// Simply importing it will check for the redis environment variable, even if it's not used.
const redisUrl = new URL(getEnv('REDIS_URL'))
export const bullRedisConnection = {host: redisUrl.hostname, port: parseInt(redisUrl.port, 10) || undefined }
