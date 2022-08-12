import { Writable } from 'stream'
import { average } from '../shared/utils.js'
import { getRedisClient } from '../shared/dbClients.js';
import {RedisClientType, RedisDefaultModules, RedisFunctions, RedisScripts} from "redis";
/**
 * Writable stream to save data to MongoDB. Uses bulk operations to be faster than individual writes. Can do about 5,000 ops/sec on my computer.
 */
export class RedisInserter<ChunkType extends {id:string,value:Record<string,string>} = any> extends Writable {
  private redis: RedisClientType<Pick<RedisDefaultModules, 'ft'>, RedisFunctions, RedisScripts>
  prefix: string
  private readonly startTime: number
  private counter: number
  private batches: number[]
  private timeTaken: number
  bufferedChunks: ChunkType[]
  bufferSize: number

  constructor(
    prefix: string,
    opsPerBatch = 1000
  ) {
    const bufferSize = opsPerBatch
    super({ objectMode: true, highWaterMark: bufferSize + 1 })
    this.prefix = prefix
    this.startTime = performance.now()
    this.counter = 0
    this.timeTaken = 0
    this.batches = []
    this.bufferSize = bufferSize
    this.bufferedChunks = []
  }
  async _construct(callback: (error?: Error | null) => void) {
    try {
      this.redis = await getRedisClient()
      callback()
    } catch (e) {
      callback(e)
    }
  }

  async _write(chunk: ChunkType, encoding, callback) {
    this.bufferedChunks.push(chunk)
    if (this.bufferedChunks.length >= this.bufferSize) {
      // console.log("writing chunks due to filled buffer",this.bufferedChunks.length)
      await this.bulkWrite()
    }
    callback()
  }

  write(
    chunk: ChunkType,
    callback?: (error: Error | null | undefined) => void
  ): boolean
  write(
    chunk: ChunkType,
    encoding: BufferEncoding,
    callback?: (error: Error | null | undefined) => void
  ): boolean
  write(
    chunk: ChunkType,
    encoding?: any,
    callback?: (error: Error | null | undefined) => void
  ): boolean {
    // this declaration is here just to type the method with generic types. pass through to super class
    return super.write(chunk, encoding, callback)
  }

  async bulkWrite() {
    const numChunks = this.bufferedChunks.length
    const chunks = this.bufferedChunks
    this.bufferedChunks = []
    const startTime = performance.now()
    await Promise.all(chunks.map(chunk=>this.redis.HSET(this.prefix +':'+ chunk.id, chunk.value)))
    const execTime = performance.now() - startTime
    this.timeTaken += execTime
    this.counter += numChunks
    this.batches.push(numChunks)
    // console.log("Wrote", numChunks,'chunks in', execTime+'ms')
  }

  async _final(callback: (error?: Error | null) => void) {
    if (this.bufferedChunks.length > 0) await this.bulkWrite()
    const execTime = this.timeTaken
    if (execTime > 0)
      console.log(
        'Processed',
        this.counter,
        'chunks in',
        execTime.toFixed(2),
        'milliseconds. Avg',
        (this.counter / (execTime / 1000)).toFixed(2),
        'per second',
        this.prefix,
        this.batches.length,
        'bulk ops',
        `Average bulk batch size: ${average(this.batches).toFixed(1)}`
      )
    await this.redis.quit()
    callback()
  }
}
