import { writeFile} from "node:fs/promises";
import {resolve} from "path";
import {kebabCase, prettyTs} from "../utils.js";

/** Generates a loadBulk directory for bulk loading data */
export async function genLoadBulk(SERVICES_DIR,tagName){
    await genMongoInsertStream(SERVICES_DIR,tagName)
    await genLoadBulkUtils(SERVICES_DIR, tagName)
    await genLoadBulkPackageJson(SERVICES_DIR, tagName)
    await genLoadBulkDockerfile(SERVICES_DIR, tagName)
}

async function genMongoInsertStream(SERVICES_DIR,tagName){
    const content = `
    
import {Writable} from "stream";
import {MongoClient} from "mongodb";
import {getEnv} from "./utils.js";
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
    const numChunks = chunks.length;
    this.counter += numChunks
    callback()
  }

  async _final(callback: (error?: Error | null) => void) {
    const execTime = performance.now() - this.startTime
    console.log('Processed',this.counter,'chunks in', execTime.toFixed(2), 'milliseconds. Avg', (this.counter/(execTime/1000)).toFixed(2),'per second')
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
}`
    await writeFile(resolve(SERVICES_DIR, tagName, 'loadBulk','utils.ts'), prettyTs(content))
}


async function genLoadBulkDockerfile(SERVICES_DIR, tagName){
    const content = `FROM node:18

RUN corepack enable && corepack prepare pnpm@7.4.0 --activate

WORKDIR loadBulk

COPY package.json .

RUN pnpm i

COPY . .

RUN pnpm run build

CMD ["pnpm", "run", "start"]

`
    await writeFile(resolve(SERVICES_DIR, tagName, 'loadBulk','Dockerfile'), content)

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
