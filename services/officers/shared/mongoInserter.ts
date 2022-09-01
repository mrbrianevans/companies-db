import { Writable } from 'stream'
import { MongoClient, Document } from 'mongodb'
import { average, getEnv } from './utils.js'
import {getMongoClient} from "./dbClients.js";
/**
 * Writable stream to save data to MongoDB. Uses bulk operations to be faster than individual writes. Can do about 5,000 ops/sec on my computer.
 */
export class MongoInserter<ChunkType extends Document = any> extends Writable {
  private mongo: MongoClient
  collectionName: string
  dbName: string
  uidFields: (keyof ChunkType)[]
  private readonly startTime: number
  private counter: number
  private batches: number[]
  private timeTaken: number
  bufferedChunks: ChunkType[]
  bufferSize: number
  mode:  'insert'|'findAndReplace'
  /**
   * @param dbName - mongo DB name
   * @param collectionName - mongo collection name
   * @param uidFields - the top level fields in each chunk which gives the UID of the entity.
   * @param batchesPerOp - how many mongodb batches to send in each bulk write operation. Will buffer accordingly. Recommended 0 <= x <= 5. Zero will disable buffering.
   * @param mode - 'insert' or 'findAndReplace'. Insert is more efficient for initialising an empty database, when duplicates are rare. findAndReplace is better for updating a database.
   */
  constructor(
    dbName: string,
    collectionName: string,
    uidFields: (keyof ChunkType)[],
    batchesPerOp = 3,
    mode: 'insert'|'findAndReplace' = 'findAndReplace'
  ) {
    const bufferSize = 1998 * batchesPerOp // must be a multiple of 1998 due to mongo db internal batch size
    super({ objectMode: true, highWaterMark: bufferSize + 1 })
    this.dbName = dbName
    this.collectionName = collectionName
    this.uidFields = uidFields
    this.startTime = performance.now()
    this.counter = 0
    this.timeTaken = 0
    this.batches = []
    this.bufferSize = bufferSize
    this.bufferedChunks = []
    this.mode = mode
  }
  async _construct(callback: (error?: Error | null) => void) {
    try {
      this.mongo = await getMongoClient()
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
    const bulk = this.mongo
      .db(this.dbName)
      .collection<ChunkType>(this.collectionName)
      .initializeUnorderedBulkOp({})
    const numChunks = this.bufferedChunks.length
    for (const i in this.bufferedChunks) {
      const chunk = this.bufferedChunks.shift() // take from beginning
      if (!chunk) continue // shouldn't ever be called
      if(this.mode === 'insert')
      bulk.insert(chunk)
      else{
        bulk.find(
            Object.fromEntries(
              Object.entries(chunk).filter(([key, value]) =>
                this.uidFields.includes(<keyof ChunkType>key)
              )
            )
          )
          .upsert()
          .replaceOne(chunk)
      }
    }
    // console.log('Mongo internal Batch sizes',bulk.batches.map(b=>b.size),'.total chunks:', numChunks)
    const startTime = performance.now()

    try{
      const result = await bulk.execute() // this throws for duplicates
    }catch (e) {
      for(const {err} of e.writeErrors)
        if(err.code !== 11000) throw new Error(err.errmsg) // don't throw for duplicates, just ignore, its a rare error in the production of the file
    }
    const execTime = performance.now() - startTime
    this.timeTaken += execTime
    this.counter += numChunks
    this.batches.push(numChunks)
    // console.log('WriteV perf:', numChunks,'in', execTime.toFixed(2),'millis. ', (numChunks / (execTime/1000)).toFixed(2),'per second',this.dbName,this.collectionName)
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
        this.dbName,
        this.collectionName,
        this.batches.length,
        'bulk ops',
        `Average bulk batch size: ${average(this.batches).toFixed(1)}`,
        `Mode=${this.mode}`
      )
    await this.mongo.close()
    callback()
  }
}
