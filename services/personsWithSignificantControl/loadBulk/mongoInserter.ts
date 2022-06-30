import { Writable } from 'stream'
import { MongoClient } from 'mongodb'
import {average, getEnv} from './utils.js'
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
  private batches: number[]
  private timeTaken: number
  bufferedChunks: any[]
  bufferSize: number
  /**
   * @param dbName - mongo DB name
   * @param collectionName - mongo collection name
   * @param uidField - the top level field in each chunk which gives the UID of the entity.
   * @param batchesPerOp - how many mongodb batches to send in each bulk write operation. Will buffer accordingly. Recommended 0 <= x <= 5. Zero will disable buffering.
   */
  constructor(
    dbName: string,
    collectionName: string,
    uidField: keyof ChunkType,
    batchesPerOp =  3
  ) {
    const bufferSize = 1998 * batchesPerOp // must be a multiple of 1998 due to mongo db internal batch size
    super({ objectMode: true, highWaterMark: bufferSize + 1 })
    this.dbName = dbName
    this.collectionName = collectionName
    this.uidField = uidField
    this.startTime = performance.now()
    this.counter = 0
    this.timeTaken = 0
    this.batches = []
    this.bufferSize = bufferSize
    this.bufferedChunks = []
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

  async _write(chunk: ChunkType, encoding, callback){
    this.bufferedChunks.push(chunk)
    if(this.bufferedChunks.length >= this.bufferSize){
      // console.log("writing chunks due to filled buffer",this.bufferedChunks.length)
      await this.bulkWrite()
    }
    callback()
  }

  async bulkWrite(
  ) {
    const bulk = this.mongo
      .db(this.dbName)
      .collection(this.collectionName)
      .initializeUnorderedBulkOp({})
    const numChunks = this.bufferedChunks.length
    for (const i in this.bufferedChunks) {
      const chunk = this.bufferedChunks.shift() // take from beginning
      bulk
        .find({ [this.uidField]: chunk[this.uidField] })
        .upsert()
        .replaceOne(chunk)
    }
    // console.log('Mongo internal Batch sizes',bulk.batches.map(b=>b.size),'.total chunks:', numChunks)
    const startTime = performance.now()
    const result = await bulk.execute()
    const execTime = performance.now() - startTime
    this.timeTaken += execTime
    this.counter += numChunks
    this.batches.push(numChunks)
    // console.log('WriteV perf:', numChunks,'in', execTime.toFixed(2),'millis. ', (numChunks / (execTime/1000)).toFixed(2),'per second',this.dbName,this.collectionName)
  }

  async _final(callback: (error?: Error | null) => void) {
    if(this.bufferedChunks.length > 0) await this.bulkWrite()
    const execTime = this.timeTaken
    if(execTime > 0) console.log(
      'Processed',
      this.counter,
      'chunks in',
      execTime.toFixed(2),
      'milliseconds. Avg',
      (this.counter / (execTime / 1000)).toFixed(2),
      'per second',this.dbName,this.collectionName, this.batches.length, 'bulk ops', `Average bulk batch size: ${average(this.batches).toFixed(1)}`
    )
    await this.mongo.close()
    callback()
  }
}
