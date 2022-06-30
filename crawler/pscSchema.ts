/*
Generate schema and type defs for PSC bulk file
 */


import {createReadStream} from "fs";
import {createInterface} from "readline";
import {Readable} from "node:stream";
import {writeFile} from "fs/promises";
import {resolve} from "path";
import JsonToTS from "json-to-ts";
import {createCompoundSchema,extendSchema} from "genson-js";

/*

Generate JSON schemas for the PSC bulk file. There are multiple types of records in the bulk file:

kind:
    | 'individual-person-with-significant-control'
    | 'legal-person-person-with-significant-control'
    | 'corporate-entity-person-with-significant-control'
    | 'super-secure-person-with-significant-control'
    | 'persons-with-significant-control-statement'
    | 'exemptions'
    | "totals#persons-of-significant-control-snapshot"
 */

const name = 'bulkFilePscExemptions'
const kind = 'exemptions'
const sampleFile = 'C:\\Users\\bme\\projects\\companiesv2\\services\\personsWithSignificantControl\\loadBulk\\downloads\\unzipped\\2022-06-30\\psc-snapshot-2022-06-30_21of21.txt'

const file = createReadStream(sampleFile)
const lines = createInterface({input: file})
console.time('Generate schema')
let counter = 0
const schema = await Readable.from(lines)
  //@ts-ignore
  .map(JSON.parse, {concurrency: 8})
  .filter(e=>e.data.kind === kind, {concurrency: 8}).take(100_000)
  .reduce((previousValue, currentValue)=> {
    counter++
    return extendSchema(previousValue, currentValue)
  }, { type: 'object' }) // problem with this is that top level items aren't required because the first item doesn't have anything.
console.log('Generated',name, 'schema based on', counter, 'entities')
console.timeEnd('Generate schema')

await writeFile(resolve(`../services/personsWithSignificantControl/loadBulk/bulkFileSchemas/${name}.ts`), `
import {FromSchema} from "json-schema-to-ts";

const ${name}Schema = ${JSON.stringify(schema, null, 2)} as const

export type ${name[0].toUpperCase()}${name.slice(1)} = FromSchema<typeof ${name}Schema>
`)
