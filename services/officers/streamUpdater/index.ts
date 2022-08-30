import { Temporal } from "@js-temporal/polyfill";
import {downloadAllInRange, getUpdateFilename, streamUpdateFile} from "./downloadUpdateFile.js";
import {loadUpdateFile} from "./loadUpdate.js";
import {config} from 'dotenv'
import assert from "assert";
import {readdir} from "fs/promises";
import {createReadStream} from "fs";
import { resolve } from "path";
import split2 from 'split2'
import {pipeline} from "stream/promises";
import { parseRecord } from "../shared/recordParser/parseRecord.js";
import {Readable, Writable} from "stream";
config({path: '.sftp.env'})

// const today = Temporal.Now.plainDateISO('UTC')
const today = Temporal.PlainDate.from({year: 2022, month: 8, day: 19})
const {year,month,day} = today

// const updateFile = await streamUpdateFile({year,month,day}, true)
// await loadUpdateFile(updateFile)

// await downloadAllInRange({year: 2020, month: 7, day: 15})


async function applyUpdatesSince(date: {year: number, month: number, day: number}, ensureDownloaded = true){
  if(ensureDownloaded) await downloadAllInRange(date)
  const allFiles = await readdir('downloads')
  const filesSince = allFiles.filter(f=>Temporal.PlainDate.from(f.slice(7,17)).since(date).sign === 1)
  for(const file of filesSince){
    const str = createReadStream(resolve('downloads', file))
    const start = performance.now()
    const count = await loadUpdateFile(str)
    console.log((performance.now()-start).toFixed(0)+'ms','to load', count, 'records from', file)
  }
}

await applyUpdatesSince({year: 2021, month: 4, day: 23}, false)

