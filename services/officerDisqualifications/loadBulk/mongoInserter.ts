import { Writable } from 'stream'
import { MongoClient } from 'mongodb'
import { getEnv } from './utils.js'
/**
 * Writable stream to save data to MongoDB. Uses bulk operations to be faster than individual writes. Can do about 5,000 ops/sec on my computer.
 */
export class MongoInserter<ChunkType = any> extends Writable {
  private mongo: MongoClient
  collectionName: string
  dbName: string
  uidField: keyof ChunkType
  private readonly startTime: number
  private counter: number
  /**
   * @param dbName - mongo DB name
   * @param collectionName - mongo collection name
   * @param uidField - the top level field in each chunk which gives the UID of the entity.
   */
  constructor(
    dbName: string,
    collectionName: string,
    uidField: keyof ChunkType
  ) {
    super({ objectMode: true, highWaterMark: 10000 })
    this.dbName = dbName
    this.collectionName = collectionName
    this.uidField = uidField
    this.startTime = performance.now()
    this.counter = 0
  }
  async _construct(callback: (error?: Error | null) => void) {
    try {
      this.mongo = new MongoClient(getEnv('MONGO_URL'))
      await this.mongo.connect()
      callback()
    } catch (e) {
      callback(e)
    }
  }

  async _writev(
    chunks: Array<{ chunk: ChunkType; encoding: BufferEncoding }>,
    callback: (error?: Error | null) => void
  ) {
    const bulk = this.mongo
      .db(this.dbName)
      .collection(this.collectionName)
      .initializeUnorderedBulkOp({})
    for (const { chunk } of chunks)
      bulk
        .find({ [this.uidField]: chunk[this.uidField] })
        .upsert()
        .replaceOne(chunk)
    const startTime = performance.now()
    await bulk.execute()
    const execTime = performance.now() - startTime
    const numChunks = chunks.length
    this.counter += numChunks
    callback()
  }

  async _final(callback: (error?: Error | null) => void) {
    const execTime = performance.now() - this.startTime
    console.log(
      'Processed',
      this.counter,
      'chunks in',
      execTime.toFixed(2),
      'milliseconds. Avg',
      (this.counter / (execTime / 1000)).toFixed(2),
      'per second'
    )
    await this.mongo.close()
    callback()
  }
}