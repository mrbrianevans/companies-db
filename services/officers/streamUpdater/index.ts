import { Temporal } from "@js-temporal/polyfill";
import {streamUpdateFile} from "./downloadUpdateFile.js";
import {loadUpdateFile} from "./loadUpdate.js";
import {config} from 'dotenv'
config({path: '.sftp.env'})

// const today = Temporal.Now.plainDateISO('UTC')
const today = Temporal.PlainDate.from({year: 2022, month: 8, day: 19})
const {year,month,day} = today

const updateFile = await streamUpdateFile({year,month,day}, true)
await loadUpdateFile(updateFile)

