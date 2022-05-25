import {FastifyRedis} from "@fastify/redis";
import {FastifyRequest} from "fastify";
import {randomUUID} from "crypto";

const WINDOW_SIZE_MINUTES = 5
const DEFAULT_QUOTA = 600

interface Context{
  redis: FastifyRedis,
  req: FastifyRequest
}
// todo: write unit tests for this class (which mock redis)
export class AuthService {
  apiKey: string
  context: Context

  /**
   * Create a new AuthService. This should only be done once per request.
   * @param context - the context in which the AuthService is being executed. Includes redis client, and req for logging.
   * @param apiKey - the API key of the requester.
   */
  constructor(context: Context, apiKey: string) {
    this.apiKey = apiKey
    this.context = context
  }

  private getUsageKey(){
    const window = AuthService.getCurrentWindow()
    return `usage:${this.apiKey}:${window}`
  }
  /**
   * Count a single usage of the API to decrement the remaining quota before rate limiting the user. Returns usage.
   */
  async registerUsage(){
    const usageKey = this.getUsageKey()
    const used = await this.context.redis.incr(usageKey)
    await this.context.redis.expire(usageKey, 60*WINDOW_SIZE_MINUTES)
    return used
  }
  async getUsage(){
    const usage = await this.context.redis.get(this.getUsageKey())
    return usage ? parseInt(usage) : 0
  }

  private getQuotaKey(){
    return `quota:${this.apiKey}`
  }
  async setQuota(newQuota: number = DEFAULT_QUOTA){
    await this.context.redis.set(this.getQuotaKey(), newQuota)
  }
  async getQuota(){
    const quota = await this.context.redis.get(this.getQuotaKey());
    return parseInt(quota)
  }
  async getRemainingQuota(usage?: number){
    const quota = await this.getQuota()
    usage ??= await this.getUsage()
    return quota - usage
  }

  async getResponseHeaders(usage?: number){
    return {
      'X-Ratelimit-Limit': await this.getQuota(),
      'X-Ratelimit-Remain': await this.getRemainingQuota(usage),
      'X-Ratelimit-Reset': AuthService.getCurrentWindowReset(),
      'X-Ratelimit-Window': WINDOW_SIZE_MINUTES + 'm'
    }
  }

  async processRequest(){
    const usage = await this.registerUsage()
    const responseHeaders = await this.getResponseHeaders(usage)
    return responseHeaders
  }

  private getViolationsKey(){
    const date = new Date()
    // this would be much better served by Temporal
    return `volations:${this.apiKey}:${date.getFullYear()}:${(date.getMonth()+1).toString().padStart(2, '0')}`
  }
  async recordViolation(){
    this.context.redis.incr(this.getViolationsKey())
  }

  static getNewApiKey(){
    return randomUUID()
  }

  //todo: this logic is not perfect, but it at least stubs the service with some information
  static getCurrentWindow(){
    const window = Math.ceil(new Date().getMinutes() / WINDOW_SIZE_MINUTES)
    return window
  }

  static getCurrentWindowReset(){
    const window = AuthService.getCurrentWindow()
    const resetDate = new Date()
    resetDate.setMinutes(window * WINDOW_SIZE_MINUTES)
    resetDate.setSeconds(0)
    resetDate.setMilliseconds(0)
    const reset = resetDate.getTime()
    return reset
  }

  /**
   * Get an API key from Basic Authorization request header.
   * @param header - the value of the Authorization header sent with the incoming request. Used to get API key.
   */
  static getApiKeyFromHeader(header: string): string{
    const keyMatch = header?.match(/^Basic (.*)$/)
    if(!keyMatch) throw new Error('Basic authorization key not included in request!')
    const key = Buffer.from(keyMatch[1], "base64").toString()
    return key
  }
}


