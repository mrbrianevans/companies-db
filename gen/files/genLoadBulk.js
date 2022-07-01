import {mkdir, writeFile} from "node:fs/promises";
import {resolve} from "path";
import {kebabCase, prettyTs} from "../utils.js";

/** Generates a loadBulk directory for bulk loading data */
export async function genLoadBulk(SERVICES_DIR,tagName){
    await mkdir(resolve(SERVICES_DIR, tagName, 'loadBulk'), {recursive: true})
    await genMongoInsertStream(SERVICES_DIR,tagName)
    await genLoadBulkUtils(SERVICES_DIR, tagName)
    await genLoadBulkPackageJson(SERVICES_DIR, tagName)
    await genLoadBulkDockerfile(SERVICES_DIR, tagName)
}

async function genMongoInsertStream(SERVICES_DIR,tagName){
    const content = `
    import { Writable } from 'stream'
import { MongoClient } from 'mongodb'
import { average, getEnv } from './utils.js'
/**
 * Writable stream to save data to MongoDB. Uses bulk operations to be faster than individual writes. Can do about 5,000 ops/sec on my computer.
 */
export class MongoInserter<ChunkType = any> extends Writable {
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
  /**
   * @param dbName - mongo DB name
   * @param collectionName - mongo collection name
   * @param uidFields - the top level fields in each chunk which gives the UID of the entity.
   * @param batchesPerOp - how many mongodb batches to send in each bulk write operation. Will buffer accordingly. Recommended 0 <= x <= 5. Zero will disable buffering.
   */
  constructor(
    dbName: string,
    collectionName: string,
    uidFields: (keyof ChunkType)[],
    batchesPerOp = 3
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

  async _write(chunk: ChunkType, encoding, callback) {
    this.bufferedChunks.push(chunk)
    if (this.bufferedChunks.length >= this.bufferSize) {
      // console.log("writing chunks due to filled buffer",this.bufferedChunks.length)
      await this.bulkWrite()
    }
    callback()
  }

  write(chunk: ChunkType, callback?: (error: Error | null | undefined) => void): boolean
  write(chunk: ChunkType, encoding: BufferEncoding, callback?: (error: Error | null | undefined) => void): boolean
  write(chunk: ChunkType, encoding?: any, callback?:  (error: Error | null | undefined) => void): boolean{
    // this declaration is here just to type the method with generic types. pass through to super class
    return super.write(chunk, encoding, callback)
  }
  
  async bulkWrite() {
    const bulk = this.mongo
      .db(this.dbName)
      .collection(this.collectionName)
      .initializeUnorderedBulkOp({})
    const numChunks = this.bufferedChunks.length
    for (const i in this.bufferedChunks) {
      const chunk = this.bufferedChunks.shift() // take from beginning
      if(!chunk) continue // shouldn't ever be called
      bulk
        .find(Object.fromEntries(Object.entries(chunk).filter(([key,value])=>this.uidFields.includes(<keyof ChunkType>key))))
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
        \`Average bulk batch size: $\{average(this.batches).toFixed(1)}\`
      )
    await this.mongo.close()
    callback()
  }
}


    `
    await writeFile(resolve(SERVICES_DIR, tagName, 'loadBulk','mongoInserter.ts'), prettyTs(content))
}

async function genLoadBulkUtils(SERVICES_DIR, tagName){
 const content = `
    /** Get an environment variable, or throw if its not set */
export function getEnv(name: string): string {
  const value = process.env[name]
  if (value === undefined)
    throw new Error(\`$\{name} environment variable not set\`)
  return value
}
export function average<T>(arr: T[], valueGetter = (a: T) => Number(a)) {
  return arr.reduce((avg, current, index) => (index * avg + valueGetter(current)) / (index + 1), 0)
}
`
    await writeFile(resolve(SERVICES_DIR, tagName, 'loadBulk','utils.ts'), prettyTs(content))
}


async function genLoadBulkDockerfile(SERVICES_DIR, tagName){
    const content = `FROM node:18

RUN corepack enable && corepack prepare pnpm@7.4.0 --activate

WORKDIR loadBulk

COPY package.json .

RUN pnpm install

COPY . .

RUN pnpm run build

CMD ["pnpm", "run", "start"]

`
    await writeFile(resolve(SERVICES_DIR, tagName, 'loadBulk','Dockerfile'), content)
    await writeFile(resolve(SERVICES_DIR, tagName, 'loadBulk','.dockerignore'), `node_modules\ndownloads`)

}

async function genLoadBulkPackageJson(SERVICES_DIR, tagName){
    const packageJson = {
        "name": kebabCase(tagName+'-load-bulk'),
        "description": `Bulk loader for ${tagName} service`,
        "type": "module",
        main: "loadJob.js",
        "scripts": {
            "build": "tsc --build",
            "watch": "tsc --build --watch",
            "start": "node loadJob.js"
        },
        "version": "1.0.0",
        "dependencies": {
            "dot-object": "^2.1.4",
            "mongodb": "^4.7.0",
            "papaparse": "^5.3.2",
            "yauzl": "^2.10.0"
        },
        "devDependencies": {
            "@types/node": "^18.0.0",
            "@types/yauzl": "^2.10.0",
            "json-schema-to-ts": "^2.5.3",
            "typescript": "^4.7.4"
        }
    }
    await writeFile(resolve(SERVICES_DIR, tagName,'loadBulk', 'package.json'), JSON.stringify(packageJson, null, 2)+'\n')
    const tsconfig = {
        "compilerOptions": {
            "module": "ES2022",
            "target": "ES2021",
            "sourceMap": true,
            "moduleResolution": "node",
            "strictNullChecks": true
        },
        "exclude": [
            "node_modules"
        ],
        "include": ["**/*.ts"]
    }
    await writeFile(resolve(SERVICES_DIR, tagName,'loadBulk', 'tsconfig.json'), JSON.stringify(tsconfig, null, 2)+'\n')
}
