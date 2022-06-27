/*
Generate schema and type defs for PSC bulk file
 */


import {createReadStream} from "fs";
import {createInterface} from "readline";
import {Readable} from "node:stream";
import {writeFile} from "fs/promises";
import {resolve} from "path";
import JsonToTS from "json-to-ts";
import {createCompoundSchema} from "genson-js";

const sampleFile = 'C:\\Users\\bme\\projects\\companies-house-database-manager\\samples\\psc\\psc_bulk_product_sample.json'

const file = createReadStream(sampleFile)
const lines = createInterface({input: file})
//@ts-ignore
const docs = await Readable.from(lines).map(JSON.parse, {concurrency: 8}).toArray()

const typeDefs = JsonToTS(docs.slice(0,500), {rootName: 'PscBulk'})
await writeFile(resolve(`../services/personsWithSignificantControl/loadBulk/bulkFileTypes.ts`), typeDefs.join('\n\n'))
const schema = createCompoundSchema(docs)
await writeFile(resolve(`../services/personsWithSignificantControl/loadBulk/bulkFileSchema.json`), JSON.stringify(schema, null, 2))
