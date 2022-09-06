
import SonicBoom from "sonic-boom";
import {once} from "node:events";
import {getMongoClient, mongoDbName} from '../shared/dbClients.js';
import { resolve } from "node:path";
import { ExportType } from "./serialisers/exportTypes.js";
import {serialiseRecord, serialiseTransform} from "./serialisers/serialise.js";
import {pipeline} from "stream/promises";
import {Readable, Writable} from "stream";
import { Storage } from '@google-cloud/storage'


interface ExportCollectionOptions{
  collectionName: string,
// sort is used to ensure the same order in every export. All uniquely indexed fields must be used in sort.
  uniqueIndex: Record<string, 1 | -1 >,
  type?:ExportType,
  outputName?: string,
  limit?:number,
  signal?: AbortSignal,
  /** directory to save export in. @default exports */
  outDir?: string
}

// get readable stream/async iterator of all documents in a collection
async function streamDocsFromMongo({collectionName, uniqueIndex,limit=Infinity, signal}:ExportCollectionOptions): Promise<Readable>{
  const mongo = await getMongoClient()
  const collection = mongo.db(mongoDbName).collection(collectionName)
  const count = limit ?? await collection.estimatedDocumentCount()
  console.log(new Date(),"Exporting", count, collectionName)
  const officers = collection.find({},{allowDiskUse:true}).sort(uniqueIndex).limit(limit).stream({})
  // signal?.addEventListener('abort', () => officers.destroy())
  officers.once('end', () => mongo.close())
  return officers
}

// get a pipe-able destination for writing records to a file
function writeToFile(dest: string){
  return async function(source: AsyncIterable<any>) {
    const file = new SonicBoom({dest, mkdir: true})
    for await(const chunk of source) {
      file.write(chunk)
    }
    file.end()
    await once(file, 'finish')
  }
}
function writeToFileWritable(dest: string){
  const file = new SonicBoom({dest, mkdir: true})
  return new Writable({
    write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
      file.write(chunk)
      callback()
    },
    final(callback: (error?: (Error | null)) => void) {
      file.end()
      callback()
    }
  })
}
// write to local file - emits an error at the end, something about being destroyed
const writeToFileSonic = (dest: string): Writable => new SonicBoom({dest, mkdir: true}) as unknown as Writable
// writes file straight to cloud storage
const writeToGcp = (dest: string): Writable => {
  const keyFilename = process.env.GCP_KEY_FILENAME
  if(!keyFilename) throw new Error('Environment variable for GCP_KEY_FILENAME not set. Please set it to the path for the key.')
  const storage = new Storage({keyFilename})
  const myBucket = storage.bucket('my-bucket');
  const file = myBucket.file(dest);
  return file.createWriteStream({gzip: true})
}

// this can go at 40 seconds per million
export async function exportCollection({collectionName, uniqueIndex, type = 'csv', outputName = collectionName + '.' + type,limit=Infinity, signal, outDir = 'exports'}:ExportCollectionOptions){
  await pipeline(await streamDocsFromMongo({collectionName,uniqueIndex,limit,signal}), serialiseTransform(type), writeToFileSonic(resolve(outDir, outputName)))
}
